import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function ScoreGauge({ score, size = 200, strokeWidth = 16 }: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedScore / 100) * circumference;

  // Determine color based on score (higher score = more likely AI)
  const getColor = (s: number) => {
    if (s < 20) return "hsl(var(--success))"; // Green
    if (s < 40) return "hsl(170, 70%, 45%)"; // Teal
    if (s < 60) return "hsl(var(--warning))"; // Yellow/Orange
    if (s < 80) return "hsl(15, 90%, 55%)"; // Orange/Red
    return "hsl(var(--destructive))"; // Red
  };

  const color = getColor(score);

  return (
    <div 
      className="relative flex items-center justify-center" 
      style={{ width: size, height: size }}
    >
      {/* Background circle */}
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        
        {/* Animated value circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 8px ${color}40)`
          }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute flex flex-col items-center justify-center">
        <motion.span 
          className="font-display font-bold tabular-nums text-foreground"
          style={{ fontSize: size * 0.25 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {Math.round(animatedScore)}%
        </motion.span>
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mt-1">
          AI Score
        </span>
      </div>
    </div>
  );
}
