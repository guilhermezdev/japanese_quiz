import JapaneseQuiz from './components/JapaneseQuiz'
import MainMenu from './components/MainMenu'
import { HashRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" exact element={<MainMenu />} />
        <Route path="/quiz" element={<JapaneseQuiz />} />
      </Routes>
    </HashRouter>
  )
}

export default App
