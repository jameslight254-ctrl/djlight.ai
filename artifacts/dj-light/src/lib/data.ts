export interface Mix {
  id: string;
  title: string;
  duration: string;
  genres: string[];
  imageUrl: string;
  featured: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  status: "Upcoming" | "Sold Out" | "Past";
}

export const MIXES: Mix[] = [
  {
    id: "1",
    title: "Midnight Soul Sessions",
    duration: "1:02:35",
    genres: ["Hip-Hop", "Chill", "Soul"],
    imageUrl: "images/mix-1.png",
    featured: true,
  },
  {
    id: "2",
    title: "Luxury Hip-Hop Vol. 1",
    duration: "58:49",
    genres: ["Hip-Hop", "Vibes"],
    imageUrl: "images/mix-2.png",
    featured: true,
  },
  {
    id: "3",
    title: "Late Night Drives",
    duration: "50:12",
    genres: ["Chill", "Electronic"],
    imageUrl: "images/mix-3.png",
    featured: true,
  },
  {
    id: "4",
    title: "Club Energy Vibes",
    duration: "45:38",
    genres: ["Club", "Dance", "Energy"],
    imageUrl: "images/mix-4.png",
    featured: true,
  },
  {
    id: "5",
    title: "Urban Nights",
    duration: "52:20",
    genres: ["Hip-Hop", "Soul", "R&B"],
    imageUrl: "images/mix-5.png",
    featured: true,
  },
  {
    id: "6",
    title: "Deep Grooves",
    duration: "48:15",
    genres: ["House", "Chill", "Deep"],
    imageUrl: "images/mix-6.png",
    featured: true,
  }
];

export const EVENTS: Event[] = [
  {
    id: "e1",
    title: "Neon Nights Showcase",
    date: "2024-06-12T22:00:00Z",
    venue: "The Grand",
    city: "New York City, NY",
    status: "Upcoming"
  },
  {
    id: "e2",
    title: "Underground Synth",
    date: "2024-06-19T23:30:00Z",
    venue: "Basement 45",
    city: "Los Angeles, CA",
    status: "Upcoming"
  },
  {
    id: "e3",
    title: "Summer Beach Fest",
    date: "2024-07-04T18:00:00Z",
    venue: "South Beach Arena",
    city: "Miami, FL",
    status: "Sold Out"
  },
  {
    id: "e4",
    title: "Electric Sky Festival",
    date: "2024-07-15T20:00:00Z",
    venue: "Desert Grounds",
    city: "Las Vegas, NV",
    status: "Upcoming"
  },
  {
    id: "e5",
    title: "Rhythm & Lights",
    date: "2024-08-02T22:00:00Z",
    venue: "Skyline Rooftop",
    city: "Chicago, IL",
    status: "Upcoming"
  }
];
