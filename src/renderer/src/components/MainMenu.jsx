import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { hiraganaList, katakanaList } from './japanese_characters'
import { use, useState } from 'react'
import Grid from '@mui/material/Grid2'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function MainMenu() {
  const navigate = useNavigate()

  const groupByCategory = (kanaList) =>
    kanaList.reduce((acc, kana) => {
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
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value))
    } else {
      setSelected([...selected, value])
    }
  }

  const selectedGroups = () =>{
    const selectedHiragana = selected.filter((item) => item.includes('hiragana')).map((item) => item.split('-')[1])

    const selectedKatakana = selected.filter((item) => item.includes('katakana')).map((item) => item.split('-')[1])

    return [
      ...hiraganaList.filter((character) => selectedHiragana.includes(character.category)),
      ...katakanaList.filter((character) => selectedKatakana.includes(character.category)),
    ]
  }

  return (
    <div
      style={{
        margin: '16px'
      }}
    >
      <Card
        style={{
          padding: '16px'
        }}
      >
        <Card.Title>Japanese Quiz</Card.Title>
        <Card.Body>Train your Hiragana and Katakana knowledge.</Card.Body>
      </Card>

      <br></br>

      <Grid container spacing={4}>
        <MenuOptions
          title={'Hiragana - ひらがな'}
          groupedCharacters={groupedHiragana}
          type={'hiragana'}
          selected={selected}
          changeSelection={changeSelection}
        />

        <MenuOptions
          title={'Katakana - カタカナ'}
          groupedCharacters={groupedKatakana}
          type={'katakana'}
          selected={selected}
          changeSelection={changeSelection}
        />
      </Grid>


      <br></br>

      <Button disabled={selectedGroups().length === 0}  onClick={() => {
        navigate("/quiz", { state: { characters: selectedGroups() } })
      }} >Abacate</Button>
    </div>
  )
}

function MenuOptions({ title, groupedCharacters, type, selected, changeSelection }) {
  return (
    <Card style={{ width: '20rem' }}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <ListGroup variant="flush">
        {Object.keys(groupedCharacters).map((group) => {
          const key = type + '-' + group
          return (
            <ListGroup.Item
              action
              key={key}
              onClick={() => changeSelection(key)}
              active={selected.includes(key)}
            >
              {group} -{' '}
              {groupedCharacters[group]
                .slice(0, 5)
                .map((kana) => kana.character)
                .join(' ')}
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </Card>
  )
}

export default MainMenu
