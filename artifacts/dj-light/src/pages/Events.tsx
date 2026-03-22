import { PageLayout } from "@/components/layout/PageLayout";
import { useEvents } from "@/hooks/use-dj";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { BookingModal } from "@/components/BookingModal";

export default function Events() {
  const { data: events, isLoading } = useEvents();

  return (
    <PageLayout>
      <div className="pt-32 pb-24 px-6 lg:px-8 max-w-5xl mx-auto min-h-screen relative">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10" />

        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-6xl font-display font-bold mb-4"
            >
              Tour <span className="text-accent text-shadow-neon-accent font-script font-normal lowercase pl-2">Dates</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Catch DJ Light live in a city near you.
            </motion.p>
          </div>
          
          <BookingModal>
            <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2 w-fit">
              Host an Event <ArrowUpRight className="w-4 h-4" />
            </button>
          </BookingModal>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-secondary rounded-xl animate-pulse" />
            ))
          ) : (
            events?.map((event, index) => {
              const dateObj = new Date(event.date);
              const month = dateObj.toLocaleString('en-US', { month: 'short' });
              const day = dateObj.getDate();
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 gap-6"
                >
                  <div className="flex items-center gap-6 w-full sm:w-auto">
                    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-background border border-white/10 group-hover:border-primary/50 group-hover:box-shadow-neon transition-all shrink-0">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">{month}</span>
                      <span className="text-2xl font-display font-bold leading-none">{day}</span>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-xl font-display font-semibold text-white group-hover:text-primary transition-colors">{event.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {event.venue}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{event.city}</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto flex justify-end">
                    {event.status === "Sold Out" ? (
                      <span className="px-5 py-2.5 rounded-lg border border-destructive/50 text-destructive font-medium text-sm tracking-wide bg-destructive/10 w-full sm:w-auto text-center">
                        SOLD OUT
                      </span>
                    ) : (
                      <button className="px-5 py-2.5 rounded-lg border border-primary text-primary font-medium text-sm tracking-wide hover:bg-primary hover:text-background hover:box-shadow-neon transition-all w-full sm:w-auto text-center">
                        TICKETS
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
          
          {events?.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No upcoming events at the moment. Check back soon.
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
