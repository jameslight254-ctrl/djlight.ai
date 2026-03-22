import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MIXES, EVENTS, type Mix, type Event } from "@/lib/data";

// Simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useMixes() {
  return useQuery({
    queryKey: ["mixes"],
    queryFn: async (): Promise<Mix[]> => {
      await delay(400);
      return MIXES;
    }
  });
}

export function useFeaturedMixes() {
  return useQuery({
    queryKey: ["mixes", "featured"],
    queryFn: async (): Promise<Mix[]> => {
      await delay(300);
      return MIXES.filter(m => m.featured);
    }
  });
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async (): Promise<Event[]> => {
      await delay(400);
      return EVENTS;
    }
  });
}

export interface BookingRequest {
  name: string;
  email: string;
  eventType: string;
  date: string;
  details: string;
}

export function useSubmitBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: BookingRequest) => {
      await delay(1000); // Simulate network request
      // In a real app we would POST here
      console.log("Booking submitted:", data);
      return { success: true, message: "Booking request received" };
    },
    onSuccess: () => {
      // Invalidate relevant queries if needed
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    }
  });
}

export function useNewsletterSubscription() {
  return useMutation({
    mutationFn: async (email: string) => {
      await delay(600);
      return { success: true };
    }
  });
}
