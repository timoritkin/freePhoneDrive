// Word bank associated with car accidents
const wordBank = ["CRASH", "BRAKE", "PHONE", "WRECK"];

let solution = wordBank[Math.floor(Math.random() * wordBank.length)]; // Randomly select a solution
const maxGuesses = 6;
let timerInterval;
let gameTime = 0;
let guesses = [];
let totalGuesses = 0;
let score = 0;
let gameResult = ''; // Variable to store game result ('win' or 'lose')
let prize='';

function createGameBoard() {
    const gameElement = document.getElementById('game');
    gameElement.innerHTML = ''; // Clear previous game board
    for (let i = 0; i < maxGuesses; i++) {
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement('div');
            gameElement.appendChild(tile);
        }
    }
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        gameTime++;
        document.getElementById('timer').textContent = `Time: ${gameTime} seconds`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function submitGuess() {
    const input = document.getElementById('guessInput').value.toUpperCase();
    if (input.length !== 5) {
        alert("Guess must be 5 letters.");
        return;
    }

    guesses.push(input);
    totalGuesses++;

    if (guesses.length > maxGuesses) {
        stopTimer();
        gameResult = 'Lose';
        prize='no'
        alert("Max guesses reached. The word was " + solution + ". Refresh to play again.");
        saveGameDataToServer();
        resetGame();
        return;
    }

    updateGameBoard();

    // Check for win condition
    if (input === solution) {
        stopTimer();
        gameResult = 'Win';
        calculateScore();
        prize= 'yes';
        saveGameDataToServer();
        setTimeout(() => {
            alert("Congratulations!");
            resetGame();
        }, 100);
    }

    document.getElementById('guessInput').value = ''; 
}

function updateGameBoard() {
    const tiles = document.querySelectorAll('#game div');
    let tileIndex = guesses.length * 5 - 5;

    for (let i = 0; i < 5; i++) {
        const letter = guesses[guesses.length - 1][i];
        tiles[tileIndex].textContent = letter;
        tiles[tileIndex].classList.remove('correct', 'present', 'absent'); 
        if (solution[i] === letter) {
            tiles[tileIndex].classList.add('correct');
        } else if (solution.includes(letter)) {
            tiles[tileIndex].classList.add('present');
        } else {
            tiles[tileIndex].classList.add('absent');
        }
        tileIndex++;
    }
}

function calculateScore() {
    const maxScore = 10000;
    const maxGuesses = 6;
    const maxGameTime = 120; 

    // Calculate maximum score contribution per guess and per second
    const maxScorePerGuess = maxScore / maxGuesses;
    const maxScorePerSecond = maxScore / maxGameTime;

    // Calculate score contribution based on the ratio of actual guesses and game time to the maximum possible
    const guessScore = Math.max(0, maxScorePerGuess * (maxGuesses - totalGuesses));
    const timeScore = Math.max(0, maxScorePerSecond * (maxGameTime - gameTime));

    // Combine the guess score and time score
    score = Math.round(guessScore + timeScore);
}


function saveGameDataToServer() {
    const data = {
        solution: solution,
        guesses: guesses,
        gameTime: gameTime,
        totalGuesses: totalGuesses,
        score: score,
        gameResult: gameResult,
        prize:prize
    };

    

    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', '/game');

    // Create hidden input fields for each data item
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', key);
            input.setAttribute('value', JSON.stringify(data[key]));
            form.appendChild(input);
        }
    }

    // Append the form to the document body and submit it
    document.body.appendChild(form);
    form.submit();
}

function resetGame() {
    solution = wordBank[Math.floor(Math.random() * wordBank.length)]; 
    createGameBoard(); 
    guesses = [];
    totalGuesses = 0;
    score = 0;
    gameResult = ''; 
}

createGameBoard();
