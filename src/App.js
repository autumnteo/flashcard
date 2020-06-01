import React from 'react';
import './App.css';
import CardEditor from './components/CardEditor';
import CardViewer from './components/CardViewer';

// cards should be in app bcos both cardeditor and cardviewer need to access it
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editor: true,
      cards: []
    }
  }

  render() {
    if (this.state.editor) {
      // have a prop called switchMode and pass the switchMode function (this.switchMode) to it
      return (
        <CardEditor
          cards={this.state.cards}
          switchMode={this.switchMode}
          addCard={this.addCard}
          deleteCard={this.deleteCard}
        />
      )
    } else {
      return (
        <CardViewer
          cards={this.state.cards}
          switchMode={this.switchMode}
        />
      )
    }

  }

  switchMode = () => {
    this.setState(state => ({
      editor: !state.editor
    }))
  }

  addCard = (qns, ans) => {
    this.setState(state => ({
      cards: [...state.cards, { 'qns': qns, 'ans': ans }]
    }))
  }

  deleteCard = (index) => {
    this.setState(state => {
      const cards = [...state.cards];
      cards.splice(index, 1);
      return {
        cards: cards
      }
    })
  }

}

export default App;
