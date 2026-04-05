export type Variable = {
  id: string;
  name: string;
  type: "standard" | "selection";
  description?: string;
  options?: { name: string; value: string | number }[];
  evidences?: [];
};

export type MathFunction = {
  name: string;
  description: string;
  formula: string;
};

export type Example = {
  title: string;
  description: string;
  formula: string;
};

export type FormulaEditorProps = {
  variables: Variable[];
};

// Version Anterior pero verificada todas
// export const mathFunctions: MathFunction[] = [
//   // ====================== MATEMÁTICAS BÁSICAS ======================
//   { name: "ABS(x)", description: "Valor absoluto" },
//   { name: "SQRT(x)", description: "Raíz cuadrada" },
//   { name: "POW(x, y)", description: "Potencia (x^y)" },
//   { name: "EXP(x)", description: "Exponencial (e^x)" },
//   { name: "LOG(x)", description: "Logaritmo natural" },
//   { name: "LOG10(x)", description: "Logaritmo base 10" },
//   { name: "SIGN(x)", description: "Signo del número (-1, 0, 1)" },

//   // ====================== REDONDEO ======================
//   { name: "ROUND(x)", description: "Redondear al entero más cercano" },
//   { name: "ROUND(x, n)", description: "Redondear con n decimales" },
//   { name: "CEIL(x)", description: "Redondear hacia arriba" },
//   { name: "FLOOR(x)", description: "Redondear hacia abajo" },
//   { name: "FIX(x)", description: "Redondear hacia 0" },

//   // ====================== ESTADÍSTICAS ======================
//   { name: "SUM(a, b, ...)", description: "Sumatoria" },
//   { name: "MEAN(a, b, ...)", description: "Promedio" },
//   { name: "AVG(a, b, ...)", description: "Alias de promedio" },
//   { name: "MEDIAN(a, b, ...)", description: "Mediana" },
//   { name: "MIN(a, b, ...)", description: "Valor mínimo" },
//   { name: "MAX(a, b, ...)", description: "Valor máximo" },
//   { name: "STD(a, b, ...)", description: "Desviación estándar" },
//   { name: "VARIANCE(a, b, ...)", description: "Varianza" },

//   // ====================== TRIGONOMETRÍA ======================
//   { name: "SIN(x)", description: "Seno" },
//   { name: "COS(x)", description: "Coseno" },
//   { name: "TAN(x)", description: "Tangente" },
//   { name: "ASIN(x)", description: "Arco seno" },
//   { name: "ACOS(x)", description: "Arco coseno" },
//   { name: "ATAN(x)", description: "Arco tangente" },

//   // ====================== COMPARADORES ======================
//   { name: "x > y", description: "Mayor que" },
//   { name: "x < y", description: "Menor que" },
//   { name: "x >= y", description: "Mayor o igual que" },
//   { name: "x <= y", description: "Menor o igual que" },
//   { name: "x == y", description: "Igualdad" },
//   { name: "x != y", description: "Diferente" },

//   // ====================== LÓGICA ======================
//   { name: "x AND y", description: "AND lógico" },
//   { name: "x OR y", description: "OR lógico" },
//   { name: "NOT(x)", description: "Negación lógica" },

//   // ====================== CONDICIONALES ======================
//   {
//     name: "IF(cond, trueVal, falseVal)",
//     description:
//       "Condicional tipo Excel (transformado internamente a ternario)",
//   },
//   {
//     name: "cond ? a : b",
//     description: "Condicional nativo (mathjs)",
//   },

//   // ====================== ARRAYS ======================
//   { name: "[a, b, c]", description: "Array de valores" },
//   { name: "SUM([a, b, c])", description: "Sumatoria de array" },

//   // ====================== PERSONALIZADAS (TU SISTEMA) ======================
//   {
//     name: "SUM(exp, start, end)",
//     description: "Sumatoria en rango (custom backend)",
//   },
//   {
//     name: "PERCENT(x)",
//     description: "Convertir a porcentaje (x / 100)",
//   },
//   {
//     name: "CLAMP(x, min, max)",
//     description: "Limitar valor entre min y max",
//   },
// ];

export const mathFunctions: MathFunction[] = [
  // ====================== FUNCIONES PERSONALIZADAS ======================
  {
    name: "IF",
    description: "Condicional si-entonces-sino",
    formula: "IF(condition, trueValue, falseValue)",
  },
  {
    name: "AND",
    description: "Verdadero si todas las condiciones son true",
    formula: "AND(...conditions)",
  },
  {
    name: "OR",
    description: "Verdadero si al menos una condición es true",
    formula: "OR(...conditions)",
  },
  {
    name: "NOT",
    description: "Niega una condición lógica",
    formula: "NOT(condition)",
  },
  {
    name: "IFNULL",
    description: "Devuelve valor por defecto si es null/undefined",
    formula: "IFNULL(value, default)",
  },
  {
    name: "ISNULL",
    description: "Verifica si un valor es null o undefined",
    formula: "ISNULL(value)",
  },
  {
    name: "SUM",
    description: "Sumatoria iterativa con índice",
    formula: "SUM(expr, i, start, end)",
  },
  {
    name: "CLAMP",
    description: "Limita un valor entre mínimo y máximo",
    formula: "CLAMP(x, min, max)",
  },

  // ====================== MATEMÁTICAS BÁSICAS ======================
  { name: "ABS", description: "Valor absoluto", formula: "ABS(x)" },
  { name: "POW", description: "Potencia", formula: "POW(base, exponent)" },
  { name: "SQRT", description: "Raíz cuadrada", formula: "SQRT(x)" },
  {
    name: "MOD",
    description: "Módulo / resto de división",
    formula: "MOD(a, b)",
  },
  {
    name: "ROUND",
    description: "Redondeo al entero o con decimales opcionales",
    formula: "ROUND(x, decimals?)",
  },

  // ====================== ESTADÍSTICAS ======================
  {
    name: "AVG",
    description: "Promedio de valores",
    formula: "AVG(...values)",
  },
  { name: "MAX", description: "Valor máximo", formula: "MAX(...values)" },
  { name: "MIN", description: "Valor mínimo", formula: "MIN(...values)" },

  // ====================== REDONDEO ======================
  { name: "FLOOR", description: "Redondeo hacia abajo", formula: "floor(x)" },
  { name: "CEIL", description: "Redondeo hacia arriba", formula: "ceil(x)" },
  { name: "FIX", description: "Redondeo hacia cero", formula: "fix(x)" },

  // ====================== TRIGONOMETRÍA ======================
  { name: "SIN", description: "Seno", formula: "sin(x)" },
  { name: "COS", description: "Coseno", formula: "cos(x)" },
  { name: "TAN", description: "Tangente", formula: "tan(x)" },
  { name: "ASIN", description: "Arco seno", formula: "asin(x)" },
  { name: "ACOS", description: "Arco coseno", formula: "acos(x)" },
  { name: "ATAN", description: "Arco tangente", formula: "atan(x)" },

  // ====================== EXPONENCIALES Y LOGARITMOS ======================
  { name: "LOG", description: "Logaritmo natural (ln)", formula: "log(x)" },
  { name: "LOG10", description: "Logaritmo base 10", formula: "log10(x)" },
  { name: "EXP", description: "Exponencial (e^x)", formula: "exp(x)" },

  // ====================== OTROS ======================
  {
    name: "SIGN",
    description: "Signo del número (-1, 0, 1)",
    formula: "sign(x)",
  },

  // ====================== CONSTANTES ======================
  { name: "PI", description: "Constante π (3.14159...)", formula: "PI" },
  { name: "E", description: "Constante e (2.71828...)", formula: "E" },

  // ====================== OPERADORES ======================
  { name: "PLUS", description: "Suma", formula: "+" },
  { name: "MINUS", description: "Resta", formula: "-" },
  { name: "MULTIPLY", description: "Multiplicación", formula: "*" },
  { name: "DIVIDE", description: "División", formula: "/" },
  { name: "MODULO", description: "Módulo", formula: "%" },

  { name: "EQUAL", description: "Igual a", formula: "==" },
  { name: "GREATER", description: "Mayor que", formula: ">" },
  { name: "GREATER_EQUAL", description: "Mayor o igual que", formula: ">=" },
  { name: "LESS", description: "Menor que", formula: "<" },
  { name: "LESS_EQUAL", description: "Menor o igual que", formula: "<=" },

  // ====================== CONSTANTES LÓGICAS ======================
  { name: "NULL", description: "Valor nulo", formula: "null" },
  { name: "TRUE", description: "Verdadero", formula: "true" },
  { name: "FALSE", description: "Falso", formula: "false" },
];

export const examples = [
  {
    title: "1. Suma básica",
    description: "Suma simple de variables",
    formula: `const a = 5
const b = 3
const c = 2
return a + b + c`,
  },
  {
    title: "2. Promedio simple",
    description: "Promedio de 3 valores usando la función AVG",
    formula: `const a = 5
const b = 3
const c = 2
return AVG(a, b, c)`,
  },
  {
    title: "3. Condición simple",
    description: "Evalúa si la suma supera un umbral",
    formula: `const a = 5
const b = 3
const c = 2
const total = a + b + c
return IF(total > 10, 100, 0)`,
  },
  {
    title: "4. Condición anidada",
    description: "Clasificación por niveles",
    formula: `const a = 5
const b = 3
const c = 2
const total = a + b + c
return IF(total >= 15, "ALTO", IF(total >= 10, "MEDIO", "BAJO"))`,
  },
  {
    title: "5. División segura",
    description: "Evita división por cero",
    formula: `const a = 5
const b = 3
const c = 2
return IF(c == 0, 0, (a + b) / c)`,
  },
  {
    title: "6. Valor limitado",
    description: "Limita resultado entre 0 y 100",
    formula: `const a = 5
const b = 3
const c = 2
const total = a + b + c
return CLAMP(total * 10, 0, 100)`,
  },
  {
    title: "7. Sumatoria simple",
    description: "Suma (a+b+c) 5 veces",
    formula: `const a = 5
const b = 3
const c = 2
return SUM(a + b + c, i, 1, 5)`,
  },
  {
    title: "8. Sumatoria con índice",
    description: "Suma i * total desde 1 a 5",
    formula: `const a = 5
const b = 3
const c = 2
const total = a + b + c
return SUM(i * total, i, 1, 5)`,
  },
  {
    title: "9. Sumatoria con multiplicador",
    description: "Escala el valor en cada iteración",
    formula: `const a = 5
const b = 3
const c = 2
const total = a + b + c
const m = 2
return SUM(i * total * m, i, 1, 3)`,
  },
  {
    title: "10. Potencia",
    description: "Eleva la suma al cuadrado",
    formula: `const a = 5
const b = 3
const c = 2
return POW(a + b + c, 2)`,
  },
  {
    title: "11. Raíz",
    description: "Raíz del valor absoluto",
    formula: `const a = 5
const b = 3
const c = 2
return SQRT(ABS(a + b + c))`,
  },
  {
    title: "12. AND lógico",
    description: "1 si todos son positivos",
    formula: `const a = 5
const b = 3
const c = 2
return IF(AND(a > 0, b > 0, c > 0), 1, 0)`,
  },
  {
    title: "13. OR lógico",
    description: "1 si alguno es mayor a 5",
    formula: `const a = 5
const b = 3
const c = 2
return IF(OR(a > 5, b > 5, c > 5), 1, 0)`,
  },
  {
    title: "14. Máximo",
    description: "Mayor valor",
    formula: `const a = 5
const b = 3
const c = 2
return MAX(a, b, c)`,
  },
  {
    title: "15. Mínimo",
    description: "Menor valor",
    formula: `const a = 5
const b = 3
const c = 2
return MIN(a, b, c)`,
  },
  {
    title: "16. Cumplimiento %",
    description: "Porcentaje limitado",
    formula: `const a = 5
const b = 3
const c = 2
const cumplimiento = (a + b) / c * 100
return CLAMP(cumplimiento, 0, 100)`,
  },
  {
    title: "17. Escala cualitativa",
    description: "Clasificación tipo evaluación",
    formula: `const a = 5
const b = 3
const c = 2
const valor = IF(c == 0, 0, (a + b) / c * 100)
return IF(valor >= 90, "Satisfactorio", IF(valor >= 70, "Aceptable", "Deficiente"))`,
  },
  {
    title: "18. Índice ponderado",
    description: "Pesos personalizados",
    formula: `const a = 5
const b = 3
const c = 2
const total = (a * 0.5) + (b * 0.3) + (c * 0.2)
return ROUND(total)`,
  },
  {
    title: "19. Normalización",
    description: "Escala entre 0 y 100",
    formula: `const a = 5
const b = 3
const c = 2
const min = MIN(a, b, c)
const max = MAX(a, b, c)
return IF(max == min, 0, ((a - min) / (max - min)) * 100)`,
  },

  {
    title: "20. Cálculo encadenado",
    description: "Variables intermedias con transformación progresiva",
    formula: `const a = 10
const b = 20
const c = 30

const base = a + b + c
const promedio = base / 3
const escalado = promedio * 1.5
return ROUND(escalado)`,
  },

  {
    title: "21. Porcentaje seguro avanzado",
    description: "Control + cálculo + límite",
    formula: `const a = 50
const b = 30
const c = 20

const ratio = IF(c == 0, 0, (a + b) / c)
const porcentaje = ratio * 100
return CLAMP(porcentaje, 0, 100)`,
  },

  {
    title: "22. Clasificación multi-condición",
    description: "Uso intensivo de AND + OR",
    formula: `const a = 25
const b = 10
const c = 20

const total = a + b + c

return IF(
  AND(total > 50, OR(a > 20, b > 20)),
  "CRITICO",
  IF(total > 30, "MEDIO", "BAJO")
)`,
  },

  {
    title: "23. Sistema de validación",
    description: "Reglas combinadas tipo negocio",
    formula: `const a = 5
const b = 0
const c = 10

const valido = AND(a >= 0, b >= 0, c >= 0)
const completo = AND(a > 0, b > 0, c > 0)

return IF(
  NOT(valido),
  "ERROR",
  IF(completo, "OK", "INCOMPLETO")
)`,
  },

  {
    title: "24. Sumatoria ponderada dinámica",
    description: "Acumulación con peso incremental",
    formula: `const a = 10
const b = 20
const c = 30

const total = a + b + c
return SUM(i * total * 0.1, i, 1, 10)`,
  },

  {
    title: "25. Crecimiento acumulado",
    description: "Interés compuesto simulado",
    formula: `const a = 100
const b = 5
const c = 5

const base = a
const tasa = b / 100

return SUM(base * POW(1 + tasa, i), i, 1, c)`,
  },

  {
    title: "26. Doble sumatoria",
    description: "Iteración en dos dimensiones",
    formula: `const a = 1

return SUM(
  SUM(i * j, j, 1, 5),
  i,
  1,
  5
)`,
  },

  {
    title: "27. Matriz ponderada",
    description: "Simulación de cálculo tipo matriz",
    formula: `const a = 10
const b = 5

const factor = a + b

return SUM(
  SUM(i * j * factor, j, 1, 3),
  i,
  1,
  3
)`,
  },

  {
    title: "28. Score de desempeño",
    description: "Modelo real tipo KPI",
    formula: `const a = 80
const b = 70
const c = 90

const productividad = a * 0.4
const calidad = b * 0.35
const eficiencia = c * 0.25

const total = productividad + calidad + eficiencia

return IF(
  total >= 90,
  "EXCELENTE",
  IF(total >= 75, "BUENO", IF(total >= 60, "REGULAR", "DEFICIENTE"))
)`,
  },

  {
    title: "29. Riesgo operativo",
    description: "Clasificación basada en múltiples factores",
    formula: `const a = 80
const b = 60

const impacto = a * 0.6
const probabilidad = b * 0.4
const riesgo = impacto * probabilidad

return IF(
  riesgo > 70,
  "ALTO",
  IF(riesgo > 40, "MEDIO", "BAJO")
)`,
  },

  {
    title: "30. Normalización avanzada",
    description: "Escalado dinámico con control",
    formula: `const a = 80
const b = 50
const c = 30

const min = MIN(a, b, c)
const max = MAX(a, b, c)

const rango = max - min

const normalizado = IF(
  rango == 0,
  0,
  (a - min) / rango
)

return ROUND(normalizado * 100)`,
  },

  {
    title: "31. Detección de outliers",
    description: "Análisis respecto al promedio",
    formula: `const a = 100
const b = 50
const c = 40

const media = AVG(a, b, c)
const desviacion = ABS(a - media)

return IF(
  desviacion > 15,
  "OUTLIER",
  "NORMAL"
)`,
  },

  {
    title: "32. Motor completo",
    description: "Ejemplo extremo combinando TODO",
    formula: `const a = 40
const b = 30
const c = 20

const total = a + b + c
const promedio = total / 3

const crecimiento = SUM(
  promedio * POW(1 + 0.05, i),
  i,
  1,
  5
)

const score = crecimiento * 0.3 + total * 0.7

const porcentaje = IF(total == 0, 0, score / total * 100)

const final = CLAMP(porcentaje, 0, 100)

return IF(
  final >= 85,
  "TOP",
  IF(final >= 60, "ACEPTABLE", "CRITICO")
)`,
  },

  {
    title: "33. Simulación compleja multi-nivel",
    description: "Sumatorias anidadas + lógica + escalado",
    formula: `const a = 10
const b = 20
const c = 30

const base = a + b + c

const simulacion = SUM(
  SUM(
    (i * j * base) / (i + j),
    j,
    1,
    4
  ),
  i,
  1,
  4
)

const ajustado = simulacion * 0.05

const resultado = CLAMP(ajustado, 0, 100)

return IF(
  resultado > 80,
  "ALTO",
  IF(resultado > 50, "MEDIO", "BAJO")
)`,
  },

  {
    title: "34. Pipeline de transformación",
    description: "Cada variable depende de la anterior",
    formula: `const a = 15
const b = 25
const c = 35

const step1 = a + b
const step2 = step1 * c
const step3 = step2 / (a + 1)
const step4 = SQRT(step3)

return ROUND(step4, 2)`,
  },

  {
    title: "35. Corrección progresiva",
    description: "Ajuste iterativo del valor",
    formula: `const a = 100
const b = 20

const base = a - b
const ajuste1 = base * 0.9
const ajuste2 = ajuste1 * 0.95
const ajuste3 = ajuste2 * 1.1

return ROUND(ajuste3)`,
  },

  {
    title: "36. Decisión jerárquica compleja",
    description: "Condiciones tipo árbol",
    formula: `const a = 60
const b = 40
const c = 10

const total = a + b + c

return IF(
  total > 100,
  IF(
    a > b,
    "A_DOMINA",
    "B_DOMINA"
  ),
  IF(
    total > 50,
    "INTERMEDIO",
    "BAJO"
  )
)`,
  },

  {
    title: "37. Filtro multicriterio",
    description: "Simula reglas tipo negocio complejas",
    formula: `const a = 10
const b = 80
const c = 30

const regla1 = AND(a > 5, b > 50)
const regla2 = AND(c < 40, b > 70)

return IF(
  OR(regla1, regla2),
  "APROBADO",
  "RECHAZADO"
)`,
  },

  {
    title: "38. Acumulación con condición",
    description: "Filtra dentro de SUM",
    formula: `const a = 10

return SUM(
  IF(i % 2 == 0, i * a, 0),
  i,
  1,
  10
)`,
  },

  {
    title: "39. Penalización acumulativa",
    description: "Reduce valor según iteración",
    formula: `const a = 100

return SUM(
  a / (i + 1),
  i,
  1,
  10
)`,
  },

  {
    title: "40. Simulación de degradación",
    description: "Valor que se deteriora con el tiempo",
    formula: `const a = 100
const tasa = 0.1

return SUM(
  a * POW(1 - tasa, i),
  i,
  1,
  10
)`,
  },

  {
    title: "41. Simulación de crecimiento irregular",
    description: "Crecimiento con variación",
    formula: `const base = 50

return SUM(
  base * (1 + (i % 3) * 0.1),
  i,
  1,
  10
)`,
  },

  {
    title: "42. Score relativo dinámico",
    description: "Comparación contra promedio dinámico",
    formula: `const a = 80
const b = 60
const c = 40

const media = AVG(a, b, c)

const score = IF(
  media == 0,
  0,
  (a / media) * 100
)

return CLAMP(score, 0, 200)`,
  },

  {
    title: "43. Escala no lineal",
    description: "Transformación con potencia",
    formula: `const a = 70

const normal = a / 100
const curva = POW(normal, 2)

return ROUND(curva * 100)`,
  },

  {
    title: "44. Protección total",
    description: "Control de valores inválidos",
    formula: `const a = -10
const b = null
const c = 0

const safeA = IF(a < 0, 0, a)
const safeB = IFNULL(b, 0)

return IF(
  c == 0,
  safeA + safeB,
  (safeA + safeB) / c
)`,
  },

  {
    title: "45. Fallback en cascada",
    description: "Valores alternativos",
    formula: `const a = null
const b = null
const c = 50

const valor = IFNULL(a, IFNULL(b, c))

return valor`,
  },

  {
    title: "46. Motor híbrido",
    description: "Todo combinado en uno",
    formula: `const a = 30
const b = 20
const c = 10

const total = a + b + c

const crecimiento = SUM(
  total * POW(1.03, i),
  i,
  1,
  5
)

const penalizacion = SUM(
  IF(i > 3, i * 2, i),
  i,
  1,
  5
)

const score = crecimiento - penalizacion

const porcentaje = IF(total == 0, 0, score / total * 100)

CLAMP(porcentaje, 0, 100)`,
  },

  {
    title: "47. Simulación caótica",
    description: "Comportamiento no lineal complejo",
    formula: `const a = 10
const b = 20
const c = 30

const base = a + b + c

const simulacion = SUM(
  SUM(
    IF(
      (i + j) % 2 == 0,
      (i * j * base) / (i + 1),
      (i + j) * base * 0.1
    ),
    j,
    1,
    5
  ),
  i,
  1,
  5
)

const normalizado = simulacion / (base * 10)

const resultado = CLAMP(normalizado * 100, 0, 100)

IF(
  resultado > 75,
  "INestable ALTO",
  IF(resultado > 40, "VARIABLE", "ESTABLE")
)`,
  },
];
