import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { hiraganaList, katakanaList } from './japanese_characters'
import { useState } from 'react'

function MainMenu() {
  const groupByCategory = (kanaList) => kanaList.reduce((acc, kana) => {
    if (!acc[kana.category]) {
      acc[kana.category] = []
    }
    acc[kana.category].push(kana)
    return acc
  }, {})

  const groupedHiragana = groupByCategory(hiraganaList)
  const groupedKatakana = groupByCategory(katakanaList)

  const [selected, setSelected] = useState([])

  const changeSelection = (value) => {
    if(selected.includes(value)){
      setSelected(selected.filter((item) => item !== value))
    }else{
        setSelected([...selected, value])
    }
  }


  return (
    <div style={{
        margin: '16px'
    }}>
      <Card>
        <Card.Title>Japanese Quiz</Card.Title>
        <Card.Body>Train your Hiragana and Katakana knowledge.</Card.Body>
      </Card>

      <br></br>

      <Card style={{ width: '20rem' }}>
        <Card.Header>
          <Card.Title>Hiragana - ひらがな</Card.Title>
        </Card.Header>
        <ListGroup variant="flush">
          {Object.keys(groupedHiragana).map((group) => (
            <ListGroup.Item  action key={group[0].category} onClick={() => changeSelection('hiragana-' + group)} active={selected.includes('hiragana-' + group)}>
              {group} -{' '}
              {groupedHiragana[group]
                .slice(0, 5)
                .map((kana) => kana.character)
                .join(' ')}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  )
}

export default MainMenu
