import { PageLayout } from "@/components/layout/PageLayout";
import { MixCard } from "@/components/MixCard";
import { useFeaturedMixes } from "@/hooks/use-dj";
import { motion } from "framer-motion";
import { Play, Heart, Moon, Flame, Music } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "wouter";

export default function Home() {
  const { data: featuredMixes, isLoading } = useFeaturedMixes();
  const [emblaRef] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  return (
    <PageLayout>
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Absolute Background Image & Gradients */}
        <div className="absolute inset-0 z-0">
          {/* Note: In a real environment, using an absolute path to public works. */}
          <img 
            src="/hero-dj.png" 
            alt="DJ Light performing live" 
            className="w-full h-full object-cover object-top opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent opacity-80" />
          {/* Neon Light Leaks */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/20 blur-[150px] rounded-full pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center md:items-start text-center md:text-left mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter">
              <span className="text-white drop-shadow-2xl">DJ</span><br className="md:hidden" />
              <span className="font-script ml-4 text-primary text-shadow-neon font-normal capitalize">Light</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 text-xl md:text-2xl text-white/80 font-light tracking-wide max-w-xl"
          >
            Sound Meets Brilliance.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row gap-5"
          >
            <Link href="/mixes">
              <button className="px-8 py-4 rounded-full bg-primary/10 border-2 border-primary text-primary font-semibold tracking-wide flex items-center gap-3 hover:bg-primary hover:text-background hover:box-shadow-neon transition-all duration-300 w-full sm:w-auto justify-center">
                <Play className="w-5 h-5 fill-current" />
                Listen Now
              </button>
            </Link>
            <button className="px-8 py-4 rounded-full bg-white/5 border border-white/20 text-white font-semibold tracking-wide flex items-center gap-3 hover:bg-white/10 hover:border-white/50 transition-all duration-300 w-full sm:w-auto justify-center">
              <Heart className="w-5 h-5" />
              Exclusive Mixes
            </button>
          </motion.div>
        </div>
      </section>

      {/* FEATURED MIXES */}
      <section className="py-24 relative bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Featured <span className="text-primary text-shadow-neon">Mixes</span></h2>
              <p className="text-muted-foreground">The latest selections curated for the night.</p>
            </div>
            <Link href="/mixes" className="hidden md:block text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              View All Mixes &rarr;
            </Link>
          </div>

          {isLoading ? (
            <div className="flex gap-6 overflow-hidden">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex-[0_0_80%] md:flex-[0_0_40%] lg:flex-[0_0_28%] h-[350px] bg-white/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {featuredMixes?.map((mix) => (
                  <div key={mix.id} className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_28%] min-w-0">
                    <MixCard mix={mix} featured />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-8 text-center md:hidden">
            <Link href="/mixes" className="text-sm font-medium text-primary">View All Mixes</Link>
          </div>
        </div>
      </section>

      {/* GENRE CATEGORIES */}
      <section className="py-24 relative border-t border-white/5 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Discover Your <span className="text-accent text-shadow-neon-accent">Vibe</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From deep underground sets to high-energy mainstage anthems.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 bg-background hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Moon className="w-12 h-12 text-cyan-400 mb-6 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              <h3 className="text-2xl font-display font-bold text-white mb-3">Chill Nights</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">Smooth transitions, deep basslines, and late-night driving anthems.</p>
              <Link href="/mixes" className="inline-block text-cyan-400 font-medium text-sm hover:underline">Explore Vibe &rarr;</Link>
            </div>

            <div className="group relative overflow-hidden rounded-3xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-500 bg-background hover:shadow-[0_0_30px_rgba(249,115,22,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Flame className="w-12 h-12 text-orange-500 mb-6 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
              <h3 className="text-2xl font-display font-bold text-white mb-3">Club Energy</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">High BPM, heavy drops, and festival-ready tracks to light up the room.</p>
              <Link href="/mixes" className="inline-block text-orange-500 font-medium text-sm hover:underline">Explore Vibe &rarr;</Link>
            </div>

            <div className="group relative overflow-hidden rounded-3xl p-8 border border-white/10 hover:border-yellow-400/50 transition-all duration-500 bg-background hover:shadow-[0_0_30px_rgba(250,204,21,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Music className="w-12 h-12 text-yellow-400 mb-6 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
              <h3 className="text-2xl font-display font-bold text-white mb-3">Soul Vibes</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">Funk-infused beats, rhythmic grooves, and soulful vocal samples.</p>
              <Link href="/mixes" className="inline-block text-yellow-400 font-medium text-sm hover:underline">Explore Vibe &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
