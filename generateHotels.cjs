const fs = require('fs');

const locations = [
  { city: "Delhi", state: "Delhi", names: ["The Leela Palace", "ITC Maurya", "Taj Palace"] },
  { city: "Bombay", state: "Maharashtra", names: ["Taj Mahal Palace", "JW Marriott", "The Oberoi"] },
  { city: "Bangalore", state: "Karnataka", names: ["ITC Gardenia", "The Leela Palace", "Taj West End"] },
  { city: "Chennai", state: "Tamil Nadu", names: ["ITC Grand Chola", "Taj Connemara", "The Leela Palace"] },
  { city: "Kolkata", state: "West Bengal", names: ["ITC Royal Bengal", "Taj Bengal", "The Oberoi Grand"] },
  { city: "Hyderabad", state: "Telangana", names: ["Taj Falaknuma Palace", "Novotel", "Radisson Blu"] },
  { city: "Goa", state: "Goa", names: ["The Grand Regal", "Taj Exotica", "W Goa"] },
  { city: "Pune", state: "Maharashtra", names: ["JW Marriott", "Conrad", "Ritz Carlton"] },
  { city: "Ahmedabad", state: "Gujarat", names: ["Courtyard by Marriott", "Hyatt Regency", "Taj Skyline"] },
  { city: "Jaipur", state: "Rajasthan", names: ["Rambagh Palace", "The Oberoi Rajvilas", "Fairmont"] }
];

const types = ["Luxury Hotel", "Business Hotel", "Resort", "Heritage Hotel"];
const amenitiesList = [
  ["WiFi", "Pool", "Gym", "Restaurant", "Parking"],
  ["WiFi", "Pool", "Spa", "Private Beach", "Breakfast"],
  ["WiFi", "Bar", "Room Service", "Laundry"],
  ["WiFi", "Eco-friendly", "Pool", "Helipad", "Spa"],
  ["WiFi", "Business Center", "Pool", "Gym", "Bar"]
];
const images = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1551882547-ff43c61f38e0?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1618773922491-c90a47cd2547?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000"
];

let idCounter = 1;
const hotels = [];

const getRandomPrice = (min, max) => Math.floor(Math.random() * ((max - min) / 500 + 1)) * 500 + min;

for (const loc of locations) {
  for (let i = 0; i < loc.names.length; i++) {
    const basePrice = getRandomPrice(6000, 25000);
    const rating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
    
    hotels.push({
      id: idCounter++,
      name: loc.names[i],
      location: "City Center, " + loc.city,
      image: images[Math.floor(Math.random() * images.length)],
      rating: parseFloat(rating),
      reviews: Math.floor(Math.random() * 4000) + 500,
      price: basePrice,
      amenities: amenitiesList[Math.floor(Math.random() * amenitiesList.length)],
      type: types[Math.floor(Math.random() * types.length)],
      verified: Math.random() > 0.3,
      familyFriendly: Math.random() > 0.2,
      safetyScore: Math.floor(Math.random() * 20) + 80,
      description: "Experience premium luxury and comfort at " + loc.names[i] + " situated in the heart of " + loc.city + ".",
      prices: {
        makeMyTrip: basePrice,
        goibibo: basePrice + Math.floor(Math.random() * 1000) - 200,
        bookingDotCom: basePrice + Math.floor(Math.random() * 1500)
      }
    });
  }
}

hotels.push({
  id: idCounter++,
  name: "Ocean View Suites",
  location: "Maldives",
  image: images[1],
  rating: 4.9,
  reviews: 850,
  price: 45000,
  amenities: amenitiesList[1],
  type: "Resort",
  verified: true,
  familyFriendly: true,
  safetyScore: 96,
  description: "Experience paradise in our overwater bungalows.",
  prices: {
    makeMyTrip: 45345,
    goibibo: 45000,
    bookingDotCom: 46389
  }
});

const fileContent = "export const hotels = " + JSON.stringify(hotels, null, 2) + ";\n";
fs.writeFileSync('/Users/arjun/Desktop/pod-new/src/data/hotels.js', fileContent);
console.log('Successfully generated ' + hotels.length + ' hotels!');
