import { languages } from "../languages"
import { useState } from "react"
import clsx from "clsx"


export default function Header() {
const [currentWord, setCurrentWord] = useState("react")
const [guessedLetters, setGuessedLetters] = useState([])

const wrongGuessCount = 
guessedLetters.filter(letter => !currentWord.includes(letter)).length
const isGameWon = 
currentWord.split("").every(letter => guessedLetters.includes(letter))
const isGameLost = wrongGuessCount >= languages.length - 1
const isGameOver = isGameWon || isGameLost

const alphabet = "abcdefghijklmnopqrstuvwxyz"

function addGuessedLetter(letter) {
  setGuessedLetters(prevLetters =>
    prevLetters.includes(letter) ? prevLetters :
    [...prevLetters, letter])
}

  const languageElement = languages.map((lang, index) =>{
    const isLanguageLost = index < wrongGuessCount
      const style = {
        backgroundColor: lang.backgroundColor,
        color: lang.color,
      }
      const className = clsx("chip", isLanguageLost && "lost")
      return <span
       className={className} 
       style={style} 
        key={lang.name}
       >{lang.name}
       </span>
  })

  const letterElement = currentWord.split("").map((letter, index) => (
    <span key={index}>{guessedLetters.includes(letter) ? letter.toUpperCase() : ""}</span>
  ))
  
  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    })

    return (
      <button key={letter} onClick={() => 
        addGuessedLetter(letter)} className={className}>
        {letter.toUpperCase()}
      </button>
    )
  })  

  return (
    <main>
      <header>
        <h1>Assembly: EndGame</h1>
        <p>Guess the word within 8 attempts to keep the
          programming world safe from Assembly!</p>
      </header>
      <section className="game-status">
          <h2>You Win!</h2>
          <p>Well Done! 🎉 </p>
      </section>
      <section className="language-chips">
        {languageElement}
      </section>
      <section className="word">
        {letterElement}
      </section>
      <section className="keyboard">
        {keyboardElements}
      </section>

     {isGameOver && <button className="new-game">New Game</button>}
    </main>
  )
}