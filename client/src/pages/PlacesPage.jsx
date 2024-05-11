import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";

export default function PlacesPage() {
    const {action} = useParams()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [perks, setPerks] = useState([])
    const [description, setDescription] = useState('')
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [price,setPrice] = useState(100);
    const [redirect,setRedirect] = useState(false);


    function inputHeader(text) {
        return (
          <h2 className="text-2xl mt-4">{text}</h2>
        );
      }

      function inputDescription(text) {
        return (
          <p className="text-gray-500 text-sm">{text}</p>
        );
      }

      function preInput(header,description) {
        return (
          <>
            {inputHeader(header)}
            {inputDescription(description)}
          </>
        );
      }

      async function addNewPlace(ev) {
        ev.preventDefault()
        const placeData =  {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price,
          }
        await axios.post('/places', placeData)
        setRedirect('/account/places');
        
      }

      if (redirect) {
        return <Navigate to={'/account/places'} />
      }

    //   async function savePlace(ev) {
    //     ev.preventDefault();
    //     const placeData = {
    //       title, address, addedPhotos,
    //       description, perks, extraInfo,
    //       checkIn, checkOut, maxGuests, price,
    //     };
    //     if (id) {
    //       // update
    //       await axios.put('/places', {
    //         id, ...placeData
    //       });
    //       setRedirect(true);
    //     } else {
    //       // new place
    //       await axios.post('/places', placeData);
    //       setRedirect(true);
    //     }
    
    //   }
    
     
      

    return (
        <div>
            {action !== 'new' && (
            <div className="classname">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
                    Add new place
                </Link>
            </div>
            )}
            {
                action === 'new' && (
                    <div className="max-w-full flex justify-center">
                        <form onSubmit={addNewPlace} className="max-w-2xl">
                            {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
                            <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Title eg: My sweet home" />
                            {preInput('Address', 'Address to this place')}
                            <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address" />
                            {preInput('Photos', 'Show how it looks')}
                            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                            <div>
                                {preInput('Description', 'Describe the place')}
                                <textarea value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
                            </div>
                            <h2 className="mt-4 text-2xl">Select Perks</h2>
                            <p className="text-gray-500 text-sm">Select all perks that apply</p>
                            <Perks selected={perks} onChange={setPerks} />
                            {preInput('Extra Information', 'House Rules')}
                            <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}></textarea>
                            {preInput('Check-in & Check-out', 'Add check-in and check-out times')}
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <h3 className="mt-2 -mb-1">Check-in Time</h3>
                                    <input type="text" 
                                    value={checkIn} 
                                    onChange={ev => setCheckIn(ev.target.value)} 
                                    placeholder="12:00" />
                                </div>
                                <div>
                                    <h3 className="mt-2 -mb-1">Check-out Time</h3>
                                    <input type="text" 
                                    value={checkOut}
                                    onChange={ev => setCheckOut(ev.target.value)} 
                                    placeholder="12:00" />
                                </div>
                                <div>
                                    <h3 className="mt-2 -mb-1">Max Guests</h3>
                                    <input type="number" 
                                    value={maxGuests}
                                    onChange={ev => setMaxGuests(ev.target.value)} />
                                </div>
                                <div>
                                    <h3 className="mt-2 mb-1">Price per night</h3>
                                    <input type="number" 
                                    value={price}
                                    onChange={ev => setPrice(ev.target.value)}/>
                                </div>
                            </div>
                            <div>
                                <button className="primary my-4">Save</button>
                            </div>
                            
                        </form>
                    </div>
                )
            }
        </div>
    )
}