document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const lightThemeButton = document.getElementById('light-theme');
    const darkThemeButton = document.getElementById('dark-theme');
    const messageDisplay = document.getElementById('message');
    let currentPlayer = 'X'; // El jugador humano es 'X'
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        checkForWinner();

        if (gameActive && currentPlayer === 'X') {
            currentPlayer = 'O';
            setTimeout(aiMove, 500); // Pequeño retraso para la IA
        }
    };

    const aiMove = () => {
        let availableCells = [];
        gameState.forEach((cell, index) => {
            if (cell === '') {
                availableCells.push(index);
            }
        });

        if (availableCells.length > 0) {
            const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
            gameState[randomIndex] = currentPlayer;
            board[randomIndex].textContent = currentPlayer;

            checkForWinner();
            if (gameActive) {
                currentPlayer = 'X';
            }
        }
    };

    const checkForWinner = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                continue;
            }
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            gameActive = false;
            document.body.classList.add('color-changing');
            messageDisplay.textContent = `¡El jugador ${currentPlayer} ha ganado!`;
            return;
        }

        if (!gameState.includes('')) {
            gameActive = false;
            messageDisplay.textContent = "¡Es un empate!";
            return;
        }
    };

    const handleReset = () => {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        board.forEach(cell => cell.textContent = '');
        messageDisplay.textContent = '';
        document.body.classList.remove('color-changing');
        document.body.style.backgroundColor = 'var(--background-color)';
    };

    const setLightTheme = () => {
        document.body.classList.remove('dark-theme');
    };

    const setDarkTheme = () => {
        document.body.classList.add('dark-theme');
    };

    board.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleReset);
    lightThemeButton.addEventListener('click', setLightTheme);
    darkThemeButton.addEventListener('click', setDarkTheme);
});
