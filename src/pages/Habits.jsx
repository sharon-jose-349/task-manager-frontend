import { useState, useEffect } from "react"

function Habits() {
  const [habits, setHabits] = useState([])
  const [logs, setLogs] = useState([])
  const [name, setName] = useState("")
  const today = new Date().toISOString().split("T")[0]
  const [selectedDate, setSelectedDate] = useState(today)

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/habits")
      .then(res => res.json())
      .then(data => setHabits(data))
  }, [])

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/habitlogs/" + selectedDate)
      .then(res => res.json())
      .then(data => setLogs(data))
  }, [selectedDate])

  async function handleAddHabit() {
    if(name === "") return
    const response = await fetch(import.meta.env.VITE_API_URL + "/addhabit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    })
    const data = await response.json()
    setHabits([...habits, data.habit])
    setName("")
  }

  async function handleDeleteHabit(id) {
    await fetch(import.meta.env.VITE_API_URL + "/deletehabit/" + id, {
      method: "DELETE"
    })
    setHabits(habits.filter(habit => habit._id !== id))
    setLogs(logs.filter(log => log.habitId !== id))
  }

  async function handleToggle(habitId) {
    if(selectedDate !== today) return
    const response = await fetch(import.meta.env.VITE_API_URL + "/togglehabit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ habitId, date: selectedDate })
    })
    const data = await response.json()
    const existingLog = logs.find(log => log.habitId === habitId)
    if(existingLog) {
      setLogs(logs.map(log =>
        log.habitId === habitId ? { ...log, completed: data.log.completed } : log
      ))
    } else {
      setLogs([...logs, data.log])
    }
  }

  function isCompleted(habitId) {
    const log = logs.find(log => log.habitId === habitId)
    return log ? log.completed : false
  }

  return (
    <div className="app">
      <h1>My Habits</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Add a new habit"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn" onClick={handleAddHabit}>Add Habit</button>
      </div>

      <div style={{margin: "25px 0"}}>
        <input
          type="date"
          value={selectedDate}
          max={today}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        {selectedDate !== today && (
          <p style={{color: "#94a3b8", marginTop: "8px", fontSize: "14px"}}>
            Viewing past date — read only
          </p>
        )}
      </div>

      <div className="student-list">
        {habits.map(habit => (
          <div className="student-card" key={habit._id}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
              <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                <input
                  type="checkbox"
                  checked={isCompleted(habit._id)}
                  onChange={() => handleToggle(habit._id)}
                  disabled={selectedDate !== today}
                  style={{width: "20px", height: "20px", cursor: "pointer"}}
                />
                <span style={{
                  color: isCompleted(habit._id) ? "#94a3b8" : "white",
                  textDecoration: isCompleted(habit._id) ? "line-through" : "none",
                  fontSize: "16px"
                }}>
                  {habit.name}
                </span>
              </div>
              {selectedDate === today && (
                <button className="delete-btn" onClick={() => handleDeleteHabit(habit._id)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Habits