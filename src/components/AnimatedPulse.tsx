import React from "react";

interface AnimatedPulseProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

const AnimatedPulse: React.FC<AnimatedPulseProps> = ({
  size = "md",
  color = "emerald",
}) => {
  const sizeClasses = {
    sm: { inner: "w-2 h-2", outer: "w-3 h-3" },
    md: { inner: "w-2 h-2", outer: "w-4 h-4" },
    lg: { inner: "w-3 h-3", outer: "w-6 h-6" },
  };

  const getColorClasses = (colorName: string) => {
    const colorMap: Record<string, { bg: string; pulse: string }> = {
      emerald: { bg: "bg-emerald-500", pulse: "bg-emerald-400" },
      amber: { bg: "bg-amber-500", pulse: "bg-amber-400" },
      gold: { bg: "bg-[#c9a84c]", pulse: "bg-[#c9a84c]/70" },
      blue: { bg: "bg-blue-500", pulse: "bg-blue-400" },
      red: { bg: "bg-red-500", pulse: "bg-red-400" },
      green: { bg: "bg-green-500", pulse: "bg-green-400" },
      yellow: { bg: "bg-yellow-500", pulse: "bg-yellow-400" },
      purple: { bg: "bg-purple-500", pulse: "bg-purple-400" },
      pink: { bg: "bg-pink-500", pulse: "bg-pink-400" },
      indigo: { bg: "bg-indigo-500", pulse: "bg-indigo-400" },
      gray: { bg: "bg-gray-500", pulse: "bg-gray-400" },
    };

    return colorMap[colorName] || { bg: colorName, pulse: colorName };
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`absolute ${sizeClasses[size].outer} ${colorClasses.pulse} rounded-full animate-ping opacity-75`}
      />
      <div
        className={`relative ${sizeClasses[size].inner} ${colorClasses.bg} rounded-full`}
      />
    </div>
  );
};

export default AnimatedPulse;
