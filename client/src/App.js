import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ExerciseList from './components/ExerciseList';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';

const router = createBrowserRouter([
  {
      path : '/',
      element : <ExerciseList />
  },
  {
    path : '/createuser',
    element : <CreateUser></CreateUser>
  },
  {
    path : '/createexercise',
    element : <CreateExercise></CreateExercise>
  },
])

function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default App;
