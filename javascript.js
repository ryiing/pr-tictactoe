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
            gameController.switchPlayer();
        }
        else {
            return;
        };
    };

    const getCell = (index) => {
        return board[index];
    };

    return {
        getBoard, setCell, getCell
    };
})();

const gameController = (() => {
    let player1 = createPlayer('Ryan', 'x');
    let player2 = createPlayer('Moeka', 'o');

    let activePlayer = player1;

    const getActivePlayer = () => {
        return activePlayer;
    }

    const switchPlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
        console.log('player switched');
    };

    const playRound = (index) => {
        console.log('Marking cell');
        board.setCell(index, activePlayer);
    }

    const printNewRound = () => {
        console.log(`now it is ${activePlayer.name}'s turn!`);
    }

    const checkWin = () => {
        const winCondition = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        

        
    }

    return { 
        playRound, getActivePlayer,switchPlayer
    }
})();

const displayController = (() => {
    const gameBoardDiv = document.getElementById("gameboard");
    const playerTurnDiv = document.getElementById('playerturn');
    const resetButton = document.getElementById("reset");
    
    const updateScreen = (() => {
        gameBoardDiv.textContent = ''; //clear board
        const screenboard = board.getBoard();
        const currentPlayer = gameController.getActivePlayer();

        playerTurnDiv.textContent = `Now it is ${currentPlayer.name}'s turn...`

        screenboard.forEach((e, index) => {
            const cellButton = document.createElement('button');
            cellButton.classList.add("cell");
            cellButton.textContent = board.getCell(index);
            cellButton.addEventListener('click', () => {
                board.setCell(index, currentPlayer);
                gameController.playRound(index);
                updateScreen();
            });

            gameBoardDiv.appendChild(cellButton);
        });


    });

    updateScreen();
})();