import { create, all } from "mathjs";
import type { MathJsInstance } from "mathjs";

const math = create(all) as MathJsInstance;

// Functions
math.import(
  {
    IF: (cond: unknown, a: unknown, b: unknown) => (cond ? a : b),
    AND: (...args: unknown[]) => args.flat(Infinity).every(Boolean),
    OR: (...args: unknown[]) => args.flat(Infinity).some(Boolean),
    NOT: (x: unknown) => !x,
    ISNULL: (x: unknown) => x == null,
    IFNULL: (x: unknown, fallback: unknown) => (x == null ? fallback : x),

    SUM: function (
      args: unknown[],
      _math: unknown,
      scope: Map<string, unknown>,
    ) {
      const exprNode = args[0] as { toString(): string };
      const varNode = args[1] as { toString(): string };
      const startNode = args[2] as { toString(): string };
      const endNode = args[3] as { toString(): string };

      const expr = exprNode.toString();
      const varName = varNode.toString();

      // scope may be passed as Map or object by mathjs
      const evalScope =
        scope instanceof Map ? Object.fromEntries(scope) : scope;
      const start = Number(math.evaluate(startNode.toString(), evalScope));
      const end = Number(math.evaluate(endNode.toString(), evalScope));

      if (isNaN(start) || isNaN(end)) {
        throw new Error("SUM: start/end inválidos");
      }

      const compiled = math.parse(expr).compile();

      let total = 0;

      for (let i = start; i <= end; i++) {
        const iterationScope = new Map(scope);
        iterationScope.set(varName, i);

        const value = compiled.evaluate(iterationScope);
        total += Number(value) || 0;
      }

      return total;
    },

    ABS: Math.abs,
    ROUND: (x: number, decimals: number = 0) => {
      const f = 10 ** decimals;
      return Math.round(x * f) / f;
    },
    POW: Math.pow,
    SQRT: Math.sqrt,
    MOD: (a: number, b: number) => a % b,

    AVG: (...args: unknown[]) => {
      const nums = args
        .flat(Infinity)
        .map(Number)
        .filter((n) => !isNaN(n));
      return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
    },

    MAX: (...args: unknown[]) => Math.max(...args.flat(Infinity).map(Number)),
    MIN: (...args: unknown[]) => Math.min(...args.flat(Infinity).map(Number)),

    CLAMP: (x: number, min: number, max: number) =>
      Math.min(Math.max(x, min), max),
  },
  { override: true },
);

(math as unknown as { SUM: { rawArgs?: boolean } }).SUM.rawArgs = true;

// =====================
// HELPERS
// =====================
const compile = (expr: string) => math.parse(expr).compile();

const sanitizeScope = (input: Record<string, unknown>) => {
  const scope = new Map<string, unknown>();

  for (const [k, v] of Object.entries(input)) {
    if (v == null) scope.set(k, 0);
    else if (typeof v === "string" && !isNaN(Number(v)))
      scope.set(k, Number(v));
    else scope.set(k, v);
  }

  return scope;
};

const splitStatements = (formula: string) => {
  const lines = formula.split("\n");

  const statements: string[] = [];

  let buffer = "";
  let paren = 0;

  for (const raw of lines) {
    const line = raw.trim();

    if (!line || line.startsWith("//") || line.startsWith("#")) continue;

    buffer += (buffer ? " " : "") + line;

    paren += (line.match(/\(/g) || []).length;
    paren -= (line.match(/\)/g) || []).length;

    if (paren === 0) {
      statements.push(buffer.trim());
      buffer = "";
    }
  }

  if (buffer) {
    throw new Error("Paréntesis desbalanceados");
  }

  return statements;
};

export const evaluateFormula = (
  formula: string,
  inputScope: Record<string, unknown> = {},
) => {
  try {
    const statements = splitStatements(formula);

    const scope = sanitizeScope(inputScope);
    let last: unknown = 0;

    for (const rawLine of statements) {
      const line = rawLine.replace(/;\s*$/, "").trim();

      try {
        if (
          line.includes("=") &&
          !line.startsWith("IF") &&
          !line.startsWith("return")
        ) {
          const clean = line.replace(/^const\s+/, "").trim();

          const eqIndex = clean.indexOf("=");

          if (eqIndex > 0) {
            const varName = clean.substring(0, eqIndex).trim();
            const expr = clean.substring(eqIndex + 1).trim();

            const value = compile(expr).evaluate(scope);

            scope.set(varName, value);
            last = value;

            continue;
          }
        }

        if (line.startsWith("return ")) {
          const expr = line.replace(/^return\s+/, "").trim();
          const result = compile(expr).evaluate(scope);

          return result;
        }

        last = compile(line).evaluate(scope);
      } catch (e: unknown) {
        const error = e as Error;
        console.error("Error en:", rawLine, error.message);
        throw e;
      }
    }

    return last;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    return `ERROR: ${errorMessage}`;
  }
};
