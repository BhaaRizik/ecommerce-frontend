import { useEffect, useState } from 'react'
import './App.css'

const API_BASE_URL = 'https://ecommerce-backend-nnlb.onrender.com'

type Status = 'loading' | 'success' | 'error'

function App() {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/greeting`)
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data: { message: string }) => {
        setMessage(data.message)
        setStatus('success')
      })
      .catch(() => {
        setMessage('Could not reach the backend.')
        setStatus('error')
      })
  }, [])

  return (
    <div className="page">
      <div className="card">
        <span className="badge">Backend Response</span>
        <div className={`message-box ${status}`}>
          {status === 'loading' ? (
            <span className="dots">
              <span /><span /><span />
            </span>
          ) : (
            <p className="message">{message}</p>
          )}
        </div>
        <p className="endpoint">GET {API_BASE_URL}/api/greeting</p>
      </div>
    </div>
  )
}

export default App
