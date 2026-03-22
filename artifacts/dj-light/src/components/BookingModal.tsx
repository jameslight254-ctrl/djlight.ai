import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSubmitBooking } from "@/hooks/use-dj";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Mail, User, Info, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingModalProps {
  children: React.ReactNode;
}

export function BookingModal({ children }: BookingModalProps) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useSubmitBooking();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventType: "",
    date: "",
    details: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        setOpen(false);
        setFormData({ name: "", email: "", eventType: "", date: "", details: "" });
        toast({
          title: "Booking Request Sent!",
          description: "DJ Light's team will get back to you within 24 hours.",
        });
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Please try again later.",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-primary/20 bg-background/95 backdrop-blur-xl shadow-[0_0_50px_rgba(0,212,255,0.15)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display uppercase tracking-widest text-primary text-shadow-neon">Book DJ Light</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill out the form below to request a booking for your next event. Sound meets brilliance.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                required
                type="text"
                placeholder="Full Name"
                className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                required
                type="email"
                placeholder="Email Address"
                className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                <select
                  required
                  className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-foreground appearance-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  value={formData.eventType}
                  onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                >
                  <option value="" disabled>Event Type</option>
                  <option value="Club">Club Night</option>
                  <option value="Festival">Festival</option>
                  <option value="Private">Private Event</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>
              
              <div className="relative group">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                <input
                  required
                  type="date"
                  className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>
            
            <div className="relative group">
              <Info className="absolute left-3 top-4 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <textarea
                required
                rows={4}
                placeholder="Event Details & Requirements"
                className="w-full bg-secondary/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
              />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end gap-3">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isPending}
              className="bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all duration-300"
            >
              {isPending ? "Submitting..." : "Send Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
