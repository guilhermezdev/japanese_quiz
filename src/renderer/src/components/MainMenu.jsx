import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { hiraganaList } from './japanese_characters'
function MainMenu() {
  const groupedKana = hiraganaList.reduce((acc, kana) => {
    if (!acc[kana.category]) {
      acc[kana.category] = []
    }
    acc[kana.category].push(kana)
    return acc
  }, {})

  return (
    <div>
      <Card>
        <Card.Title>Japanese Quiz</Card.Title>
        <Card.Body>Train your Hiragana and Katakana knowledge.</Card.Body>
      </Card>

      <Card style={{ width: '20rem' }}>
        <Card.Header>
          <Card.Title>Hiragana - ひらがな</Card.Title>
        </Card.Header>
        <ListGroup variant="flush">
          {Object.keys(groupedKana).map((group) => (
            <ListGroup.Item action key={group[0].category}>
              {group} -{' '}
              {groupedKana[group]
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
