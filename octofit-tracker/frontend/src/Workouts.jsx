import { useEffect, useState } from 'react'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    fetch('/api/workouts')
      .then((r) => r.json())
      .then(setWorkouts)
      .catch(() => setWorkouts([]))
  }, [])

  async function add(e) {
    e.preventDefault()
    if (!title) return
    const res = await fetch('/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, duration: 30, calories: 200 })
    })
    const data = await res.json()
    setWorkouts((s) => [data, ...s])
    setTitle('')
  }

  return (
    <section>
      <h2>Workouts (example)</h2>
      <form onSubmit={add}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Workout title" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {workouts.map((w) => (
          <li key={w._id}>{w.title} — {w.duration} min — {w.calories} kcal</li>
        ))}
      </ul>
    </section>
  )
}
