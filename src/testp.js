import React from "react";
import axios from "axios";
class TestP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      getres: "",
      loaded: false
    };
  }

  clicktest() {
    console.log(this.state);
    console.log("dsFaSDFdsf");
  }
  showOutput(e) {
    console.log("khbjgvgj");
    this.setState(
      {
        title: "get",
        getres: "get",
        loaded: true
      },
      console.log(this.state)
    );

    //document.getElementById("output").setState(this.state.title);
  }

  get() {
    axios
      .get("/test2", {
        timeout: 5000
      })
      .then(res => this.showOutput(res))
      .catch(err => console.error(err));

    // fetch("localhost:8080/api/v1/test2")
    //   .then(res => res.jason())
    //   .then(
    //     result => {
    //       this.setState({
    //         getres: result.name,
    //         loaded: true
    //       });
    //     },

    //     error => {
    //       this.setState({
    //         loaded: true,
    //         error
    //       });
    //     }
    //   );
  }

  post(e) {
    this.setState({ title: e.target.value });
    fetch("/holder", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.title
      })
    });
  }

  render() {
    // return (
    //   <div>
    //     <input type="text" name="post" value={this.state.title} />
    //     <input type="text" name="get" value={this.state.getres} />
    //     <button className="square" onClick={this.get}></button>
    //   </div>
    // );

    console.log("rendered");
    return (
      <div>
        <input type="text" name="post" />
        <input type="text" name="get" id="output" />
        <button className="square" onClick={() => this.get()}>
          get
        </button>
        <button className="s" onClick={() => this.clicktest()}>
          post
        </button>
        <button className="s" onClick={() => this.showOutput()}>
          test
        </button>
        <h1>{this.state.getres}</h1>
        <div className="res" />
      </div>
    );

    //   console.log("rendered2");
    //   return (
    //     <div>
    //       <input
    //         type="text"
    //         name="post"
    //         id="output"
    //         defaultValue={this.state.title}
    //       />
    //       <input type="text" name="get" defaultValue={this.state.getres} />
    //       <button className="square" onClick={this.get}></button>
    //     </div>
    //   );
  }
}

export default TestP;
