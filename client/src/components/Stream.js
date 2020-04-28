import React from "react";

class Stream extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: props.match.params.id
      }
    }

    handleError = error => {
      const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
      if (!isChrome) {
        alert('Try watching this one on Chrome. Some browsers don\'t support all the video formats')
      }
    }
  
    render() {
      return (
        <div>
          <video id="videoPlayer" className="player" controls autoPlay> 
            <source src={"/api/stream/" + this.state.id} type="video/mp4" onError={this.handleError}/>
          </video>
        </div>
      )
    }
  }

  export default Stream;