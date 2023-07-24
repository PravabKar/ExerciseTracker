import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import EditExercise from './EditExercise';


const ExerciseList = () => {

  const [exerciseList, setExerciseList] = useState([]);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/')
    .then((res) => {
      setExerciseList(res.data);
      setLoading(false);
    })
    .catch((err) => console.error(err));
  }, [render]);

  const handleDelete = (id) => {
    axios.delete('http://localhost:5000/exercises/'+id)
    .then((response) => setRender(!render))
    .catch((err) => console.error(err));
  }

  const handleEdit = (item) => {
    setEdit(true);
    setEditItem(item);
  }

  return (
    <div>
      {
        (edit) ? <EditExercise exercise={editItem} close={setEdit} /> :
        <div>
          <Navbar />
          <h3 style={{marginLeft: "10%", marginTop: "5%"}}>Exercise List</h3>
          <div className='table-responsive' style={{margin: "10%", marginTop: "1%"}}>
            {
              (loading) ? <div>Loading...</div> :
              <table className='table table-bordered border-black'>
                <thead className='table-info'>
                  <tr>
                    <th>Description</th>
                    <th>Duration (in minutes)</th>
                    <th>Username</th>
                    <th>Date</th>
                    <th className='d-flex justify-content-center'>Action</th>
                  </tr>
                </thead>
                <tbody className='table-light'>
                  {
                    exerciseList.map( (item, index) => (
                      <tr>
                        <td>{item.description}</td>
                        <td>{item.duration}</td>
                        <td>{item.username}</td>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td className='d-flex justify-content-center'>
                          <button className='btn btn-dark btn-sm' style={{marginRight: "1rem"}} onClick={() => handleEdit(item)}>Edit</button>
                          <button className='btn  btn-danger' onClick={() => handleDelete(item._id)}> Delete </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default ExerciseList