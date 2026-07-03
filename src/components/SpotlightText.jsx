import React, { useRef, useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const SpotlightText = ({ children, className = "" }) => {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Framer Motion values for smooth tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring configuration for smooth cursor following
  const springX = useSpring(x, {
    stiffness: 300,
    damping: 40,
    mass: 0.5,
  });

  const springY = useSpring(y, {
    stiffness: 300,
    damping: 40,
    mass: 0.5,
  });

  // Store raw coordinates for CSS variables
  const [pixelX, setPixelX] = useState(0);
  const [pixelY, setPixelY] = useState(0);

  // Update CSS variables when spring values change
  useEffect(() => {
    const unsubscribeX = springX.onChange((value) => {
      setPixelX(value);
      if (containerRef.current) {
        containerRef.current.style.setProperty("--x", `${value}px`);
      }
    });

    const unsubscribeY = springY.onChange((value) => {
      setPixelY(value);
      if (containerRef.current) {
        containerRef.current.style.setProperty("--y", `${value}px`);
      }
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [springX, springY]);

  // Setup Intersection Observer to track when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Mouse move handler
  const handleMouseMove = (e) => {
    if (!isInView || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX);
    y.set(mouseY);
  };

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    // Optional: You can reset to center or keep last position
    // x.set(containerRef.current?.offsetWidth / 2 || 0);
    // y.set(containerRef.current?.offsetHeight / 2 || 0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-none select-none ${className}`}
      style={{
        "--x": "0px",
        "--y": "0px",
      }}
    >
      {/* Bottom Layer - Dark Gray Text */}
      <div className="relative">
        <div className={`text-gray-900 relative z-0`}>{children}</div>

        {/* Top Layer - White Text with Black Spotlight and Clip Path */}
        <div
          className="absolute inset-0 text-white pointer-events-none z-10"
          style={{
            clipPath: "circle(200px at var(--x) var(--y))",
            transition: "clip-path 0s",
          }}
        >
          {/* Black Circular Background */}
          <div className="absolute inset-0 bg-black opacity-90 -z-10" />

          {/* White Text Content with Cyan/Blue Highlighted Text */}
          <div className="relative">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                // If child is a React element, clone it and add special styling for highlighted text
                return React.cloneElement(child, {
                  className: `${child.props.className || ''} [&_.font-bold]:text-cyan-400 [&_.font-bold]:font-bold`,
                });
              }
              return child;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotlightText;