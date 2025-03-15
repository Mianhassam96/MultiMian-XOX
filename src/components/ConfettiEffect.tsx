
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiProps {
  active: boolean;
}

const ConfettiEffect = ({ active }: ConfettiProps) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    color: string;
    size: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const colors = ["#FFD700", "#FFA500", "#FF6347", "#8A2BE2", "#00BFFF", "#32CD32"];
    const newParticles = [];
    
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // random horizontal position
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 1 + 0.5, // between 0.5 and 1.5rem
        delay: Math.random() * 0.5, // stagger the animation
      });
    }
    
    setParticles(newParticles);
  }, [active]);

  if (!active || particles.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute top-0"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}rem`,
            height: `${particle.size}rem`,
            backgroundColor: particle.color,
            borderRadius: '2px',
            zIndex: 50,
          }}
          initial={{ y: -20 }}
          animate={{ y: "100vh", rotate: 720 }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: particle.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;
