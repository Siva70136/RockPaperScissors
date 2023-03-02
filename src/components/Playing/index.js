import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import Item from '../Item'

import './index.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class Playing extends Component {
  state = {score: 0, result: false, you: '', opp: '', status: ''}

  renderHeader = () => {
    const {score} = this.state
    return (
      <div className="header-container">
        <div className="data-container">
          <h1 className="item">Rock Paper Scissors</h1>
        </div>
        <div className="score-container">
          <p className="score-name">Score</p>
          <p className="score">{score}</p>
        </div>
      </div>
    )
  }

  onGame = id => {
    const number = Math.floor(Math.random() * choicesList.length)
    const youData = choicesList.filter(each => each.id === id)
    console.log(youData)
    let statusInfo = ''
    console.log(number, id)

    if (number === 0) {
      if (id === 'ROCK') statusInfo = 'IT IS DRAW'
      else if (id === 'SCISSORS') statusInfo = 'YOU LOSE'
      else statusInfo = 'YOU WON'
    } else if (number === 1) {
      if (id === 'ROCK') statusInfo = 'YOU WON'
      else if (id === 'SCISSORS') statusInfo = 'IT IS DRAW'
      else statusInfo = 'YOU LOSE'
    } else if (number === 2) {
      if (id === 'ROCK') {
        statusInfo = 'YOU LOSE'
      } else if (id === 'SCISSORS') {
        statusInfo = 'YOU WON'
      } else {
        statusInfo = 'IT IS DRAW'
      }
    }
    console.log(statusInfo, number)

    this.setState(prevState => ({
      result: !prevState.result,
      you: youData[0].imageUrl,
      opp: choicesList[number].imageUrl,
      status: statusInfo,
    }))
  }

  renderPlay = () => (
    <ul className="play-container">
      {choicesList.map(each => (
        <Item details={each} key={each.id} onGame={this.onGame} />
      ))}
    </ul>
  )

  onResult = () => {
    const {status} = this.state
    if (status === 'IT IS DRAW') {
      this.setState(prevState => ({
        result: !prevState.result,
      }))
    } else if (status === 'YOU LOSE') {
      this.setState(prevState => ({
        result: !prevState.result,
        score: prevState.score - 1,
      }))
    } else {
      this.setState(prevState => ({
        result: !prevState.result,
        score: prevState.score + 1,
      }))
    }
  }

  renderResult = () => {
    const {you, opp, status} = this.state

    console.log(opp, you)

    return (
      <div className="result-container">
        <div className="image-container">
          <div>
            <h1>YOU</h1>
            <img src={you} className="img" alt="your choice" />
          </div>
          <div>
            <h1>OPPONENT</h1>
            <img src={opp} className="img" alt="opponent choice" />
          </div>
        </div>
        <p>{status}</p>
        <div>
          <button
            type="button"
            onClick={this.onResult}
            className="play-again-button"
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {result} = this.state

    return (
      <div className="app-container">
        <div className="playing-container">
          {this.renderHeader()}
          {result ? this.renderResult() : this.renderPlay()}
        </div>

        <Popup
          modal
          trigger={
            <button type="button" className="trigger-button">
              Rules
            </button>
          }
        >
          {close => (
            <div className="popup-container">
              <button
                type="button"
                onClick={() => close()}
                className="close-button"
              >
                <RiCloseLine className="close-icon" />
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
                className="rules-img"
              />
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default Playing
