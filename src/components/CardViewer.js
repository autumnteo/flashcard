import React from 'react';
import ReactCardFlip from 'react-card-flip';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
            index: 0,
            random: false,
            cards: this.props.cards,
            text: "Shuffle"
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState( prevState => ({
            isFlipped: !prevState.isFlipped 
        }));
    }

    render() {

        const index = this.state.index
        const cards = this.state.cards
        
        return (
            
            <div>
            <h2> Card Viewer </h2>
            <div className="info"> {this.state.isFlipped === false ? "Question for" : "Answer for"} Flash Card {this.props.cards.length !== 0 ? this.state.index + 1 : 0} of {this.props.cards.length} </div>
            <div className='cards' onClick={this.handleClick}>
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
                <CardDisplayFront
                    index={index}
                    cards={cards}
                />
                <div style={{color:"red"}}> 
                    <CardDisplayBack
                        index={index}
                        cards={cards}
                    />
                </div>
            </ReactCardFlip>
            </div>
            <div className="question">
                <button onClick={this.nextQuestion}> Next question </button>
            </div>
            <button className="randomize" onClick={this.randomize}> {this.state.text} the Flash Cards </button>
            <hr />
            <div className="viewer">
                <button onClick={this.props.switchMode}> Go to Editor </button>
            </div>
        </div>
        )
    }

    nextQuestion = () => {
        if (this.state.index + 1 === this.props.cards.length) {
            this.setState(state => ({
                index: 0
            }))
        } else {
            this.setState(state => ({
                index: state.index + 1
            }))
        }

    }

    randomize = () => {
        const array = [...this.props.cards]
        // if its already random, revert back to normal
        if (this.state.random) {
            this.setState(state => ({
                random: !state.random,
                cards: array,
                text: "Shuffle"
            }))
        } else {
            // else, shuffle it
            for (var i = array.length; i > 1; i--) {
                var r = Math.floor(Math.random() * i);
                var temp = array[r];
                array[r] = array[i - 1];
                array[i - 1] = temp;
            }
            this.setState(state => ({
                random: !state.random,
                cards: array,
                text: "Unshuffle"
            }))
        }
    }
}


function CardDisplayFront(props) {
    if (props.cards.length === 0) {
        return (
            <div>
                <h3> Please create a Flash Card to begin </h3>
            </div>
        )
    } else {
        return (
            <div key={props.index}>
                {props.cards[props.index].qns}
            </div>
        )
    }
}

function CardDisplayBack (props) {
    if (props.cards.length === 0) {
        return (
            <div>
                <h3> Please create a Flash Card to begin </h3>
            </div>
        )
    } else {
        return (
            <div key={props.index}>
                {props.cards[props.index].ans}
            </div>
        )
    }
}


export default CardViewer;