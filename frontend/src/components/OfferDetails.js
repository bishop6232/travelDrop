import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OfferDetails = () => {
    const {offerId} = useParams();
    const [offer, setOffer] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
  
    useEffect(() => {
      axios.get(`http://localhost:3000/api/offers/${offerId}`)
        .then((response) => {
          setOffer(response.data);
          setLikes(response.data.likes|| 0);
          setDislikes(response.data.dislikes|| 0);
        })
        .catch((error) => {
          console.error('Error occured while fetching offer details:', error);
        });
    }, [offerId]);
  
    const handleLike = () => {
        setLikes((prevLikes) => prevLikes + 1);
      
        axios.put(`http://localhost:3000/api/offers/${offerId}`, { likes: likes + 1 })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Error updating likes:', error);
          });
      };
      
      const handleDislike = () => {
        setDislikes((prevDislikes) => prevDislikes + 1);
      
        axios.put(`http://localhost:3000/api/offers/${offerId}`, { dislikes: dislikes + 1 })
          .then((response) => {
            console.log(response.data); 
          })
          .catch((error) => {
            console.error('Error updating dislikes:', error);
          });
      };
      
  
    if (!offer) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className='offer-details'>
        <h2>Offer Details</h2>
        <div className='offers-details' >
          <h3>{offer.title}</h3>
          <p>Travel Date: {offer.Travel_Date}</p>
          <p>From: {offer.From_Airport}</p>
          <p>To: {offer.To_Airport}</p>
          <p>Type: {offer.Type}</p>
          <p>Cost: {offer.Cost === 0 ? 'Free' : `$${offer.Cost}`}</p>
          <p>Likes: {likes}</p>
          <p>Dislikes: {dislikes}</p>
          <button onClick={handleLike}>Like</button>
          <button onClick={handleDislike}>Dislike</button>
        </div>
      </div>
    );
  };
  
  export default OfferDetails;
  