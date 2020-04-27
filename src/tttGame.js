import React from "react";
import axios from "axios";

class TttGame extends React.Component {
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
    };
  }

  loadSquare(x, y) {
    if (typeof this.state.board != "undefined") {
      return this.state.board[x][y];
    } else {
      this.loadSquare(x, y);
    }
  }

  postMove(x, y) {
    axios.post("/move", {
      collum: y,
      row: x,
    });
    this.recieve();
  }

  checkTurn() {
    axios
      .get("/turn")
      .then((res) =>
        this.setState({
          turn: res.data,
        })
      )
      .catch((err) => console.log(err));
  }

  recieve(res) {
    axios
      .get("/board")
      .then((res) => this.getBoard(res))
      .catch((err) => console.error(err));
  }

  getBoard(res) {
    this.setState({
      board: res.data,
    });
    this.checkTurn();
  }

  drawBoard(props) {
    return <h1>hellow, {props.name}</h1>;
  }

  resetBoard() {
    axios
      .get("/reset")
      .then((res) => this.recieve())
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="gameBoard">
        <input type="text" name="post" />
        <button id="btn" onClick={() => this.recieve()}>
          test board
        </button>
        <button id="btnPost" onClick={() => this.postBoard()}>
          post board
        </button>
        <h1>{this.state.board}</h1>
        <h2>{this.state.turn}</h2>

        <div>
          <button id="9" onClick={() => this.resetBoard()}>
            reset
          </button>
        </div>

        <div class="board">
          <div class="top_row">
            <button id="0" onClick={() => this.postMove(0, 0)}>
              {this.state.board[0][0]}
            </button>
            <button id="1" onClick={() => this.postMove(0, 1)}>
              {this.state.board[0][1]}
            </button>
            <button id="2" onClick={() => this.postMove(0, 2)}>
              {this.state.board[0][2]}
            </button>
          </div>
          <div class="mid_row">
            <button id="3" onClick={() => this.postMove(1, 0)}>
              {this.state.board[1][0]}
            </button>
            <button id="4" onClick={() => this.postMove(1, 1)}>
              {this.state.board[1][1]}
            </button>
            <button id="5" onClick={() => this.postMove(1, 2)}>
              {this.state.board[1][2]}
            </button>
          </div>
          <div class="bot_row">
            <button id="6" onClick={() => this.postMove(2, 0)}>
              {this.state.board[2][0]}
            </button>
            <button id="7" onClick={() => this.postMove(2, 1)}>
              {this.state.board[2][1]}
            </button>
            <button id="8" onClick={() => this.postMove(2, 2)}>
              {this.state.board[2][2]}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TttGame;
