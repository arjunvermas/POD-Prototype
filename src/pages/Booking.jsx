import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Plane, Building, Car, Loader } from 'lucide-react';
import { findCheapest } from '../utils/priceHelper';

const Booking = () => {
  const { currentBooking } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentBooking) {
      navigate('/');
      return;
    }

    const { type, item, searchParams } = currentBooking;
    const pricesObj = item.prices || (currentBooking.room && currentBooking.room.prices) || item.prices || {};
    const cheapestData = findCheapest(pricesObj);
    const provider = currentBooking.selectedProvider || cheapestData?.cheapest;

    if (!provider) {
      navigate(-1);
      return;
    }

    // Build redirect URL
    const platform = provider.platform.toLowerCase();
    let redirectUrl = provider.url || 'https://www.makemytrip.com/';

    const extractCode = (str) => {
      if (!str) return 'DEL';
      if (str.includes('(') && str.includes(')')) {
        return str.split('(')[1].split(')')[0];
      }
      return str.substring(0, 3).toUpperCase();
    };

    if (type === 'flight') {
      const origin = extractCode(searchParams?.origin || item.origin);
      const dest = extractCode(searchParams?.destination || item.destination);
      const date = searchParams?.departureDate || '2026-05-10';

      if (platform.includes('makemytrip')) {
        const formattedDate = date.split('-').reverse().join('/'); // 10/05/2026
        if (searchParams?.returnDate) {
          const retDate = searchParams.returnDate.split('-').reverse().join('/');
          redirectUrl = `https://www.makemytrip.com/flight/search?itinerary=${origin}-${dest}-${formattedDate}_${dest}-${origin}-${retDate}&tripType=R&paxType=A-1_C-0_I-0&intl=false&cabinClass=E&ccde=IN&lang=eng`;
        } else {
          redirectUrl = `https://www.makemytrip.com/flight/search?itinerary=${origin}-${dest}-${formattedDate}&tripType=O&paxType=A-1_C-0_I-0&intl=false&cabinClass=E&ccde=IN&lang=eng`;
        }
      } else if (platform.includes('goibibo')) {
        const formattedDate = date.split('-').join(''); // 20260510
        if (searchParams?.returnDate) {
          const retDate = searchParams.returnDate.split('-').join('');
          redirectUrl = `https://www.goibibo.com/flights/flights-from-${origin}-to-${dest}/?date=${formattedDate}&retDate=${retDate}`;
        } else {
          redirectUrl = `https://www.goibibo.com/flights/flights-from-${origin}-to-${dest}/?date=${formattedDate}`;
        }
      } else if (platform.includes('booking.com')) {
        redirectUrl = `https://flights.booking.com/flights/${origin}-${dest}/?date=${date}`;
      } else {
        redirectUrl = `https://www.google.com/flights?q=flights+from+${origin}+to+${dest}+on+${date}`;
      }
    } else if (type === 'hotel') {
      const city = searchParams?.city || item.location || 'Goa';
      const checkIn = searchParams?.checkInDate || '2026-05-10';
      const checkOut = searchParams?.checkOutDate || '2026-05-11';
      
      if (platform.includes('makemytrip')) {
        redirectUrl = `https://www.makemytrip.com/hotels/hotel-listing/?city=${city}&checkin=${checkIn}&checkout=${checkOut}`;
      } else if (platform.includes('goibibo')) {
        redirectUrl = `https://www.goibibo.com/hotels/hotels-in-${city.toLowerCase()}-ct/?chkin=${checkIn}&chkout=${checkOut}`;
      } else if (platform.includes('booking.com')) {
        redirectUrl = `https://www.booking.com/searchresults.html?ss=${city}&checkin=${checkIn}&checkout=${checkOut}`;
      } else {
        redirectUrl = `https://www.google.com/travel/hotels?q=hotels+in+${city}+${checkIn}+to+${checkOut}`;
      }
    } else if (type === 'cab') {
      const pickup = item.origin || 'Delhi';
      const drop = item.destination || 'Agra';
      redirectUrl = `https://www.makemytrip.com/cabs/`;
    }

    const timer = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 2500);

    return () => clearTimeout(timer);
  }, [currentBooking, navigate]);

  if (!currentBooking) return null;

  const { type, item } = currentBooking;
  const pricesObj = item.prices || (currentBooking.room && currentBooking.room.prices) || item.prices || {};
  const cheapestData = findCheapest(pricesObj);
  const provider = currentBooking.selectedProvider || cheapestData?.cheapest;

  const Icon = type === 'flight' ? Plane : type === 'hotel' ? Building : Car;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-[3rem] p-12 max-w-lg w-full text-center shadow-2xl border border-gray-100 animate-fade-in">
        <div className="relative inline-block mb-8">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon className="w-10 h-10 text-primary" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100">
            <Loader className="w-5 h-5 text-secondary animate-spin" />
          </div>
        </div>
        
        <h1 className="text-3xl font-black text-gray-900 mb-4">Redirecting you...</h1>
        <p className="text-gray-500 font-medium text-lg mb-8">
          We're taking you securely to <span className="text-primary font-bold">{provider?.platform}</span> to complete your search.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-xl p-2 shadow-sm">
              <img src={item.logo || item.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=100&h=100&fit=crop"} alt={item.name || item.airline || type} className="w-full h-full object-contain rounded-lg" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{item.name || `${item.airline || item.origin} ${type === 'flight' ? '✈️' : '→'} ${item.destination}`}</p>
              <p className="text-xs text-gray-500 font-medium mt-1">
                {currentBooking.searchParams?.departureDate || currentBooking.searchParams?.checkInDate || 'Fetching best deals...'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <span>Secure transfer</span>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <span>Parameters Applied</span>
        </div>
      </div>
    </div>
  );
};

export default Booking;
