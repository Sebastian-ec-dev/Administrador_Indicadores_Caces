type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span";

type Props = {
  variant?: Variant;
  text?: string;
  className?: string;
};

const styles: Record<Variant, string> = {
  h1: `
    font-medium text-[56px] leading-tight tracking-[-1.68px]
    text-[var(--text-h)]
    max-lg:text-[36px]
    m-0
    text-blue-900
  `,
  h2: `
    font-medium text-[30px] leading-[118%] tracking-[-0.24px]
    text-[var(--text-h)]
    max-lg:text-[20px]
    m-0
  `,
  h3: `
    text-xl font-medium
  `,

  h4: `
    text-lg font-medium
  `,

  h5: `
    text-sm font-medium
  `,
  p: `
    text-base m-0
  `,
  span: `
    text-sm 
  `,
};

const Typography = ({ variant = "h1", text, className }: Props) => {
  const Component = variant;

  return (
    <Component className={`${styles[variant]} ${className}`}>{text}</Component>
  );
};

export default Typography;
