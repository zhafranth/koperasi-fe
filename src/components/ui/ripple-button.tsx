import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const RippleButton = ({ children, className, ...props }: RippleButtonProps) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; size: number; id: number }[]>([]);

  const addRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    setRipples(prevRipples => [...prevRipples, {
      x: event.clientX - rect.left - radius,
      y: event.clientY - rect.top - radius,
      size: diameter,
      id: Date.now()
    }]);
  }, []);

  useEffect(() => {
    const timeouts = ripples.map(ripple => {
      return setTimeout(() => {
        setRipples(prevRipples => prevRipples.filter(r => r.id !== ripple.id));
      }, 600);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [ripples]);

  return (
    <Button
      {...props}
      className={`relative overflow-hidden ${className}`}
      onClick={(e) => {
        addRipple(e);
        props.onClick?.(e);
      }}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          className="absolute rounded-full bg-white/25 animate-ripple pointer-events-none"
        />
      ))}
    </Button>
  );
};
