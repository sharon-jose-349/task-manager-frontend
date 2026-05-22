import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Habits from './pages/Habits'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/habits">Habits</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/tasks' element={<Tasks/>}/>
        <Route path='/habits' element={<Habits/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App