'use client';

import { useRef, ReactNode } from 'react';

interface LiquidNavProps {
  items: ReactNode[];
  activeIndex: number;
  onItemClick?: (index: number) => void;
  onHoverChange?: (index: number | null) => void;
  className?: string;
}

export default function LiquidNav({
  items,
  onItemClick,
  onHoverChange,
  className = '',
}: LiquidNavProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div
      className={`relative ${className}`}
      onMouseLeave={() => onHoverChange?.(null)}
    >
      <div className="relative flex items-center gap-0.5">
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            data-nav-item
            onMouseEnter={() => onHoverChange?.(i)}
            onClick={() => onItemClick?.(i)}
            className="relative"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
