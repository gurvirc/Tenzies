import Die from "./assets/Die"
import React from "react"
import { nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App(){
  const [dice, SetDice]=React.useState(generateRandomDice)

  const gameWon=dice.every(die=>die.isHeld && die.value===dice[0].value)

  const buttonRef= React.useRef(null)

  React.useEffect(()=>{
    if(gameWon){
      buttonRef.current.focus()
    }
  }, [gameWon])

  function generateRandomDice(){
    return(
      new Array(10).fill(0).
      map(()=> ({
        value: Math.ceil(Math.random() * 6),
        isHeld:false,
        id: nanoid()
      }))
    )
  }

  function hold(id){
    SetDice(oldDice=>oldDice.map(
      die=>die.id==id? 
      {...die, isHeld:!die.isHeld}: 
      die))
  }

  function rollDice(){
    if(gameWon){
      SetDice(generateRandomDice)
    }
    SetDice(oldDice=> oldDice.map(die=> die.isHeld? die: {...die, value:Math.ceil(Math.random() * 6)}))
  }

  const diceElements= dice.map(die=>(<Die value={die.value} id={die.id} hold={hold} isHeld={die.isHeld}/>))
  return(
    
    <main>
      {gameWon && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze <br/>it at its current value between rolls.</p>
      <div className= "dice-container">
        {diceElements}
      </div>
      <button ref={buttonRef}className="roll-dice-container" onClick={rollDice}>
        {gameWon? "New Game" : "Roll"}</button>
    </main>
  )
}
