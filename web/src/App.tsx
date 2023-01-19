import "./styles/global.css"

import { Habit } from './components/Habit'

function App() {
  return (
    <div>
      <h1>hello</h1>
      <Habit completed={5}/>
      <Habit completed={15}/>
    </div>
  )
}

export default App
