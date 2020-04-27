import React from "react";
import Square from "./square";

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = "Next player: X";

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare("-")}
          {this.renderSquare("-")}
          {this.renderSquare("-")}
        </div>
        <div className="board-row">
          {this.renderSquare("-")}
          {this.renderSquare("-")}
          {this.renderSquare("-")}
        </div>
        <div className="board-row">
          {this.renderSquare("-")}
          {this.renderSquare("-")}
          {this.renderSquare("-")}
        </div>
      </div>
    );
  }
}

export default Board;
