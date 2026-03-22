import { PageLayout } from "@/components/layout/PageLayout";
import { MixCard } from "@/components/MixCard";
import { useMixes } from "@/hooks/use-dj";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "Hip-Hop", "Chill", "Club", "Soul", "House"];

export default function Mixes() {
  const { data: mixes, isLoading } = useMixes();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredMixes = mixes?.filter(mix => 
    activeCategory === "All" ? true : mix.genres.includes(activeCategory)
  ) || [];

  return (
    <PageLayout>
      <div className="pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto min-h-screen relative">
        {/* Background ambient glow */}
        <div className="absolute top-40 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
        
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display font-bold mb-6"
          >
            The <span className="text-primary text-shadow-neon">Vault</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl"
          >
            Explore the complete collection of sets, live recordings, and exclusive studio mixes.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? "bg-primary text-background box-shadow-neon" 
                  : "bg-secondary text-muted-foreground hover:bg-white/10 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mix Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-square bg-secondary rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredMixes.map((mix) => (
                <motion.div
                  key={mix.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <MixCard mix={mix} />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredMixes.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground">
                <p>No mixes found for this category yet.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </PageLayout>
  );
}
