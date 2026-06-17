import { useRef, useEffect, useState } from 'react'; 

const clans = {
  BDE: '#3B82F6',
  BDA: '#F59E0B',
  BDS: '#10B981',
  neutral: '#4F2937'
};

const TERRAIN_COLORS = {
  outside:      '#F5F5F5',
  building:     '#102648',
  construction: '#E26469',
  path:         '#D1D1D1',
  sports:       '#258801',
  rez:          '#005BF6',
};

const NON_CAPTURABLE = new Set(['outside', 'building', 'construction']);



function Map() {
  const canvasRef = useRef(null); //create a pointer to the canva

  const [cells, setCells] = useState([]); // state variable thqt will contain all the cells

  // draws ONE cell directly on canvas
  const updateCell = (x, y, color) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = color;
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
      const terrainColor = TERRAIN_COLORS[cell.ground] ?? '#888888';
      const isNeutral = cell.color === clans.neutral;
      const color = (NON_CAPTURABLE.has(cell.ground) || isNeutral) ? terrainColor : cell.color;
      ctx.fillStyle = color;
      ctx.fillRect(cell.x * 4, cell.y * 4, 4, 4);
    });
  }, [cells]);


    useEffect(() => {
      const ws = new WebSocket("ws://localhost:8000/ws");
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
              updateCell(data.x, data.y, data.color);
      };
      return () => {
        ws.close();
      };
    }, []);




  return (
    <div>
      <h2>Map</h2>
      <canvas ref={canvasRef} width={800} height={800}></canvas>
    </div>
  );
}

export default Map;