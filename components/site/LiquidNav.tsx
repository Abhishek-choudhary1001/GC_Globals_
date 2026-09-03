'use client';

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';

interface NavItemRect {
  x: number;
  width: number;
  centerX: number;
}

interface LiquidNavProps {
  items: ReactNode[];
  activeIndex: number;
  onItemClick?: (index: number) => void;
  onHoverChange?: (index: number | null) => void;
  className?: string;
}

/**
 * LiquidNav — continuous liquid SVG path navigation.
 *
 * One SVG <path> morphs smoothly between nav items using spring
 * interpolation on a rAF loop. The path dips below the active item
 * and rises above inactive ones, creating a flowing liquid ribbon.
 */
export default function LiquidNav({
  items,
  activeIndex,
  onItemClick,
  onHoverChange,
  className = '',
}: LiquidNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);

  // Target & current animated values (spring interpolation)
  const targetX = useRef(0);
  const targetW = useRef(0);
  const currentX = useRef(0);
  const currentW = useRef(0);
  const rafRef = useRef<number>(0);

  const [hovered, setHovered] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(44);
  const [mounted, setMounted] = useState(false);

  // Mouse proximity tracking for magnetic effect
  const mouseX = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Measure container and items
  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setContainerWidth(rect.width);
    setContainerHeight(rect.height);

    // Set initial target to active item
    const activeEl = itemRefs.current[activeIndex];
    if (activeEl) {
      const itemRect = activeEl.getBoundingClientRect();
      targetX.current = itemRect.left - rect.left;
      targetW.current = itemRect.width;
      currentX.current = targetX.current;
      currentW.current = targetW.current;
    }
  }, [activeIndex]);

  useEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [measure]);

  // Update target when hovered or active changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const idx = hovered !== null ? hovered : activeIndex;
    const el = itemRefs.current[idx];
    if (!el) return;
    const itemRect = el.getBoundingClientRect();
    targetX.current = itemRect.left - rect.left;
    targetW.current = itemRect.width;
  }, [hovered, activeIndex]);

  // rAF spring interpolation + path generation
  useEffect(() => {
    if (!mounted) return;

    const spring = (current: number, target: number, dt: number) => {
      const stiffness = 220;
      const damping = 26;
      const velocity = 0;
      const force = -stiffness * (current - target) - damping * velocity;
      return current + force * dt * dt;
    };

    const buildPath = (x: number, w: number, totalW: number, h: number) => {
      const cx = x + w / 2;
      const dipDepth = h * 0.72;
      const dipRadius = w / 2 + 6;
      const sideRadius = 10;
      const startY = 2;

      // Build a smooth path that rises on the sides and dips in the middle
      const leftEdge = Math.max(0, x - 4);
      const rightEdge = Math.min(totalW, x + w + 4);

      let d = `M 0 ${startY}`;
      // Rise slightly before the dip
      d += ` L ${leftEdge - sideRadius} ${startY}`;
      // Curve down into the dip (left side)
      d += ` C ${leftEdge} ${startY}, ${cx - dipRadius} ${dipDepth * 0.3}, ${cx - dipRadius * 0.85} ${dipDepth * 0.55}`;
      // Smooth curve through the bottom of the dip
      d += ` Q ${cx} ${dipDepth}, ${cx + dipRadius * 0.85} ${dipDepth * 0.55}`;
      // Curve back up (right side)
      d += ` C ${cx + dipRadius} ${dipDepth * 0.3}, ${rightEdge} ${startY}, ${rightEdge + sideRadius} ${startY}`;
      // Continue to the right edge
      d += ` L ${totalW} ${startY}`;

      return d;
    };

    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.033);
      lastTime = time;

      // Spring interpolation toward target
      const dx = targetX.current - currentX.current;
      const dw = targetW.current - currentW.current;

      // Faster spring for position, softer for width
      currentX.current += dx * Math.min(dt * 14, 1);
      currentW.current += dw * Math.min(dt * 12, 1);

      // Subtle magnetic offset from mouse
      let magOffset = 0;
      if (mouseX.current !== null && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const localMouseX = mouseX.current - rect.left;
        const cx = currentX.current + currentW.current / 2;
        const dist = localMouseX - cx;
        if (Math.abs(dist) < 80) {
          magOffset = dist * 0.04;
        }
      }

      const animX = currentX.current + magOffset;
      const animW = currentW.current;

      const pathD = buildPath(animX, animW, containerWidth, containerHeight);

      if (pathRef.current) {
        pathRef.current.setAttribute('d', pathD);
      }
      if (glowRef.current) {
        glowRef.current.setAttribute('d', pathD);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [mounted, containerWidth, containerHeight]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.current = e.clientX;
  };

  const handleMouseLeave = () => {
    mouseX.current = null;
    setHovered(null);
    onHoverChange?.(null);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* SVG liquid path layer */}
      {mounted && (
        <svg
          ref={svgRef}
          className="pointer-events-none absolute left-0 top-0 w-full"
          style={{ height: containerHeight, overflow: 'visible' }}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="liquid-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
              <stop offset="20%" stopColor="rgba(56, 189, 248, 0.5)" />
              <stop offset="50%" stopColor="rgba(56, 189, 248, 0.9)" />
              <stop offset="80%" stopColor="rgba(56, 189, 248, 0.5)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
            </linearGradient>
            <filter id="liquid-glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Glow path (wider, blurred) */}
          <path
            ref={glowRef}
            fill="none"
            stroke="rgba(56, 189, 248, 0.25)"
            strokeWidth={5}
            strokeLinecap="round"
            filter="url(#liquid-glow)"
          />
          {/* Main liquid path */}
          <path
            ref={pathRef}
            fill="none"
            stroke="url(#liquid-grad)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Nav items */}
      <div className="relative flex items-center gap-0.5">
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            data-nav-item
            onMouseEnter={() => { setHovered(i); onHoverChange?.(i); }}
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
