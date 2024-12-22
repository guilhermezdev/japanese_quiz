import { useState } from 'react'

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
  const [text, setText] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Optionally clear the input
      setText("");
    }
  };


  return (
    <div>
      <p style={{fontSize:60}}>{selected}</p>
      <input type="text"  value={text} onKeyDown={handleKeyDown} onChange={(e) => setText(e.target.value)}></input>
    </div>
  )
}

export default JapaneseQuiz
