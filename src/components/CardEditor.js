import React from 'react';

// switchmode function is inside the App class so must props
class CardEditor extends React.Component {

    // need keep track of what is written to the front and back of the card
    constructor(props) {
        super(props)
        this.state = {
            qns: "",
            ans: ""
        }
    }

    render() {
        // cards are in the props, not state
        const rows = this.props.cards.map((card, i) => {
            return (
                <tr key={i}>
                    <td> {card.qns} </td>
                    <td> {card.ans} </td>
                    <td> <button data-index={i} onClick={this.deleteCard}> Delete </button> </td>
                </tr>
            )
        });
        return (
            <div>
                <h2> Card Editor </h2>
                <table className="table1">
                    <thead>
                        <tr>
                            <th> Question </th>
                            <th> Answer </th>
                            <th> Delete? </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <br />
                <table className="inputs">
                    <thead>
                    <tr>
                        <td> <input className="qnsInput" name="qns" placeholder='Question' onChange={this.handleChange} value={this.state.qns} /> </td>
                        <td rowSpan="2" > <button className="addBtn" onClick={this.addCard}> Add Card </button> </td>
                    </tr>
                    <tr>
                        <td> <input className="ansInput" name="ans" placeholder='Answer' onChange={this.handleChange} value={this.state.ans} /> </td>
                    </tr>
                    </thead>
                </table>
                <hr />
                <div className="viewer">
                    <button onClick={this.props.switchMode}> Go to Viewer </button>
                </div>
            </div>
        );
    }

    // use event.target.name bcos both front and back use the same function so cannot hardcode 'front' or 'back'.
    // this way dont need to create a handleFrontChange and handleBackChange function
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value

        })
    };

    // need this function to call the addCard function passed in via props from app
    addCard = () => {
        this.props.addCard(this.state.qns, this.state.ans);
        this.setState({
            qns: "",
            ans: ""
        })
    }

    // event = click, target = button that user clicked on
    deleteCard = (event) => {
        this.props.deleteCard(event.target.dataset.index)
    }
}

export default CardEditor;