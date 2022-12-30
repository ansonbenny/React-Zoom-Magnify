import { useState } from 'react';

function App() {
  const [magnifier, setMagnifier] = useState(false)
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);

  var src = "/image.jpg"
  var width = "100%"
  var height = "auto"
  var magnifierHeight = 200
  var magnifieWidth = 200
  var zoomLevel = 3

  return (
    <div className="App">
      <img src={src}
        style={{ height: height, width: width ,maxWidth: '300px'}} onMouseEnter={(e) => {
          setMagnifier(true)
          const elem = e.currentTarget;
          console.log(e)
          const { width, height } = elem.getBoundingClientRect();
          console.log(elem.getBoundingClientRect())
          setSize([width, height]);
        }} onMouseMove={(e) => {
          // update cursor position
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();

          // calculate cursor position on the image
          const x = e.pageX - left - window.pageXOffset;
          const y = e.pageY - top - window.pageYOffset;
          setXY([x, y]);
        }}

        onMouseLeave={() => {
          setMagnifier(false)
        }} alt="" />
      <div style={{
        display: magnifier ? 'block' : 'none', position: "absolute",

        // prevent magnifier blocks the mousemove event of img
        pointerEvents: "none",
        // set size of magnifier
        height: `${magnifierHeight}px`,
        width: `${magnifieWidth}px`,
        // move element center to cursor pos
        top: `${y - magnifierHeight / 2}px`,
        left: `${x - magnifieWidth / 2}px`,
        opacity: "1", // reduce opacity so you can verify position
        border: "1px solid lightgray",
        backgroundColor: "white",
        backgroundImage: `url('${src}')`,
        backgroundRepeat: "no-repeat",

        //calculate zoomed image size
        backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel
          }px`,

        //calculate position of zoomed image.
        backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
        backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
      }} alt="" >
      </div>
    </div>
  );
}

export default App;
