import React, { useState } from 'react'
import axios from 'axios';
import Navbar from './Navbar';

const Createuser = () => {

    const [username, setUsername] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
          username: username
        }

        axios.post('http://localhost:5000/users/add', user)
          .then(res => window.location = '/')
          .catch(err => console.log(err));


    }


  return (
    <div>
      <Navbar />
        <div className="col d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
            <div className="card card-primary  col-4  col d-flex justify-content-center">
              <div className="card-header card bg-primary ">
                <h3 className="card-title text-white" >Create New User</h3>
              </div>
        <form onSubmit={handleSubmit}>
          <div className='card-body'>
            <label>Enter Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className='form-control'/>
          </div>
          <div className='d-flex justify-content-center'>
            <input type="submit" className='btn btn-primary' style={{margin: "15px"}}/>
          </div>
        </form>
        </div>
        </div>
    </div>
  )
}

export default Createuser