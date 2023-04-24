import React, { useEffect } from "react";

export const useFilters = () => {
  const [activeAttributes, setActiveAttributes] = React.useState(
    new Set<string>([])
  );
  const [focusedAttribute, setFocusedAttribute] = React.useState<string | null>(
    null
  );

  // apply filter from URL on first load
  useEffect(() => {
    const url = new URL(window.location.href);
    const attrs = new Set<string>();

    [...url.searchParams].forEach(([type, name]) => {
      attrs.add(`${type}:${name}`);
    });

    setActiveAttributes(attrs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // write URL with filters
  useEffect(() => {
    const url = new URL(window.location.origin + window.location.pathname);

    [...activeAttributes].forEach((attr) => {
      const [type, name] = attr.split(":");

      url.searchParams.append(type, name);
    });

    window.history.replaceState(null, "", url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAttributes]);

  const updateAttributes = (type: string, attrs: typeof activeAttributes) => {
    const currentSet = new Set([...activeAttributes]);

    currentSet.forEach((a) => {
      if (!attrs.has(a) && a.includes(type)) {
        currentSet.delete(a);
      }
    });

    attrs.forEach((a) => {
      if (!currentSet.has(a)) {
        currentSet.add(a);
      }
    });

    setActiveAttributes(currentSet);
  };
  const addAttribute = (attr: string) => {
    const currentSet = new Set([...activeAttributes]);

    currentSet.add(attr);

    setActiveAttributes(currentSet);
  };
  const deleteAttribute = (attr: string) => {
    const currentSet = new Set([...activeAttributes]);

    currentSet.forEach((a) => {
      if (a.includes(attr)) {
        currentSet.delete(a);
      }
    });

    setActiveAttributes(currentSet);
  };
  const resetAttributes = () => {
    setActiveAttributes(new Set());
  };

  return {
    activeAttributes,
    updateAttributes,
    addAttribute,
    deleteAttribute,
    resetAttributes,
    focusedAttribute,
    setFocusedAttribute,
  };
};
