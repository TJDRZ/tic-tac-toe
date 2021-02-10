const player = (team, name) => {
    return {
        team,
        name
    }
};

const gameController = (() => {
    const board = ["", "", "", "", "", "", "", "", ""]; 
    const solutions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const newGameButton = document.querySelector('#new-game');
    const gameboard = document.querySelector('.gameboard');
    var turnCounter = 0;

    const checkWin = (board, team, name, solutions) => {
        var index = [];
        
        (function getIndex(board, team) {
            var i = -1;
            while ((i = board.indexOf(team, i+1)) != -1) {
                index.push(i);
            }
            return index;
        })(board, team);

        (function win(index, solutions, name, board) {
            for (let i = 0; i < solutions.length; i++) {
                for (let j = 0; j < solutions[i].length; j++) {
                    if (index.includes(solutions[i][j]) == true) {
                        if (index.includes(solutions[i][j + 1]) == true) {
                            if (index.includes(solutions[i][ j + 2]) == true) {
                                alert(name + ' Wins!');
                                reset();
                                index = [];
                                gameboard.style.display = 'none';
                                newGameButton.style.display = 'flex';
                            }
                        }
                    }
                }
            }
            if (board.includes("") == false) {
                alert('Tie Game!');
                reset();
                index = [];
                gameboard.style.display = 'none';
                newGameButton.style.display = 'flex';
            }
        })(index, solutions, name, board);
    };

    const createBoard = (playerOne, playerTwo) => {
        for (let i = 0; i < 9; i++) {
            const div = document.createElement('div');
            div.classList = ('box');
            div.id = (i);
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            div.style.border = 'ridge white';
            div.style.font = 'bold 2em fantasy';
            div.style.color = 'white';
            div.addEventListener('click', function(){
                if (div.textContent == '') {
                    if (turnCounter % 2 == 0) {
                        div.textContent = playerOne.team;
                        div.style.color = 'rgba(171, 205, 239, 1)';
                        div.style.border = '10px groove rgba(171, 205, 239, 1)';
                        turnCounter++;
                        changeBoard(div.id, playerOne.team);
                        checkWin(board, playerOne.team, playerOne.name, solutions);
                    }
                    else {
                        div.textContent = playerTwo.team;
                        div.style.color = 'rgba(190, 144, 212, 1)';
                        div.style.border = '10px groove rgba(190, 144, 212, 1)';
                        turnCounter++;
                        changeBoard(div.id, playerTwo.team);
                        checkWin(board, playerTwo.team, playerTwo.name, solutions);
                    }
                }
            });
            gameboard.appendChild(div);
        }
    };

    const reset = (index) => {
        turnCounter = 0;
        board.forEach((x, i) => {
            board[i] = "";
        });
        while (gameboard.firstElementChild) {
            gameboard.removeChild(gameboard.firstElementChild);
        }
    };

    const changeBoard = (box, team) => {
        board[box] = team;
    };

    return {
        board,
        solutions,
        createBoard,
        changeBoard,
        reset,
    }
})();

const displayController = ((gameController) => {
    const newGameButton = document.querySelector('#new-game');
    const teamForm = document.querySelector('#team-form');
    const nameForm = document.querySelector('#name-form');
    const teamSubmit = document.querySelector('#team-submit');
    const nameSubmit = document.querySelector('#name-submit');
    const gameboard = document.querySelector('.gameboard');
    var name;
    var team;
    var players = 0;
    var playerOne;
    var playerTwo;
   
    newGameButton.addEventListener('click', function(){
        name;
        team;
        players = 0;
        playerOne;
        playerTwo;
        newGameButton.style.display = 'none';
        teamForm.style.display = 'flex';
    });

    teamSubmit.addEventListener('click', function(){
        teamForm.style.display = 'none';
        nameForm.style.display = 'flex';
        if (players == 0) {
            if (document.querySelector('#team-x').checked) {
                team = 'X';
            }
            else {
                team = 'O';
            }
        }
        else {
            if (playerOne.team == 'X') {
                team = 'O';
            }
            else {
                team = 'X';
            }
        }
    });
     
    nameSubmit.addEventListener('click', function(){
        nameForm.style.display = 'none';
        name = document.querySelector('#name-text').value
        if (players == 0) {
            playerOne = player(team, name);
            players++;
            teamForm.style.display = 'flex';
        }
        else {
            playerTwo = player(team, name);
            gameController.createBoard(playerOne, playerTwo);
            gameboard.style.display = 'grid';
        }
    });
})(gameController);