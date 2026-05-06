export const cabs = [
  {
    "id": 1,
    "type": "Economy",
    "rideClass": "economy",
    "model": "Toyota Corolla / Similar",
    "image": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000",
    "capacity": "4 Seats",
    "rating": 4.6,
    "eta": "8 min",
    "speedRank": "Balanced",
    "features": [
      "AC",
      "Large Boot",
      "Phone Charger"
    ],
    "pricePerKm": 12,
    "baseFare": 500,
    "prices": {
      "ola": 540,
      "uber": 575,
      "rapido": 500
    }
  },
  {
    "id": 2,
    "type": "Premiere",
    "rideClass": "premiere",
    "model": "Toyota Innova / Similar",
    "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000",
    "capacity": "6-7 Seats",
    "rating": 4.8,
    "eta": "11 min",
    "speedRank": "Comfort",
    "features": [
      "AC",
      "Extra Luggage",
      "Water Bottle"
    ],
    "pricePerKm": 18,
    "baseFare": 800,
    "prices": {
      "ola": 875,
      "uber": 920,
      "rapido": 800
    }
  },
  {
    "id": 3,
    "type": "Premiere",
    "rideClass": "premiere",
    "model": "Mercedes-Benz E-Class",
    "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000",
    "capacity": "4 Seats",
    "rating": 4.9,
    "eta": "15 min",
    "speedRank": "Premium",
    "features": [
      "AC",
      "Leather Seats",
      "Wi-Fi"
    ],
    "pricePerKm": 45,
    "baseFare": 2500,
    "prices": {
      "ola": 2650,
      "uber": 2500,
      "rapido": 2780
    }
  },
  {
    "id": 4,
    "type": "Economy",
    "rideClass": "economy",
    "model": "Tata Indica / Similar",
    "image": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000",
    "capacity": "4 Seats",
    "rating": 4.3,
    "eta": "12 min",
    "speedRank": "Budget",
    "features": [
      "AC",
      "Compact",
      "City Rides"
    ],
    "pricePerKm": 10,
    "baseFare": 400,
    "prices": {
      "ola": 425,
      "uber": 460,
      "rapido": 400
    }
  },
  {
    "id": 5,
    "type": "Premiere",
    "rideClass": "premiere",
    "model": "Ford Endeavour / Similar",
    "image": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=1000",
    "capacity": "7 Seats",
    "rating": 4.7,
    "eta": "14 min",
    "speedRank": "Spacious",
    "features": [
      "AC",
      "Ample Legroom",
      "Rear AC Vents"
    ],
    "pricePerKm": 25,
    "baseFare": 1200,
    "prices": {
      "ola": 1230,
      "uber": 1200,
      "rapido": 1325
    }
  },
  {
    "id": 6,
    "type": "Fastest",
    "rideClass": "fastest",
    "model": "Hyundai i20 Priority / Similar",
    "image": "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1000",
    "capacity": "4 Seats",
    "rating": 4.5,
    "eta": "4 min",
    "speedRank": "Fastest pickup",
    "features": [
      "Priority Driver",
      "AC",
      "Live Tracking"
    ],
    "pricePerKm": 16,
    "baseFare": 690,
    "prices": {
      "ola": 730,
      "uber": 690,
      "rapido": 710
    }
  },
  {
    "id": 7,
    "type": "Slowest",
    "rideClass": "slowest",
    "model": "Shared Hatchback / Similar",
    "image": "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&q=80&w=1000",
    "capacity": "3 Seats",
    "rating": 4.1,
    "eta": "18 min",
    "speedRank": "Slowest, lowest fare",
    "features": [
      "Shared Route",
      "AC",
      "Low Fare"
    ],
    "pricePerKm": 8,
    "baseFare": 310,
    "prices": {
      "ola": 345,
      "uber": 360,
      "rapido": 310
    }
  },
  {
    "id": 8,
    "type": "Fastest",
    "rideClass": "fastest",
    "model": "Airport Express Sedan",
    "image": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=1000",
    "capacity": "4 Seats",
    "rating": 4.8,
    "eta": "6 min",
    "speedRank": "Express",
    "features": [
      "Flight Tracking",
      "Priority Pickup",
      "2 Bags"
    ],
    "pricePerKm": 20,
    "baseFare": 980,
    "prices": {
      "ola": 1020,
      "uber": 980,
      "rapido": 1065
    }
  }
];

export const recentRoutes = [
  {
    "id": 1,
    "from": "Delhi Airport",
    "to": "Gurgaon",
    "pickup": "Indira Gandhi International Airport (DEL)",
    "drop": "Gurgaon Cyber City",
    "price": 650
  },
  {
    "id": 2,
    "from": "Mumbai Airport",
    "to": "South Mumbai",
    "pickup": "Chhatrapati Shivaji Maharaj International Airport (BOM)",
    "drop": "South Mumbai",
    "price": 850
  },
  {
    "id": 3,
    "from": "Bangalore Airport",
    "to": "Indiranagar",
    "pickup": "Kempegowda International Airport (BLR)",
    "drop": "Electronic City, Bangalore",
    "price": 1100
  },
  {
    "id": 4,
    "from": "Hyderabad Airport",
    "to": "Hitech City",
    "pickup": "Hitech City, Hyderabad",
    "drop": "Hitech City, Hyderabad",
    "price": 950
  }
];
