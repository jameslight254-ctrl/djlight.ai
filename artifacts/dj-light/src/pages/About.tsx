import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { BookingModal } from "@/components/BookingModal";
import { Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <PageLayout>
      <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-1/3 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[150px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 relative z-10 box-shadow-neon">
                <img 
                  src={`${import.meta.env.BASE_URL}images/dj-portrait.png`} 
                  alt="DJ Light Portrait" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
              
              {/* Decorative elements behind image */}
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-primary/30 rounded-3xl -z-10" />
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-accent/30 rounded-3xl -z-10" />
            </motion.div>

            {/* Text Column */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                The <br/>
                <span className="text-primary text-shadow-neon font-script lowercase text-6xl md:text-8xl">Architect</span> <br/>
                of Sound
              </h1>
              
              <div className="space-y-6 text-white/70 text-lg leading-relaxed font-light mb-10">
                <p>
                  Emerging from the underground scene, DJ Light has spent the last decade perfecting a sound that bridges the gap between deep, soul-stirring rhythms and explosive club anthems.
                </p>
                <p>
                  With a residency at some of the world's most exclusive venues, Light's sets are renowned for their cinematic quality—building tension through atmospheric soundscapes before unleashing pure, unfiltered energy on the dancefloor.
                </p>
                <p className="pl-4 border-l-2 border-primary text-white italic font-medium">
                  "It's not just about playing tracks. It's about engineering an environment where time stops and the bass takes control."
                </p>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <BookingModal>
                  <button className="px-8 py-4 rounded-xl bg-primary text-background font-bold tracking-wide hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 box-shadow-neon">
                    Book for Event <ArrowRight className="w-5 h-5" />
                  </button>
                </BookingModal>
                
                <div className="flex gap-3 ml-4">
                  {[Instagram, Twitter, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </PageLayout>
  );
}
