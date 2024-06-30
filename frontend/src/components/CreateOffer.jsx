import React, {useState}  from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CreateOffer() {
  const navigate = useNavigate();
  const[currentOffer, setNewOffer ] = useState({
    email: '',
    title: '',
    insertDate: '',
    travelDate: '',
    fromAirport: '',
    toAirport: '',
    type: '',
    cost: 0,
  });
  
  const handleChange = event =>{
    const {name, value} = event.target;

    setNewOffer((prevState)=> ({
        ...prevState,
        [name]: value,
    }))
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/api/offers', currentOffer)
      .then((response) => {
        console.log('Offer created successfully:', response.data);
        alert('offer created successfully')
        navigate('/Welcome');
      })
      .catch((error) => {
        console.error('Error creating offer:', error);
      });
  };
  
  
  
  return (
    <div className='user-form'>
      <h2>Create New Offer</h2>
      <form onSubmit={handleSubmit} className='form'>

        <label>E-mail</label>
        <input type='email' name='email' value={currentOffer.email} onChange={handleChange} required/>

        <label>Title:</label>
        <input type="text" name="title" value={currentOffer.title} onChange={handleChange} required />

        <label>insert  Date:</label>
        <input type="date" name="insertDate" value={currentOffer.insertDate} onChange={handleChange} required />

        <label>Travel Date:</label>
        <input type="date" name="travelDate" value={currentOffer.travelDate} onChange={handleChange} required />

        <label>From Airport:</label>
        <input type="text" name="fromAirport" value={currentOffer.fromAirport} onChange={handleChange} required />

        <label>To Airport:</label>
        <input type="text" name="toAirport" value={currentOffer.toAirport} onChange={handleChange} required />

        <label>Type:</label>
        <input type='text' name='type' value={currentOffer.type} onChange={handleChange} required />

        <label>Cost:</label>
        <input type="string" name="cost" value={currentOffer.cost} onChange={handleChange} required />


        <button type="submit">Create Offer</button>
      </form>
    </div>
  );
}

export default  CreateOffer ;
