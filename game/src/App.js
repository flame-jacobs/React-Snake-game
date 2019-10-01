import React, { Component } from 'react';
import './App.css';
import Snake from "./components/Snake"
import Food from "./components/Food"

// randomize the coordinates for the food so it jumps around when eaten
const getRandomCo = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return[x, y]
}

// the initial state that all the components are when the game started
const FirstS = {
  food: getRandomCo(),
    speed: 50,
    direction: 'RIGHT',
    snakeDots:[
    [0,0],
    [2,0]
    ]
}

class App extends Component {
  state = FirstS;

  componentDidMount(){
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }
// components update everytime food is eaten
  componentDidUpdate(){
    this.border();
    this.checkIfColla();
    this.eat();
  }
// the controls for the snake 
  onKeyDown = (e) => {
    e = e || window.event;
    switch(e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
          break;
      case 37:
        this.setState({direction: 'LEFT'});
          break;
      case 39:
        this.setState({direction: 'RIGHT'});
          break;
    }
  }
// the snake moves
  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length-1];
// the way it moves as the head of the snake is added and the tail is deleted
    switch(this.state.direction){
      case 'RIGHT':
        head = [head[0] + 2, head[1]]
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]]
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2]
        break;
      case 'UP':
        head = [head[0], head[1] - 2]
        break;
    }
    // pushes the head to increase
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }
// the border for the game
  border(){
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
      this.GameOver();
    }
  }

  checkIfColla(){
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]){
        this.GameOver();
      }
    })
  }
// as the snake eats the food it increase in size and the game updates
  eat(){
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]){
      this.setState({
        food : getRandomCo()
      })
      this.increaseB();
      this.SpeedIN();
    }
  }

  // the body is increased 
  increaseB(){
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }
// thhe speed incresases everytime the snake eats the food
  SpeedIN(){
    if (this.state.speed > 10){
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }
// game over screen is shown when the snake eats itself and when moved against the border
GameOver(){
  alert(`Shame you died . Your Score was ${this.state.snakeDots.length} . Better luck next time`)
  this.setState(FirstS)
}

  render(){
  return (
    <div className="App">
        <h1>Snake Game</h1>
        <h3>Score: {this.state.snakeDots.length} </h3>
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots}/>
        <Food dot={this.state.food}/>

      </div>

    </div>
  );
}
}

export default App;
