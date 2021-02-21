import './App.css';
import React, {useState} from 'react'
import Row from './components/row'

function App() {
    const [winningHm, setWinningHm] = useState({hor: {}, ver: {}, dig: {}})
    const [rows, setRows] = useState([[0, 1, 2], [0, 1, 2], [0, 1, 2]])
    const [exTurn, setExTurn] = useState(true)
    const [winner, setWinner] = useState('')

    const handleClick = (square) => {
        const newWrite = exTurn ? 'X' : 'O'
        console.log(newWrite)
        let squares = rows
        squares[square.rowIndex][square.col] = newWrite
        setRows(squares)
        checkWinning(square)
    }

    const checkWinning = (square) => {
        const shape = exTurn ? 'X' : 'O'

        // check horizontal lines
        let checkHm = winningHm
        if (!checkHm["hor"][square.rowIndex]) {
            checkHm["hor"][square.rowIndex] = {}
            checkHm["hor"][square.rowIndex].i = 1
            checkHm["hor"][square.rowIndex].firstShape = shape
            checkHm["hor"][square.rowIndex]['winPossible'] = true
        } else {
            if (checkHm["hor"][square.rowIndex]['winPossible'] && checkHm["hor"][square.rowIndex].firstShape === shape) {
                checkHm["hor"][square.rowIndex].i++
            } else {
                checkHm["hor"][square.rowIndex]['winPossible'] = false
            }
            if (checkHm["hor"][square.rowIndex].i === 3) {
                winnerCall(shape)
            }
        }

        // check vertical lines
        if (!checkHm["ver"][square.col]) {
            checkHm["ver"][square.col] = {}
            checkHm["ver"][square.col].i = 1
            checkHm["ver"][square.col].firstShape = shape
            checkHm["ver"][square.col]['winPossible'] = true
        } else {
            if (checkHm["ver"][square.col]['winPossible'] && checkHm["ver"][square.col].firstShape === shape) {
                checkHm["ver"][square.col].i++
            } else {
                checkHm["ver"][square.col]['winPossible'] = false
            }
            if (checkHm["ver"][square.col].i === 3) {
                winnerCall(shape)
            }
        }

        //
        if (square.rowIndex === 0) {
            if (square.col === 0) {
                checkHm = checkDig(checkHm, shape, 'left')
            } else if (square.col === 2) {
                checkHm = checkDig(checkHm, shape, 'right')
            }
        } else if (square.rowIndex === 2) {
            if (square.col === 0) {
                checkHm = checkDig(checkHm, shape, 'right')
            } else if (square.col === 2) {
                checkHm = checkDig(checkHm, shape, 'left')
            }
        } else {
            if (square.col === 1) {
                checkHm = checkDig(checkHm, shape, 'right')
                checkHm = checkDig(checkHm, shape, 'left')
            }
        }
        setWinningHm(checkHm)
        setExTurn(!exTurn)
    }

    const checkDig = (checkHm, shape, dir) => {
        if (!checkHm["dig"][dir]) {
            checkHm["dig"][dir] = {}
            checkHm["dig"][dir].i = 1
            checkHm["dig"][dir].firstShape = shape
            checkHm["dig"][dir]['winPossible'] = true
        } else {
            if (checkHm["dig"][dir]['winPossible'] && checkHm["dig"][dir].firstShape === shape) {
                checkHm["dig"][dir].i++
            } else {
                checkHm["dig"][dir]['winPossible'] = false
            }
            if (checkHm["dig"][dir].i === 3) {
                winnerCall(shape)
            }
        }
        return checkHm
    }

    const winnerCall = (shape) => {
        setWinner('the winner is ' + shape)
    }

    return (
        <div className="App">
            {rows.map((row, key) => <Row className='row'
                                         row={row}
                                         key={key}
                                         rowIndex={key}
                                         onClick={handleClick}
                />
            )}
            <h1>{winner}</h1>
        </div>
    );
}

export default App;
