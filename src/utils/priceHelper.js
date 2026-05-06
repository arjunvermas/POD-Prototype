export const findCheapest = (prices) => {
  if (!prices) return { cheapest: null, savingsPercent: 0, sorted: [] };

  const platformMeta = {
    makeMyTrip: { platform: 'MakeMyTrip', url: 'https://www.makemytrip.com/' },
    goibibo: { platform: 'Goibibo', url: 'https://www.goibibo.com/' },
    bookingDotCom: { platform: 'Booking.com', url: 'https://www.booking.com/' },
    ola: { platform: 'Ola', url: 'https://www.olacabs.com/' },
    uber: { platform: 'Uber', url: 'https://www.uber.com/in/en/ride/' },
    rapido: { platform: 'Rapido', url: 'https://www.rapido.bike/' },
    swiggy: { platform: 'Swiggy', url: 'https://www.swiggy.com/' },
    zomato: { platform: 'Zomato', url: 'https://www.zomato.com/' },
    eatsure: { platform: 'EatSure', url: 'https://www.eatsure.com/' },
    district: { platform: 'District', url: 'https://www.district.in/' },
    dineout: { platform: 'Dineout', url: 'https://www.dineout.co.in/' }
  };

  const priceArray = Object.entries(prices)
    .map(([key, value]) => {
      if (typeof value === 'object') {
        return {
          platform: value.platform || platformMeta[key]?.platform || key,
          price: value.price,
          url: value.url || platformMeta[key]?.url || '#'
        };
      }

      return {
        platform: platformMeta[key]?.platform || key,
        price: value,
        url: platformMeta[key]?.url || '#'
      };
    })
    .filter(site => typeof site.price === 'number');

  const sorted = priceArray.sort((a, b) => a.price - b.price);
  const cheapest = sorted[0];
  if (!cheapest) return { cheapest: null, savingsPercent: 0, savingsAmount: 0, sorted: [] };
  
  const highest = sorted[sorted.length - 1].price;
  const savingsPercent = ((highest - cheapest.price) / highest * 100).toFixed(1);
  const savingsAmount = highest - cheapest.price;
  
  return { cheapest, savingsPercent, savingsAmount, sorted };
};
