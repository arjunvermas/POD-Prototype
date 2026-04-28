export const findCheapest = (prices) => {
  if (!prices) return { cheapest: null, savingsPercent: 0, sorted: [] };
  
  const priceArray = [
    { platform: 'MakeMyTrip', price: prices.makeMyTrip },
    { platform: 'Goibibo', price: prices.goibibo },
    { platform: 'Yatra', price: prices.yatra }
  ];
  
  const sorted = priceArray.sort((a, b) => a.price - b.price);
  const cheapest = sorted[0];
  
  // Calculate savings compared to highest price (sorted[2])
  const highest = sorted[2].price;
  const savingsPercent = ((highest - cheapest.price) / highest * 100).toFixed(1);
  const savingsAmount = highest - cheapest.price;
  
  return { cheapest, savingsPercent, savingsAmount, sorted };
};
