import { Play, Heart, Clock } from "lucide-react";
import { type Mix } from "@/lib/data";
import { motion } from "framer-motion";
import { useState } from "react";

interface MixCardProps {
  mix: Mix;
  featured?: boolean;
}

export function MixCard({ mix, featured = false }: MixCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div 
      className="group relative flex flex-col gap-3 rounded-2xl p-3 bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]"
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary">
        {/* Fallback pattern if image fails, though we expect our generated images to load */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-50 z-0" />
        
        <img 
          src={`${import.meta.env.BASE_URL}${mix.imageUrl}`} 
          alt={mix.title} 
          className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center gap-4">
          <button className="w-12 h-12 rounded-full bg-primary/90 text-background flex items-center justify-center hover:scale-110 hover:bg-primary hover:box-shadow-neon transition-all duration-300">
            <Play className="w-5 h-5 ml-1" fill="currentColor" />
          </button>
        </div>
        
        <div className="absolute top-3 right-3 z-20">
          <button 
            onClick={(e) => { e.preventDefault(); setIsLiked(!isLiked); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${isLiked ? 'bg-accent/20 text-accent' : 'bg-black/40 text-white/70 hover:text-white hover:bg-black/60'}`}
          >
            <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>
        
        <div className="absolute bottom-3 right-3 z-20 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1.5 text-xs font-medium border border-white/10">
          <Clock className="w-3 h-3 text-primary" />
          <span>{mix.duration}</span>
        </div>
      </div>
      
      <div className="px-1 flex flex-col gap-1">
        <h3 className="font-display font-semibold text-lg leading-tight truncate group-hover:text-primary transition-colors">{mix.title}</h3>
        <p className="text-sm text-muted-foreground truncate">
          {mix.genres.join(" • ")}
        </p>
      </div>
    </motion.div>
  );
}
