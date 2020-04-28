import React from "react";
import axios from "axios";
import TttSquare from "./tttSquare";

class TttBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      turn: "",
      player: "",
      lastPlayer: "",
      connected: false,
      winner: false,
      tie: false,
    };
    this.getBoard = this.getBoard.bind(this);
    this.reset = this.reset.bind(this);
    this.postMove = this.postMove.bind(this);
    this.printBoard = this.printBoard.bind(this);
    this.getTurn = this.getTurn.bind(this);
    this.toolBarRender = this.toolBarRender.bind(this);
    this.getTie = this.getTie.bind(this);
    this.getWinner = this.getWinner.bind(this);
  }
  postMove(row, collum) {
    if (this.state.winner) {
    } else {
      axios
        .post("/move", {
          collum: collum,
          row: row,
        })
        .then(this.getBoard)
        .then(this.getWinner)
        .then(this.winCheck)
        .catch((err) => console.log(err));
    }
  }
  winCheck() {
    if (!this.getWinner) {
      this.getTie();
    }
  }

  getTie() {
    console.log("in");
    axios
      .get("/isFilled")
      .then((res) =>
        this.setState({
          tie: res.data,
        })
      )
      .catch((err) => console.log(err));
  }

  getBoard() {
    axios
      .get(
        "https://tttproto2-env.eba-7pm2wcta.us-east-2.elasticbeanstalk.com/api/v1/test"
      )
      .then((res) =>
        this.setState({
          board: res.data,
          connected: true,
        })
      )
      .then(this.getTurn)
      .catch((err) => console.log(err));
  }
  getTurn() {
    axios
      .get("/turn")
      .then((res) =>
        this.setState({
          lastPlayer: this.state.turn,
          turn: res.data,
        })
      )
      .catch((err) => console.log(err));
  }
  getWinner() {
    axios
      .get("/winner")
      .then((res) =>
        this.setState({
          winner: res.data,
        })
      )
      .catch((err) => console.log(err));
  }
  reset() {
    this.setState({
      tie: false,
      winner: false,
      turn: "x",
    });
    axios
      .get("/reset")
      .then(this.getBoard)
      .catch((err) => console.log(err));
  }

  printBoard() {
    if (this.state.connected) {
      return (
        <div className="game">
          <div className="toolBar">
            <this.toolBarRender />
          </div>
          <div className="gameBoard">
            <div>
              <button className="square" onClick={() => this.postMove(0, 0)}>
                {this.state.board[0][0]}
              </button>
              <button className="square" onClick={() => this.postMove(0, 1)}>
                {this.state.board[0][1]}
              </button>
              <button className="square" onClick={() => this.postMove(0, 2)}>
                {this.state.board[0][2]}
              </button>
            </div>
            <div>
              <button className="square" onClick={() => this.postMove(1, 0)}>
                {this.state.board[1][0]}
              </button>
              <button className="square" onClick={() => this.postMove(1, 1)}>
                {this.state.board[1][1]}
              </button>
              <button className="square" onClick={() => this.postMove(1, 2)}>
                {this.state.board[1][2]}
              </button>
            </div>
            <div>
              <button className="square" onClick={() => this.postMove(2, 0)}>
                {this.state.board[2][0]}
              </button>
              <button className="square" onClick={() => this.postMove(2, 1)}>
                {this.state.board[2][1]}
              </button>
              <button className="square" onClick={() => this.postMove(2, 2)}>
                {this.state.board[2][2]}
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>please Connect to the server</h1>;
    }
  }

  toolBarRender() {
    if (this.state.winner) {
      return <h1>{this.state.lastPlayer} is The winner</h1>;
    }
    if (this.state.tie) {
      return <h1>its a tie, reset?</h1>;
    } else {
      return <h1>It is Player: {this.state.turn} turn</h1>;
    }
  }
  render() {
    return (
      <div>
        <button onClick={this.getBoard}>Connect</button>
        <button onClick={this.reset}>Reset</button>
        <h1>{this.state.board}</h1>

        <this.printBoard />
      </div>
    );
  }
}

export default TttBoard;
