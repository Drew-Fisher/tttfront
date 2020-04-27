import React from "react";
import axios from "axios";

class TttSquare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: props.row,
      collum: props.collum,
      value: props.value,
      gamdID: props.gamdID,
      gameState: props.gameState,
    };
    this.postMove = this.postMove.bind(this);
  }

  postMove() {
    axios
      .post("/move", {
        collum: this.state.collum,
        row: this.state.row,
      })
      .then((res) => this.props.Onclick)
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <button className="square" onClick={this.postMove}>
        {this.state.value}
      </button>
    );
  }
}
export default TttSquare;
