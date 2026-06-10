
import { useRef, useEffect } from 'react';

function Map() {

    // Ref to access the canvas DOM element directly, its a pointer
    const canvasRef = useRef(null);

    // Runs once after the component mounts to draw initial canvas content
    useEffect(()    =>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d'); // 2D rendering context

        // Draw a red 50x50 square at the top-left corner
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, 50, 50);
    }, []);


  return (
      <div>
          <h1>
            Map
          </h1>
          {/* 800x800 canvas where the map is drawn */}
          <canvas ref= { canvasRef}  width={800} height={800}></canvas>
      </div>
  );
}

export default Map;
