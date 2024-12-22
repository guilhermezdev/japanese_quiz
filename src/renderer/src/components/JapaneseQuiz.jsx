import { Button } from '@mui/material';
import { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack';

function JapaneseQuiz() {
  const hiragana = [
    'あ', 'い', 'う', 'え', 'お',  // A-row
    'か', 'き', 'く', 'け', 'こ',  // K-row
    'さ', 'し', 'す', 'せ', 'そ',  // S-row
    'た', 'ち', 'つ', 'て', 'と',  // T-row
    'な', 'に', 'ぬ', 'ね', 'の',  // N-row
    'は', 'ひ', 'ふ', 'へ', 'ほ',  // H-row
    'ま', 'み', 'む', 'め', 'も',  // M-row
    'や',       'ゆ',       'よ',  // Y-row
    'ら', 'り', 'る', 'れ', 'ろ',  // R-row
    'わ',                   'を',  // W-row
    'ん'                     // N
  ];

  const randomHiragana  = () => hiragana[Math.floor(Math.random() * hiragana.length)];

  const [selected, setSelected] = useState(randomHiragana());
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const wrongOptions = () =>
      hiragana
        .filter(hiragana => hiragana !== selected)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
  
    setOptions([selected, ...wrongOptions()].sort(() => Math.random() - 0.5));
  }, [selected]);

  const checkAnswer = (option) => {
    if (option === selected) {
  
    } else {
      console.log("Wrong answer");
    }

    setSelected(randomHiragana());
    setOptions([selected, ...wrongOptions(3)]);
  }

  return (
    <div>
      <p style={{fontSize:60}}>{selected}</p>
      <Stack spacing={2} direction="row">
        {options.map((option) => <Button variant="contained" onClick={() => checkAnswer(option)}>{option}</Button>)}
      </Stack>
    </div>
  )
}

export default JapaneseQuiz
