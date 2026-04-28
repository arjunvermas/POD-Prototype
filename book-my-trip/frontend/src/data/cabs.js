export const cabs = [
  {
    id: 1,
    type: "Sedan",
    model: "Toyota Corolla / Similar",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000",
    capacity: "4 Seats",
    features: ["AC", "Large Boot", "Phone Charger"],
    pricePerKm: 12,
    baseFare: 500
  },
  {
    id: 2,
    type: "SUV",
    model: "Toyota Innova / Similar",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000",
    capacity: "6-7 Seats",
    features: ["AC", "Extra Luggage", "Water Bottle"],
    pricePerKm: 18,
    baseFare: 800
  },
  {
    id: 3,
    type: "Luxury",
    model: "Mercedes-Benz E-Class",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000",
    capacity: "4 Seats",
    features: ["AC", "Leather Seats", "Wi-Fi"],
    pricePerKm: 45,
    baseFare: 2500
  }
];

export const recentRoutes = [
  { id: 1, from: "Delhi Airport", to: "Gurgaon", price: 650 },
  { id: 2, from: "Mumbai Airport", to: "South Mumbai", price: 850 },
  { id: 3, from: "Bangalore Airport", to: "Indiranagar", price: 1100 }
];

cabs.forEach(c => {
  const base = c.baseFare;
  c.prices = {
    makeMyTrip: base + Math.floor(Math.random() * 200) + 50,
    goibibo: base + Math.floor(Math.random() * 150),
    yatra: base + Math.floor(Math.random() * 250) + 100
  };
  const platforms = ['makeMyTrip', 'goibibo', 'yatra'];
  const minPlatform = platforms[Math.floor(Math.random() * platforms.length)];
  c.prices[minPlatform] = base;
});
