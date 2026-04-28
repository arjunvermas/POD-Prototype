export const packages = [
  {
    id: 1,
    name: "Romantic Goa Getaway",
    destination: "Goa",
    duration: "5 Days / 4 Nights",
    image: "https://picsum.photos/seed/pkg1/1000/600",
    price: 15999,
    rating: 4.8,
    type: "Romantic",
    includes: ["Flights", "Hotels", "Meals", "Sightseeing"],
    description: "Enjoy a romantic getaway with your partner in the scenic beaches of Goa."
  },
  {
    id: 2,
    name: "Adventure in Manali",
    destination: "Manali",
    duration: "6 Days / 5 Nights",
    image: "https://picsum.photos/seed/pkg2/1000/600",
    price: 12500,
    rating: 4.6,
    type: "Adventure",
    includes: ["Hotels", "Transport", "Activities"],
    description: "Trekking, paragliding and river rafting in the Himalayas."
  },
  {
    id: 3,
    name: "Golden Triangle Tour",
    destination: "Delhi-Agra-Jaipur",
    duration: "7 Days / 6 Nights",
    image: "https://picsum.photos/seed/pkg3/1000/600",
    price: 24999,
    rating: 4.9,
    type: "Family",
    includes: ["Flights", "Hotels", "Guide", "Private Cab"],
    description: "Explore the rich history and culture of North India."
  }
];

for(let i=4; i<=15; i++) {
    packages.push({
        id: i,
        name: `${["Ethereal", "Majestic", "Mystic", "Grand"][i % 4]} ${["Kerala", "Kashmir", "Sikkim", "Rajasthan"][i % 4]} Expedition`,
        destination: ["Kerala", "Kashmir", "Sikkim", "Rajasthan"][i % 4],
        duration: `${i % 5 + 3} Days / ${i % 5 + 2} Nights`,
        image: `https://picsum.photos/seed/pkg${i}/1000/600`,
        price: 10000 + (Math.random() * 20000),
        rating: (4.0 + Math.random()).toFixed(1),
        type: ["Family", "Solo", "Adventure", "Honeymoon"][i % 4],
        includes: ["Hotels", "Meals", "Transport"],
        description: "A specially curated package for an unforgettable experience."
    });
}
