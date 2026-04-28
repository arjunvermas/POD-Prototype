export const flights = [
  {
    id: 1,
    airline: "Air India",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Air_India_Logo.svg/1200px-Air_India_Logo.svg.png",
    origin: "Delhi",
    destination: "Mumbai",
    departure: "06:00 AM",
    arrival: "08:15 AM",
    duration: "2h 15m",
    price: 5400,
    stops: "Non-stop",
    category: "Morning"
  },
  {
    id: 2,
    airline: "IndiGo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/IndiGo_logo.svg/1200px-IndiGo_logo.svg.png",
    origin: "Delhi",
    destination: "Mumbai",
    departure: "09:30 AM",
    arrival: "11:45 AM",
    duration: "2h 15m",
    price: 4800,
    stops: "Non-stop",
    category: "Morning"
  },
  {
    id: 3,
    airline: "Vistara",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Vistara_logo.svg/1200px-Vistara_logo.svg.png",
    origin: "Delhi",
    destination: "Mumbai",
    departure: "02:00 PM",
    arrival: "04:10 PM",
    duration: "2h 10m",
    price: 6200,
    stops: "Non-stop",
    category: "Afternoon"
  },
  {
    id: 4,
    airline: "SpiceJet",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/SpiceJet_logo.svg/1200px-SpiceJet_logo.svg.png",
    origin: "Delhi",
    destination: "Bangalore",
    departure: "07:00 PM",
    arrival: "09:45 PM",
    duration: "2h 45m",
    price: 5900,
    stops: "Non-stop",
    category: "Evening"
  },
  {
    id: 5,
    airline: "Air India",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Air_India_Logo.svg/1200px-Air_India_Logo.svg.png",
    origin: "Mumbai",
    destination: "Goa",
    departure: "11:00 PM",
    arrival: "12:15 AM",
    duration: "1h 15m",
    price: 3200,
    stops: "Non-stop",
    category: "Night"
  },
  {
    id: 6,
    airline: "IndiGo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/IndiGo_logo.svg/1200px-IndiGo_logo.svg.png",
    origin: "Delhi",
    destination: "Chennai",
    departure: "10:00 AM",
    arrival: "03:30 PM",
    duration: "5h 30m",
    price: 7500,
    stops: "1 Stop",
    category: "Morning"
  }
];
// Adding more flights dynamically for search results
for(let i=7; i<=15; i++) {
  flights.push({
    id: i,
    airline: i % 2 === 0 ? "Vistara" : "SpiceJet",
    logo: i % 2 === 0 ? "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Vistara_logo.svg/1200px-Vistara_logo.svg.png" : "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/SpiceJet_logo.svg/1200px-SpiceJet_logo.svg.png",
    origin: "Delhi",
    destination: "Mumbai",
    departure: `${(i+5)%12 || 12}:30 ${i % 2 === 0 ? 'PM' : 'AM'}`,
    arrival: `${(i+7)%12 || 12}:45 ${i % 2 === 0 ? 'PM' : 'AM'}`,
    duration: "2h 15m",
    price: 4000 + (Math.random() * 4000),
    stops: i % 4 === 0 ? "1 Stop" : "Non-stop",
    category: (i+5)%24 < 12 ? "Morning" : "Afternoon"
  });
}

flights.forEach(f => {
  const base = f.price;
  f.prices = {
    makeMyTrip: base + Math.floor(Math.random() * 500) + 100,
    goibibo: base + Math.floor(Math.random() * 600),
    yatra: base + Math.floor(Math.random() * 700) + 200
  };
  const platforms = ['makeMyTrip', 'goibibo', 'yatra'];
  const minPlatform = platforms[Math.floor(Math.random() * platforms.length)];
  f.prices[minPlatform] = base;
});
