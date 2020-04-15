import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
      <h1>{props.name}</h1>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header name="Feedback" />

      No feedback yet
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)