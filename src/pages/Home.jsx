import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="app">
        <h1>Task Manager</h1>
        <div className="home-container">
          <button className="btn" onClick={() => navigate("/tasks")}>My Tasks</button>
          <button className="btn" onClick={() => navigate("/habits")}>My Habits</button>
        </div>
      </div>
    </div>
  )
}

export default Home