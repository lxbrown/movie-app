import React from "react";
import { useParams } from "react-router-dom";

export default function Stream() {
  let { id } = useParams();

  const handleError = error => {
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    if (!isChrome) {
      alert('Try watching this one on Chrome. Some browsers don\'t support all the video formats.')
    }
  }

  return (
    <div>
      <video id="videoPlayer" className="player" controls autoPlay> 
        <source src={"/api/stream/" + id} type="video/mp4" onError={handleError}/>
      </video>
    </div>
  )
}