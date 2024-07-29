document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const gameContainer = document.getElementById('game-container');
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const showLogin = document.getElementById('show-login');
    const showRegister = document.getElementById('show-register');
    const logoutButton = document.getElementById('logoutButton');
    const playerName = document.getElementById('player-name');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    showLogin.addEventListener('click', () => {
        registerContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
    });

    showRegister.addEventListener('click', () => {
        loginContainer.classList.add('hidden');
        registerContainer.classList.remove('hidden');
    });

    loginButton.addEventListener('click', login);
    registerButton.addEventListener('click', register);
    logoutButton.addEventListener('click', logout);
    resetButton.addEventListener('click', resetGame);

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    function login() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            playerName.textContent = username;
            loginContainer.classList.add('hidden');
            gameContainer.classList.remove('hidden');
        } else {
            alert('Invalid username or password');
        }
    }

    function register() {
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        if (localStorage.getItem(username)) {
            alert('Username already exists');
        } else {
            localStorage.setItem(username, password);
            alert('Registration successful');
            showLogin.click();
        }
    }

    function logout() {
        gameContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
    }

    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.dataset.index;

        if (board[index] === '') {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;

            if (checkWin()) {
                alert(`${currentPlayer} wins!`);
                resetGame();
            } else if (board.every(cell => cell !== '')) {
                alert('It\'s a draw!');
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === currentPlayer;
            });
        });
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
    }
});
