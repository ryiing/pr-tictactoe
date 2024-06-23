//factory function that creates players
const player = (marker) => {
    const getMarker = () => marker;
    return {getMarker};
};

const gameBoard = (function () {
    board = ['','','','','','','','','',];

    clearBoard = function () {
        for(let i = 0; i < board.length; i++){
            board[i] = '';
        }
    }

    const getCell = (index) => {

    };

    setCell = (index, sign) => {

    };

    return {
        clearBoard
    };

})();

const gameController = (function() {
    const player1 = player('X');
    const player2 = player('O');
    let round = 1;
    
    const getRound = () => {
        return round;
    }
    const playRound = (index, )
})