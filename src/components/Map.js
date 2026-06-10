import { useRef, useEffect, useState } from 'react'; 

const clans = {
  BDE: '#3B82F6',
  BDA: '#F59E0B',
  BDS: '#10B981',
  neutral: '#1F2937'
};

function Map() {
  const canvasRef = useRef(null);

  // draws ONE cell directly on canvas
  const updateCell = (x, y, clan) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = clans[clan];
    ctx.fillRect(x * 4, y * 4, 4, 4);
  };

  // draws ALL cells once on mount
  useEffect(() => {
    for (let y = 0; y < 200; y++) {
      for (let x = 0; x < 200; x++) {
        updateCell(x, y, 'neutral');
      }
    }

      updateCell(100, 100, 'BDE'); // test
  }, []);

  return (
    <div>
      <h2>Map</h2>
      <canvas ref={canvasRef} width={800} height={800}></canvas>
    </div>
  );
}

export default Map;