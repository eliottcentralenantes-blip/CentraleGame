import { useRef, useEffect, useState } from 'react'; 

const clans = {
  BDE: '#3B82F6',
  BDA: '#F59E0B',
  BDS: '#10B981',
  neutral: '#1F2937'
};



function Map() {
  const canvasRef = useRef(null); //create a pointer to the canva

  const [cells, setCells] = useState([]); // state variable thqt will contain all the cells

  // draws ONE cell directly on canvas
  const updateCell = (x, y, clan) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = clans[clan];
    ctx.fillRect(x * 4, y * 4, 4, 4);
  };

  /*once a request to territory, edit cells with a new data*/
  useEffect(() => {
  fetch('http://127.0.0.1:8000/territory')
    .then(response => response.json())
    .then(data => setCells(data));
}, []);

  /* color from the database each cells of the canvas*/
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    cells.forEach(cell => {
      ctx.fillStyle = cell.color;              // color from the database
      ctx.fillRect(cell.x * 4, cell.y * 4, 4, 4);  // position from the database
    });
  }, [cells]);   // re-runs when cells arrive


  return (
    <div>
      <h2>Map</h2>
      <canvas ref={canvasRef} width={800} height={800}></canvas>
    </div>
  );
}

export default Map;