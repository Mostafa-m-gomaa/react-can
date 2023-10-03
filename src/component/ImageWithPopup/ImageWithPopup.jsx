import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "./ImageWithPopup.css";
function ImageWithPopup(props) {
  const [isPop, setIsPop] = useState(false);

  return (
    <>
      {props.style ? (
        <img
          src={props.src}
          alt=""
          className={`${props.class} cursor-pointer`}
          onClick={() => setIsPop(true)}
          style={props.style}
        />
      ) : (
        <img
          src={props.src}
          alt=""
          className={`${props.class} cursor-pointer`}
          onClick={() => setIsPop(true)}
        />
      )}

      {isPop && (
        <div className="vidPopup" onClick={() => setIsPop(false)}>
          <div>
            <span onClick={() => setIsPop(false)}>X</span>
            <ReactPlayer url={props.youtube} />
          </div>
        </div>
      )}
    </>
  );
}

export default ImageWithPopup;