import { useState, useEffect } from "react"

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])

  async function handleAdd() {
    if(title === "") return
    const response = await fetch(import.meta.env.VITE_API_URL + "/addtask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    })
    const data = await response.json()
    setTasks([...tasks, data.task])
    setTitle("")
  }

  async function handleComplete(id) {
    await fetch(import.meta.env.VITE_API_URL + "/completetask/" + id, {
      method: "PUT"
    })
    setTasks(tasks.map(task =>
      task._id === id ? { ...task, completed: true } : task
    ))
  }

  async function handleDelete(id) {
    await fetch(import.meta.env.VITE_API_URL + "/deletetask/" + id, {
      method: "DELETE"
    })
    setTasks(tasks.filter(task => task._id !== id))
  }

  const pendingTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  return (
    <div className="app">
      <h1>My Tasks</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Add a new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn" onClick={handleAdd}>Add Task</button>
      </div>

      <h2 style={{color: "white", margin: "25px 0 15px"}}>Pending</h2>
      <div className="student-list">
        {pendingTasks.map(task => (
          <div className="student-card" key={task._id}>
            <p>{task.title}</p>
            <div style={{display: "flex", gap: "10px"}}>
              <button className="btn" style={{height: "40px", fontSize: "14px"}} onClick={() => handleComplete(task._id)}>Complete</button>
              <button className="delete-btn" onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{color: "white", margin: "25px 0 15px"}}>Completed</h2>
      <div className="student-list">
        {completedTasks.map(task => (
          <div className="student-card" key={task._id}>
            <p style={{textDecoration: "line-through", color: "#94a3b8"}}>{task.title}</p>
            <button className="delete-btn" onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tasks