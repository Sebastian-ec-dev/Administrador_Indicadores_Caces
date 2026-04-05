type Props = {
  items: { label: string; href?: string }[];
};

const Breadcrumb = ({ items }: Props) => {
  let visibleItems = items;

  if (items.length > 3) {
    visibleItems = [items[0], ...items.slice(-2)];
  }

  return (
    <nav className="text-sm text-gray-500 mb-3 mt-2">
      <ol className="flex items-center space-x-2">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;

          return (
            <li key={item.href || index} className="flex items-center">
              {index === 1 && items.length > 3 && (
                <>
                  <span className="text-gray-400">...</span>
                  <span className="mx-2 text-gray-400">›</span>
                </>
              )}

              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <a href={item.href} className="text-gray-900 font-medium">
                  {item.label}
                </a>
              )}

              {!isLast && <span className="mx-2 text-gray-400">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
