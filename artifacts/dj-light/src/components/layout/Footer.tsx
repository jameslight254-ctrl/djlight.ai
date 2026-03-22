import { Link } from "wouter";
import { Instagram, Twitter, Youtube, Music2 } from "lucide-react";
import { useState } from "react";
import { useNewsletterSubscription } from "@/hooks/use-dj";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useNewsletterSubscription();
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    mutate(email, {
      onSuccess: () => {
        toast({ title: "Subscribed!", description: "Welcome to the neon fam." });
        setEmail("");
      }
    });
  };

  return (
    <footer className="border-t border-white/5 bg-background pt-16 pb-8 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-xl font-display font-bold tracking-widest text-white">DJ</span>
              <span className="text-2xl font-script text-primary text-shadow-neon">Light</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-4 max-w-xs">
              Sound meets brilliance. Exploring the boundaries of neon nights, deep grooves, and cinematic club experiences.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Twitter, Youtube, Music2].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-primary hover:bg-primary/10 hover:box-shadow-neon transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-display tracking-wider font-semibold mb-6">Explore</h4>
            <ul className="space-y-3">
              {['Home', 'Mixes', 'Events', 'About'].map(item => (
                <li key={item}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-display tracking-wider font-semibold mb-6">Inquiries</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Bookings: bookings@djlight.com</li>
              <li>Press: press@djlight.com</li>
              <li>Mgmt: mgmt@djlight.com</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display tracking-wider font-semibold mb-6">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Get the latest mixes and secret show locations.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary transition-colors"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button 
                type="submit"
                disabled={isPending}
                className="bg-primary/20 text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-background transition-colors disabled:opacity-50"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DJ Light Official. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
