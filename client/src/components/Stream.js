import React from "react";

class Stream extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: props.match.params.id
      }
    }
  
    render() {
      return (
        <div>
          <video id="videoPlayer" className="player" controls autoPlay> 
            <source src={"/api/stream/" + this.state.id} type="video/mp4" />
          </video>
        </div>
      )
    }
  }

  export default Stream;