import React, { useEffect, useState } from 'react'
import SelectInput from './SelectInput';
import axios from 'axios';
import Navbar from './Navbar';


const Createexercise = () => {
  
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [options, setOptions] = useState([]);
    
    
  useEffect(() => {
    const arr = [];
    axios.get('http://localhost:5000/users/')
      .then(response => {
        // Assuming the response data is an array of options
        for(let i = 0; i < response.data.length; i++) {
          let username = response.data[i].username;
          arr.push(username);
        }
        setOptions(arr);
        setUsername(response.data[0].username);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  
    const handleSelect = (event) => {
        setUsername(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const ExerciseList = {
            username, description, duration, date
        }
        console.log(ExerciseList);
        
        axios.post('http://localhost:5000/exercises/add', ExerciseList)
        .then(res => {
          console.log(res.data);
          window.location = '/';
          })
        .catch(error => console.log(error));
    }


  return (
    <div>
        <Navbar />
        <div className="col d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
          <div className="card card-primary  col-4  col d-flex justify-content-center">
            <div className="card-header card bg-primary ">
              <h3 className="card-title text-white" >Create Exercise</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <label>Description</label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder='description' className='form-control'/> 
              </div>
              <div className="card-body">
                <label>Duration (in minutes)</label>
                <input type="number" value={duration} onChange={e => setDuration(e.target.value)} placeholder='duration' className='form-control'/> 
              </div>
              <div className="card-body">
                <label>Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className='form-control'/> 
              </div>
              <div className="card-body">
                <label>User</label>
                <SelectInput options={options} onSelect={handleSelect} />
              </div>
              <div className='d-flex justify-content-center' style={{marginTop: "10px", marginBottom: "10px"}}>
                <input type="submit" className='btn btn-primary'/>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Createexercise