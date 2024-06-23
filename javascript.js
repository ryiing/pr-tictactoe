function createPlayer(name, marker) {
    return {
        name:name,
        marker:marker
    };
};

const board = function gameBoard(){
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

    const printBoard = () => {
        console.log(getBoard());
    };

    return {
        getBoard, setCell, printBoard
    };
}();

const gameController = function gameController () {
    let player1 = createPlayer('Ryan', 'x');
    let player2 = createPlayer('Moeka', 'o');

    let activePlayer = player1;

    const switchPlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const playRound = (index) => {
        console.log('Marking cell');
        board.setCell(index, activePlayer);
        switchPlayer();
        printNewRound();
    }

    const printNewRound = () => {
        console.log('printing board');
        board.printBoard();
        console.log(`now it is ${activePlayer.name}'s turn!`);
        choice = Number(prompt());
        if (choice == 99) {
            return;
        }
        else {
            playRound(choice);
        } 

    }

    printNewRound();

    return { 
        playRound
    }
}();

const displayController = () => {
    const gameBoardDiv = document.getElementById("gameboard");
    const resetButton = document.getElementById("reset");
}();