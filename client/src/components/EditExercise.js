import React, { useEffect, useState } from 'react'
import SelectInput from './SelectInput';
import axios from 'axios';


const EditExercise = (prop) => {
  
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
      })
      .catch(error => {
        console.error('Error fetching data:', error);
    });

    // console.log(prop);

    axios.get('http://localhost:5000/exercises/'+ prop.exercise._id)
    .then((res) => {
      setUsername(res.data.username);
      setDescription(res.data.description);
      setDuration(res.data.duration);
      setDate(new Date(res.data.date).toISOString().slice(0, 10));
    })
    .catch((err) => console.error(err));
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
        
        axios.post('http://localhost:5000/exercises/update/' + prop.exercise._id, ExerciseList)
        .then(res => {
          console.log(res.data);
          window.location = '/';
          });
    }


  return (
    <div>
        <div className="col d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
          <div className="card card-primary  col-4  col d-flex justify-content-center">
            <div className="card-header card bg-primary ">
              <h3 className="card-title text-white" >Edit Exercise : {prop.exercise.description} </h3>
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
                <SelectInput options={options} onSelect={handleSelect} username={prop.exercise.username} />
              </div>
              <div className='d-flex justify-content-center' style={{marginTop: "10px", marginBottom: "10px"}}>
                <input type="submit" className='btn btn-success'/>
                <button className='btn btn-danger' style={{marginLeft: "1rem"}}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default EditExercise