import { Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack'

function JapaneseQuiz() {
  const location = useLocation()
  const {characters} = location.state

  const randomHiragana = () => characters[Math.floor(Math.random() * characters.length)]

  const [selected, setSelected] = useState(randomHiragana())
  const [options, setOptions] = useState([])
  const [correctCount, setCorrect] = useState(0)
  const [totalCount, setTotal] = useState(0)
  const [previousAnswer, setPreviousAnswer] = useState(null)
  const [previousAnswerCorrect, setPreviousAnswerCorrect] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const wrongOptions = () =>
      characters
        .filter((hiragana) => hiragana !== selected)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)

    setOptions([selected, ...wrongOptions()].sort(() => Math.random() - 0.5))
  }, [selected])

  const checkAnswer = (option) => {
    setPreviousAnswerCorrect(false)
    if (option === selected) {
      setCorrect(correctCount + 1)
      setPreviousAnswerCorrect(true)
    }
    setTotal(totalCount + 1)
    setPreviousAnswer(selected)
    setSelected(randomHiragana())
  }

  return (
    <div>
      <p
        style={{
          fontSize: 45,
          position: 'absolute',
          top: 0,
          right: 8,
          textAlign: 'right'
        }}
      >
        {correctCount}/{totalCount}
      </p>


      <Button variant="contained" onClick={() => navigate('/')} style={
        {
          top: 8,
          left: 8,
        }
      }>
          Back
      </Button>

      {
        previousAnswer && (
          <p
            style={{
              fontSize: 30,
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center'
            }}
          >
            {previousAnswer.character} ({previousAnswer.romaji}) was {previousAnswerCorrect ? 'correct' : 'incorrect'}
          </p>
        )
      }

      <p
        style={{
          fontSize: 60,
          position: 'absolute',
          top: '30%',
          left: '50%', 
          transform: 'translateX(-50%)',
          textAlign: 'center'
        }}
      >
        {selected.character}
      </p>

      <Stack spacing={2} direction="row" style={{
          fontSize: 60,
          position: 'absolute',
          top: '50%',
          left: '50%', 
          transform: 'translateX(-50%)',
          textAlign: 'center'
        }}>
        {options.map((option) => (
          <Button variant="contained" onClick={() => checkAnswer(option)}>
            {option.romaji}
          </Button>
        ))}
      </Stack>
    </div>
  )
}

export default JapaneseQuiz
