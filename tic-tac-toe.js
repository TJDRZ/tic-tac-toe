"use strict";
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
        [2, 4, 6],
    ];
    const newGameButton = document.querySelector("#new-game");
    const gameboard = document.querySelector("#gameboard");
    let turnCounter = 0;
    const checkWin = (player) => {
        let teamIndex = [];
        (function getIndex() {
            let i = -1;
            while ((i = board.indexOf(player.team, i + 1)) != -1) {
                teamIndex.push(i);
            }
            return teamIndex;
        })();
        (function win() {
            for (let i = 0; i < solutions.length; i++) {
                for (let j = 0; j < solutions[i].length; j++) {
                    if (teamIndex.includes(solutions[i][j]) == true) {
                        if (teamIndex.includes(solutions[i][j + 1]) == true) {
                            if (teamIndex.includes(solutions[i][j + 2]) == true) {
                                alert(`Team ${player.team}, ${player.name} Wins!`);
                                reset();
                            }
                        }
                    }
                }
            }
            if (board.includes("") == false) {
                alert("Tie Game!");
                reset();
                teamIndex = [];
            }
        })();
    };
    const createBoard = (playerOne, playerTwo) => {
        for (let i = 0; i < 9; i++) {
            const div = document.createElement("div");
            div.classList.add("box");
            div.addEventListener("click", function () {
                if (div.textContent == "") {
                    if (turnCounter % 2 == 0) {
                        div.textContent = playerOne.team;
                        div.style.color = "rgba(171, 205, 239, 1)";
                        div.style.border = "10px groove rgba(171, 205, 239, 1)";
                        turnCounter++;
                        board[i] = playerOne.team;
                        checkWin(playerOne);
                    }
                    else {
                        div.textContent = playerTwo.team;
                        div.style.color = "rgba(190, 144, 212, 1)";
                        div.style.border = "10px groove rgba(190, 144, 212, 1)";
                        turnCounter++;
                        board[i] = playerTwo.team;
                        checkWin(playerTwo);
                    }
                }
            });
            gameboard.appendChild(div);
        }
    };
    const reset = () => {
        turnCounter = 0;
        board.forEach((node, i) => {
            board[i] = "";
        });
        while (gameboard.firstElementChild) {
            gameboard.removeChild(gameboard.firstElementChild);
        }
        gameboard.style.display = "none";
        newGameButton.style.display = "flex";
    };
    return {
        createBoard,
    };
})();
// create game
const gameCreation = ((gameController) => {
    const newGameButton = document.querySelector("#new-game");
    const teamForm = document.querySelector("#team-form");
    const teamX = document.querySelector("#team-x");
    const teamSubmit = document.querySelector("#team-submit");
    const nameForm = document.querySelector("#name-form");
    const name = document.querySelector("#name-text");
    const nameSubmit = document.querySelector("#name-submit");
    const gameboard = document.querySelector("#gameboard");
    const player = (team, name) => {
        return {
            team,
            name,
        };
    };
    let players = 0;
    const playerOne = player("", "");
    const playerTwo = player("", "");
    newGameButton.addEventListener("click", function () {
        newGameButton.style.display = "none";
        teamForm.style.display = "flex";
    });
    teamSubmit.addEventListener("click", function () {
        teamForm.style.display = "none";
        nameForm.style.display = "flex";
        if (players == 0) {
            teamX.checked ? (playerOne.team = "X") : (playerOne.team = "O");
        }
        else {
            playerOne.team == "X" ? (playerTwo.team = "O") : (playerTwo.team = "X");
        }
    });
    nameSubmit.addEventListener("click", function () {
        nameForm.style.display = "none";
        if (players == 0) {
            playerOne.name = name.value;
            players++;
            teamForm.style.display = "flex";
        }
        else {
            playerTwo.name = name.value;
            gameController.createBoard(playerOne, playerTwo);
            gameboard.style.display = "grid";
        }
    });
})(gameController);
