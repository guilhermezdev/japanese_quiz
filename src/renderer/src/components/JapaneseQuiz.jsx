import { Button } from '@mui/material'
import { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import { hiraganaList } from './japanese_characters'

function JapaneseQuiz() {
  const randomHiragana = () => hiraganaList[Math.floor(Math.random() * hiraganaList.length)]

  const [selected, setSelected] = useState(randomHiragana())
  const [options, setOptions] = useState([])
  const [correctCount, setCorrect] = useState(0)
  const [totalCount, setTotal] = useState(0)
  const [previousAnswer, setPreviousAnswer] = useState(null)
  const [previousAnswerCorrect, setPreviousAnswerCorrect] = useState(null)

  useEffect(() => {
    const wrongOptions = () =>
      hiraganaList
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
      {
        previousAnswer && (
          <p
            style={{
              fontSize: 30,
              position: 'absolute',
              top: 0,
              left: 8
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
          top: '25%',
          left: '50%', 
          transform: 'translateX(-50%)',
          textAlign: 'center'
        }}
      >
        {selected.character}
      </p>

      <Stack spacing={2} direction="row" >
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
