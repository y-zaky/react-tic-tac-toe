import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Time extends React.Component {

  constructor(props){
    super(props) // super calls the consturctor of the parent object/ the super object/thing it extends react.component.
    this.state = {
      date: Date.now()
    }
    // this.setDate = this.setDate.bind(this)
  }

 setDate(){
    // const date = date.slice();
    const nowDate = Date.now()
   this.setState({date:nowDate})

//when a funciton ends it returns undefined by default
  }

    render() {
      return (
        <div>
          <h1 onClick={ () => this.setDate() } >The time you have been playing is: {this.state.date} </h1>
        </div>
      );
    }
  }
  
function Square (props) {
  return (
    <button className="square" onClick={props.onClick} >
      {props.value}
    </button>
  )
}

  class Board extends React.Component {

    renderSquare(i) {
      return <Square 
      value={this.props.squares[i]} 
      onClick={()=>this.props.onClick(i)}
      />;
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          location: []
        }],
        xIsNext: true,
        stepNumber:0
      }
    }

    jumpTo() {
      this.setState({
        stepNumber: arguments[0],
        xIsNext: (arguments[0] % 2) === 0,

      });
    }  

    handleClick(i) {
      debugger;
  const x = i%3;
  const y = (i-x)/3;
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
          location: [x,y]
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
console.log(current)
      const moves = history.map( (step,move) => {
        const desc = move ?
        'Go to move #' + move + step.location[0] + step.location[1]:
        'Go to game start';
      return (
      
        <li  key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
       
      );
      })
      

      // const coOrdinates = current.squares.map( (curr,index) => {

      //   // console.log(index)
      //   // const move = curr != null ?
      //   // "move is row"+{index}+", colum 1" :
      //   // "move is unknown"

      //   switch (curr) {
      //     case !null :
      //       console.log(index);
      //       break;
      //     default:
      //       console.log("everything is null");
      //   }
      //   return (
      //     <p> {move}</p>
      //   )
      // } )
      
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div>
        <div className="game">
          <div className="game-board">
            <Board 
            onClick = { (i) => this.handleClick(i) }
            squares = {current.squares}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            {/* <ol>{coOrdinates}</ol> */}
          </div>
        </div>
          <section className="gameTime">
             <Time />
          </section>
        </div>
      );
    }
  }


  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        
        console.log('sqa',squares[a])
        return squares[a];
      }
    }
    return null;
  }


  /// the bit below was to help me 

//   var car = {
//     distance: 0,
//     drive(){
//       this.distance = 10;
//     }
//   };

//   car.drive(); /// here method, BECAUSE its a funciton that belongs to an object 

//   var drive = car.drive; // here function , because it no longer belongs to an object. 
// //this sets window.drive to 10 OR undefined depending on v of javascript
//   drive();

// How do you know what the This variable is? Well, it all depends on the contect its being invoked in. If the contect is a method, then this refers to the object. If the context of invocation is a function .

//State, is a property being defined locally, biut props, is a property that is being passed from parent to child. You cannot define props. 

  