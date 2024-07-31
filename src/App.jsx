import { useState, useCallback } from 'react'

function generateGrid(rows, cols) {
  const result = [];

  for (let i = 0; i < rows; i++) {
    let row = [];

    for (let j = 0; j < cols; j++) {
      row.push({ hasBomb: Math.random() < 0.25 });
    }

    result.push(row);
  }

  return result;
}

function countAdjacentBombs(grid, i, j) {
  const rows = grid.length;
  const cols = grid[0].length;
  let bombCount = 0;

  // Define the relative positions of adjacent cells (8 directions)
  const directions = [
    [-1, -1], // Top-left
    [-1, 0],  // Top
    [-1, 1],  // Top-right
    [0, -1],  // Left
    [0, 1],   // Right
    [1, -1],  // Bottom-left
    [1, 0],   // Bottom
    [1, 1],   // Bottom-right
  ];

  // Iterate through all possible adjacent positions
  for (const [di, dj] of directions) {
    const ni = i + di;
    const nj = j + dj;

    // Check if the adjacent position is within bounds
    if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
      if (grid[ni][nj].hasBomb) {
        bombCount++;
      }
    }
  }

  return bombCount;
}

function Square({ size = 50, hasBomb, nearBombs }) {
  const [color, setColor] = useState("gray");

  const onClickHandler = useCallback(() => {
    setColor(hasBomb ? "red" : "green");
  });

  const styles = {
    "height": `${size}px`,
    "width": `${size}px`,
    "display": "flex",
    "alignItems": "center",
    "justifyContent": 'center',
    "backgroundColor": color,
    "cursor": "default",
    "color": "white",
    "userSelect": "none"
  };

  return (
    <div style={styles} onClick={onClickHandler}>
      { nearBombs }
    </div>
  );
}

const Grid = ({ rows = 5, cols = 5, size = 50, gap = "1px" }) => {
  const [grid] = useState(generateGrid(rows, cols));

  const gridStyle = {
    display: 'grid',
    gridTemplateRows: `repeat(${rows}, ${size}px)`,
    gridTemplateColumns: `repeat(${cols}, ${size}px)`,
    gap,
  };

  const squares = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      squares.push(<Square
                     key={`${i}-${j}`}
                     size={size}
                     nearBombs={countAdjacentBombs(grid, i, j)}
                     hasBomb={grid[i][j].hasBomb}/>);
    }
  }

  return <div style={gridStyle}>{squares}</div>;
};

function App() {
  return (
    <>
      <Grid rows={8} cols={8} gap={"2px"}/>
    </>
  )
}

export default App
