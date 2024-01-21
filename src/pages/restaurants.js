import React, { useState, useEffect } from 'react';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:3000/restaurants');
        if (response.ok) {
          const data = await response.json();
          setRestaurants(data);
        } else {
          console.error('Failed to fetch restaurants:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <h1>Restaurant List</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.restaurant_id}>
            <h2>{restaurant.name}</h2>
            <img src={restaurant.image} alt={restaurant.name} style={{ maxWidth: '300px' }} />
            <p>Location: {restaurant.location}</p>
            <p>Cuisine Type: {restaurant.cuisine_type}</p>
            <p>Created At: {restaurant.created_at}</p>
            {/* You can add more details if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Restaurants;
