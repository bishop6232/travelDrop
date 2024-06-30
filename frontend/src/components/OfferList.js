import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OfferList = () => {
  const [offers, setOffers] = useState({});
  const [filteredOffers, setFilteredOffers] = useState({});
  const [filter, setFilter] = useState('all');
  const [sorting, setSort] = useState('asc');

  useEffect(() => {
    axios.get('http://localhost:3000/api/offers')
      .then((response) => {
        console.log('API response:', response.data);
        setOffers(response.data);
        setFilteredOffers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching offers:', error);
      });
  }, []);
  useEffect(() => {
    const offersArray = Object.values(offers);
    let filteredList = offersArray;

    if (filter === 'free') {
      filteredList = offersArray.filter((offer) => offer.Cost === '0');
    } 
    else if (filter === 'paid') {
      filteredList = offersArray.filter((offer) => offer.Cost > 0);
    }

    if (sorting === 'asc') {
      filteredList.sort((offer1, offer2) => offer1.Cost - offer2.Cost);
    } 
    else if (sorting === 'desc') {
      filteredList.sort((offer1, offer2) => offer2.Cost - offer1.Cost);
    }

    const filteredOffersObject = {};
    filteredList.forEach((offer) => {
      filteredOffersObject[offer.Offer_id] = {
        offer_id: offer.Offer_id,
        user_id: offer.User_id,
        title: offer.Title,
        insert_date: offer.Insert_Date,
        travel_date: offer.Travel_Date,
        from_Airport: offer.From_Airport,
        to_Airport: offer.To_Airport,
        type: offer.Type,
        cost: offer.Cost,
      };
    });
    
    setFilteredOffers(filteredOffersObject);
    
  }, [offers, filter, sorting]);

  return (
    <div className='offer-list'>
      
      <div className='offer-header'>
      <h2>Offer List</h2>
        <label>Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
        <label>Sort:</label>
        <select value={sorting} onChange={(e) => setSort(e.target.value)}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <table className='offerhead'>
        {Object.values(filteredOffers).map((offer) => (
          <th className='offers' key={offer.offer_id}> 
            <Link to={`/offer/${offer.offer_id}`}>Title: {offer.title}</Link> 
            <div >Cost: {offer.cost === 0 ? 'Free' : `$${offer.cost}`}</div>
            <div>Date: {offer.insert_date}</div>
          </th>
        ))}
      </table>
    </div>
  );
};

export default OfferList;
