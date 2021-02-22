import './App.css';
import React, {useState} from 'react'
import Row from './components/row'

function App() {
    const [winningHm, setWinningHm] = useState({hor: {}, ver: {}, dia: {}})
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
        console.time()
        const shape = exTurn ? 'X' : 'O'
        let checkHm = winningHm

        // check horizontal lines
        let section = 'hor'
        checkHm = buildHm(checkHm,shape,square.rowIndex,section)

        // check vertical lines
        section = 'ver'
        checkHm = buildHm(checkHm,shape,square.col,section)

        // check diagonally
        section = 'dia'
        if (square.rowIndex === 0) {
            if (square.col === 0) {
                checkHm = buildHm(checkHm, shape, 'left',section)
            } else if (square.col === 2) {
                checkHm = buildHm(checkHm, shape, 'right',section)
            }
        } else if (square.rowIndex === 2) {
            if (square.col === 0) {
                checkHm = buildHm(checkHm, shape, 'right',section)
            } else if (square.col === 2) {
                checkHm = buildHm(checkHm, shape, 'left',section)
            }
        } else {
            if (square.col === 1) {
                checkHm = buildHm(checkHm, shape, 'right',section)
                checkHm = buildHm(checkHm, shape, 'left',section)
            }
        }
        setWinningHm(checkHm)
        setExTurn(!exTurn)
        console.timeEnd()
    }

    const buildHm = (checkHm, shape, index,section) => {
        if (!checkHm[section][index]) {
            checkHm[section][index] = {}
            checkHm[section][index].i = 1
            checkHm[section][index].firstShape = shape
            checkHm[section][index]['winPossible'] = true
        } else {
            if (checkHm[section][index]['winPossible'] && checkHm[section][index].firstShape === shape) {
                checkHm[section][index].i++
            } else {
                checkHm[section][index]['winPossible'] = false
            }
            if (checkHm[section][index].i === 3) {
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
