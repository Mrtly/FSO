import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const Anecdote = ({ anecdote }) => <p>{anecdote}</p>;
const Votes = ({ votes }) => <p>has {votes} votes</p>;

const App = (props) => {
  const [selected, setSelected] = useState(0)
  //array with the length of the anecdotes array filled with 0s
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const randomAnecdote = () => {
    let randomNumber = Math.floor(Math.random() * Math.floor(anecdotes.length));
    setSelected(randomNumber);
  };

  const voteForAnecdote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const highestVotes = Math.max(...votes);
  const mostVoted = () => {
    const indexOfMaxValue = votes.indexOf(highestVotes);
    return indexOfMaxValue;
  };

  return (
    <div>
      <Header text="anecdotes" />
      <Anecdote anecdote={anecdotes[selected]} />
      <Votes votes={votes[selected]} />
      <Button onClick={voteForAnecdote} text="vote" />
      <Button onClick={randomAnecdote} text="another" />
      <Header text="winner" />
      <Anecdote anecdote={anecdotes[mostVoted()]} />
      <Votes votes={highestVotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)