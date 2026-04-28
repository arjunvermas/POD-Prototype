export const hotels = [
  {
    id: 1,
    name: "The Grand Regal Goa",
    location: "Calangute, Goa",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000",
    rating: 4.8,
    reviews: 1240,
    price: 8500,
    amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Parking"],
    type: "Resort",
    verified: true,
    description: "A luxury resort steps away from the beach with world-class dining."
  },
  {
    id: 2,
    name: "Ocean View Suites",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1000",
    rating: 4.9,
    reviews: 850,
    price: 45000,
    amenities: ["WiFi", "Pool", "Spa", "Private Beach", "Breakfast"],
    type: "Resort",
    verified: true,
    description: "Experience paradise in our overwater bungalows."
  },
  {
    id: 3,
    name: "Parisian Elegance Hotel",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1551882547-ff43c61f38e0?auto=format&fit=crop&q=80&w=1000",
    rating: 4.7,
    reviews: 2100,
    price: 22000,
    amenities: ["WiFi", "Bar", "Room Service", "Laundry"],
    type: "Hotel",
    verified: true,
    description: "Classic French elegance in the heart of the city."
  },
  {
    id: 4,
    name: "Sky High Dubai",
    location: "Dubai Marina, Dubai",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
    rating: 4.6,
    reviews: 3200,
    price: 18000,
    amenities: ["WiFi", "Pool", "Gym", "Valet Parking"],
    type: "Hotel",
    verified: false,
    description: "Modern luxury with stunning views of the marina."
  }
];

const HOTEL_IMAGE_IDS = [
    "1520250497591-112f2f40a3f4",
    "1566665797739-1674de7a421a",
    "1542314831-068cd1dbfeeb",
    "1571896349842-33c89424de2d",
    "1611892440504-42a792e24d32",
    "1445019980597-93fa2acb246c",
    "1564501049412-61c2a3083791",
    "1618773922491-c90a47cd2547"
];

// Adding more hotels with actual hotel images
for(let i=5; i<=20; i++) {
  const photoId = HOTEL_IMAGE_IDS[i % HOTEL_IMAGE_IDS.length];
  hotels.push({
    id: i,
    name: `The ${["Royal", "Classic", "Prime", "Elite", "Urban"][i % 5]} ${["Oasis", "Retreat", "Residency", "Plaza", "Grande"][i % 5]}`,
    location: ["Delhi", "Mumbai", "Bangalore", "Goa", "Pune", "Kolkata"][i % 6],
    image: `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=1000`,
    rating: (3.8 + Math.random() * 1.2).toFixed(1),
    reviews: Math.floor(Math.random() * 2000) + 100,
    price: 3500 + Math.floor(Math.random() * 15000),
    amenities: ["WiFi", "Parking", "Breakfast", "AC", "Room Service"],
    type: i % 3 === 0 ? "Boutique Hotel" : "Luxury Hotel",
    verified: i % 2 === 0,
    description: "Premium hospitality with modern amenities and heart-winning service."
  });
}

hotels.forEach(h => {
  const base = h.price;
  h.prices = {
    makeMyTrip: base + Math.floor(Math.random() * 1500) + 200,
    goibibo: base + Math.floor(Math.random() * 1200),
    yatra: base + Math.floor(Math.random() * 2000) + 500
  };
  const platforms = ['makeMyTrip', 'goibibo', 'yatra'];
  const minPlatform = platforms[Math.floor(Math.random() * platforms.length)];
  h.prices[minPlatform] = base;
});
