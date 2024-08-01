import "./App.css";
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

function getAdjacentSquares(grid, i, j) {
  const rows = grid.length;
  const cols = grid[0].length;

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

  return directions
    .map(([di, dj]) => {
      return [i + di, j + dj];
    })
    .filter(([i, j]) => {
      return i >= 0 && i < rows && j >= 0 && j <= cols;
    })
    .map(([i, j]) => grid[i][j])
    .filter((s) => s);
}

function countAdjacentBombs(grid, i, j) {
  console.log(getAdjacentSquares(grid, i, j));

  return getAdjacentSquares(grid, i, j)
    .filter((square) => square.hasBomb)
    .length;
}

function Square({ size = 50, hasBomb, nearBombs, onClick }) {
  const [color, setColor] = useState("gray");
  const [showAdjacent, setShowAdjacent] = useState(false);

  const onClickHandler = useCallback(() => {
    if (hasBomb) {
      setColor("red");
    }
    else {
      setColor("green");
      setShowAdjacent(true);
    }
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
    "userSelect": "none",
    "fontFamily": "'Roboto', sans-serif",
    "fontWeight": 'bold',
  };

  return (
    <div style={styles} onClick={onClickHandler}>
      { showAdjacent ? nearBombs : "" }
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

  const onClickSquareHandler = useCallback((grid, i, j) => {
  });

  const squares = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      squares.push(<Square
                     key={`${i}-${j}`}
                     size={size}
                     nearBombs={countAdjacentBombs(grid, i, j)}
                     hasBomb={grid[i][j].hasBomb}
                     onClick={ () => onClickSquareHandler(grid, i, j) }/>);
    }
  }

  return <div style={gridStyle}>{squares}</div>;
};

function App() {
  const styles = {
    "display": "flex",
    "justifyContent": "center",
  };

  return (
    <div style={styles}>
      <Grid rows={8} cols={8} gap={"2px"}/>
    </div>
  )
}

export default App
