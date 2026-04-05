import React from "react";

type GridItem = {
  content: React.ReactNode;
  span?: number;
};

type Props = {
  items?: GridItem[];
  children?: React.ReactNode;
  minWidth?: string; // option to change the minimum
  gap?: string;
  className?: string;
  style?: React.CSSProperties;
};

const Grid = ({
  items,
  children,
  minWidth = "300px", // minimum by default
  gap = "gap-x-4",
  className = "",
  style = {
    gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
  },
}: Props) => {
  return (
    <div className={`grid ${gap} ${className} items-center `} style={style}>
      {items &&
        items.map((item, index) => (
          <div key={index} className={item.span ? `col-span-${item.span}` : ""}>
            {React.isValidElement(item.content) ? (
              item.content
            ) : (
              <div>{item.content}</div>
            )}
          </div>
        ))}

      {!items && children}
    </div>
  );
};

export default Grid;
