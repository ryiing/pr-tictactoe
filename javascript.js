function createPlayer(name, marker) {
    return {
        name:name,
        marker:marker
    };
};

const board = (() => {
    const board = ['','','','','','','','',''];

    const getBoard = () => board;

    const setCell = (index, player) => {
        if(board[index] == '') {
            board[index] = player.marker;
        }
        else {
            return;
        };
    };

    const getCell = (index) => {
        return board[index];
    };

    const reset = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    }  

    return {
        getBoard, setCell, getCell, reset
    };
})();

 const gameController = (() => {
    let player1 = createPlayer('Ryan', 'x');
    let player2 = createPlayer('Moeka', 'o');
    let isOver = false;
    let round = 0;

    let activePlayer = player1;

    const getActivePlayer = () => {
        return activePlayer;
    };

    const switchPlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const playRound = (index) => {
        console.log(round);
        console.log('Marking cell');
        board.setCell(index, activePlayer);
        if(checkWin()) {
            isOver = true;
            displayController.updateWinner(activePlayer.name);
            return;
        }
        if (round == 8) {
            isOver = true;
            displayController.updateTie();
            return;
        }
        else {
            switchPlayer();
            displayController.updateMessage(activePlayer.name);
        };
        round++;
    }

    const isGameOver = () => {
        return isOver;
    };

    const checkWin = () => {
        const currentBoard = board.getBoard();
        const winCondition = [
            [0, 1, 2], //rows
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6], //columns
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8], //diagnols
            [2, 4, 6],
        ];
        for (let condition of winCondition) {
            const [a, b, c] = condition;
            if(currentBoard[a] !== "" && currentBoard[a] == currentBoard[b] && currentBoard[b] == currentBoard[c]){
                return true;
            }
        }
    };

    const reset = () => {
        activePlayer = player1;
        isOver = false;
        round = 0;
    }

    const getRound = () => {
        return round;
    }

    return { 
        playRound, getActivePlayer,switchPlayer, checkWin, isGameOver, getRound, reset
    }
})();

const displayController = (() => {
    const gameBoardDiv = document.getElementById("gameboard");
    const playerTurnDiv = document.getElementById('playerturn');
    const resetButton = document.getElementById("reset");
    
    const updateScreen = (() => {
        gameBoardDiv.textContent = ''; //clear board
        const screenboard = board.getBoard();

        screenboard.forEach((e, index) => {
            const cellButton = document.createElement('button');
            cellButton.classList.add("cell");
            cellButton.textContent = board.getCell(index);
            cellButton.addEventListener('click', () => {
                if (gameController.isGameOver() == true || cellButton.textContent !== ''){
                    return;
                }
                else {
                    gameController.playRound(index);
                    updateScreen();
                }
            });
            gameBoardDiv.appendChild(cellButton);
        });

        resetButton.addEventListener('click', () => {
            reset();
        });

    });

    const updateMessage = (text) => {
        playerTurnDiv.textContent = `Now it is ${text}'s turn`;
    }

    const updateWinner = (text) => {
        playerTurnDiv.textContent = `The winner is ${text}`;
    }

    const resetMessage = () => {
        playerTurnDiv.textContent = `Ryan Starts with X!`;
    }

    const updateTie = () => {
        playerTurnDiv.textContent = 'Its a tie!';
    }

    const reset = () => {
        console.log('reset!');
        board.reset();
        gameController.reset();
        resetMessage();
        updateBoard();
    }

    const updateBoard = () => {
        cells = document.getElementsByClassName("cell");
        for(let i=0; i < cells.length; i++){
            cells[i].textContent = board.getCell(i);
        }
    };

    // currentPlayer = gameController.getActivePlayer();
    // playerTurnDiv.textContent = `${currentPlayer.name} starts with X!`;
    updateScreen();

    return {
        updateMessage, updateWinner, updateTie
    }
})();