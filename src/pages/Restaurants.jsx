import React, { useMemo, useState } from 'react';
import {
  CalendarCheck, CheckCircle2, ChefHat, Filter, Leaf, MapPin, ShieldCheck,
  ShoppingBag, Star, Utensils
} from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { findCheapest } from '../utils/priceHelper';

const Restaurants = () => {
  const [foodType, setFoodType] = useState('all');
  const [openMenuId, setOpenMenuId] = useState(null);

  const filteredRestaurants = useMemo(() => {
    if (foodType === 'all') return restaurants;
    return restaurants.filter(restaurant => restaurant.foodType === foodType);
  }, [foodType]);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'veg', label: 'Veg' },
    { id: 'non-veg', label: 'Non Veg' }
  ];

  const handleOrder = (provider) => {
    window.location.href = provider.url;
  };

  const handleReserve = (provider) => {
    window.location.href = provider.url;
  };

  return (
    <div className="bg-gray-50 pb-24">
      <section className="bg-gray-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-primary-light">
              <Utensils className="mr-2 h-4 w-4" />
              Restaurants
            </div>
            <h1 className="mb-5 text-4xl font-black tracking-tight md:text-5xl">
              Compare meals, menus, safety, delivery, and table reservations.
            </h1>
            <p className="text-lg leading-8 text-gray-300">
              Browse vegetarian and non-vegetarian restaurants with safety scores, delivery prices, and seat booking via District and Dineout.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl border border-gray-100 bg-white p-5 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="flex items-center text-xl font-black text-gray-900">
                <Filter className="mr-2 h-5 w-5 text-primary" />
                Food Filters
              </h2>
              <p className="mt-1 text-sm font-medium text-gray-500">Showing {filteredRestaurants.length} restaurants</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setFoodType(filter.id)}
                  className={`inline-flex items-center rounded-2xl border px-5 py-3 text-sm font-bold transition-all ${
                    foodType === filter.id
                      ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                      : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {filter.id === 'veg' && <Leaf className="mr-2 h-4 w-4" />}
                  {filter.id === 'non-veg' && <ChefHat className="mr-2 h-4 w-4" />}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {filteredRestaurants.map(restaurant => {
            const { sorted, cheapest, savingsPercent } = findCheapest(restaurant.prices);
            const reservationDeals = findCheapest(restaurant.reservationPrices);
            const bestReservation = reservationDeals.cheapest;
            const isMenuOpen = openMenuId === restaurant.id;

            return (
              <article key={restaurant.id} className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl">
                <div className="relative h-56 overflow-hidden">
                  <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
                  <div className="absolute left-4 top-4 flex items-center rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-gray-900 shadow-sm">
                    <Star className="mr-1 h-3 w-3 fill-yellow-500 text-yellow-500" />
                    {restaurant.rating}
                  </div>
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-green-700 shadow-sm">
                    Safety {restaurant.safetyScore}/100
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <div className="mb-2 flex flex-wrap gap-2">
                      <span className={`rounded-md px-2 py-1 text-[10px] font-black uppercase tracking-wider ${
                        restaurant.foodType === 'veg' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {restaurant.foodType === 'veg' ? 'Veg' : 'Non Veg'}
                      </span>
                      <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-blue-600">
                        Women & Minors {restaurant.safetyScore}/100
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900">{restaurant.name}</h3>
                    <div className="mt-2 flex items-center text-sm font-medium text-gray-500">
                      <MapPin className="mr-1 h-4 w-4 text-primary" />
                      {restaurant.location}
                    </div>
                    <p className="mt-2 text-sm font-bold text-gray-500">{restaurant.cuisine} • ₹{restaurant.priceForTwo.toLocaleString()} for two</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenMenuId(isMenuOpen ? null : restaurant.id)}
                    className="mb-5 flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-black text-gray-700 transition-all hover:border-primary hover:text-primary"
                  >
                    <span className="flex items-center">
                      <Utensils className="mr-2 h-4 w-4" />
                      Menu
                    </span>
                    <span>{isMenuOpen ? 'Hide' : 'View'}</span>
                  </button>

                  {isMenuOpen && (
                    <div className="mb-5 space-y-2 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                      {restaurant.menu.map(item => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                          <span className="font-bold text-gray-700">{item.name}</span>
                          <span className="font-black text-gray-900">₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mb-5 rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Best order price</span>
                      <span className="rounded-md bg-green-500 px-2 py-1 text-[10px] font-black text-white">Lowest</span>
                    </div>
                    <div className="space-y-2">
                      {sorted.map(site => (
                        <button
                          key={site.platform}
                          type="button"
                          onClick={() => handleOrder(site)}
                          className={`flex w-full items-center justify-between rounded-xl border p-2 transition-all ${
                            cheapest.platform === site.platform
                              ? 'border-primary/30 bg-white text-primary-dark shadow-sm'
                              : 'border-transparent text-gray-500 hover:border-gray-200 hover:bg-white'
                          }`}
                        >
                          <span className="flex items-center text-xs font-black">
                            <ShoppingBag className="mr-2 h-3 w-3" />
                            {site.platform}
                          </span>
                          <span className={`text-sm ${cheapest.platform === site.platform ? 'font-black' : 'font-bold line-through'}`}>
                            ₹{site.price.toLocaleString()}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between rounded-xl bg-green-50 px-3 py-2 text-xs font-black text-green-700">
                      <span>Best: {cheapest.platform}</span>
                      <span>Save {savingsPercent}%</span>
                    </div>
                  </div>

                  <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-inner">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <CalendarCheck className="mr-2 h-4 w-4 text-primary" />
                        Reserve a seat
                      </span>
                      <span className="rounded-md bg-blue-500 px-2 py-1 text-[10px] font-black text-white">District / Dineout</span>
                    </div>
                    <div className="space-y-2">
                      {reservationDeals.sorted.map(site => (
                        <button
                          key={site.platform}
                          type="button"
                          onClick={() => handleReserve(site)}
                          className={`flex w-full items-center justify-between rounded-xl border p-2 transition-all ${
                            bestReservation.platform === site.platform
                              ? 'border-primary/30 bg-primary/5 text-primary-dark shadow-sm'
                              : 'border-gray-100 text-gray-500 hover:border-primary/30 hover:bg-gray-50'
                          }`}
                        >
                          <span className="flex items-center text-xs font-black">
                            <CalendarCheck className="mr-2 h-3 w-3" />
                            Book via {site.platform}
                          </span>
                          <span className="text-sm font-black">₹{site.price.toLocaleString()}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 rounded-xl bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">
                      Best reservation: {bestReservation.platform} at ₹{bestReservation.price.toLocaleString()}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOrder(cheapest)}
                    className="flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-4 text-sm font-black text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Order with {cheapest.platform}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Restaurants;
