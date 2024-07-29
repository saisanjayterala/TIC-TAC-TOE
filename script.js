document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const gameContainer = document.getElementById('game-container');
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const showLogin = document.getElementById('show-login');
    const showRegister = document.getElementById('show-register');
    const logoutButton = document.getElementById('logoutButton');
    const playerName = document.getElementById('player-name');
    const leaderboard = document.getElementById('leaderboard');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentUser;

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

        const storedUser = localStorage.getItem(username);
        if (storedUser && storedUser === password) {
            currentUser = username;
            playerName.textContent = currentUser;
            loginContainer.classList.add('hidden');
            gameContainer.classList.remove('hidden');
            leaderboardContainer.classList.remove('hidden');
            loadLeaderboard();
        } else {
            alert('Invalid username or password');
        }
    }

    function register() {
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        if (localStorage.getItem(username)) {
            alert('User already exists');
        } else {
            localStorage.setItem(username, password);
            alert('User registered successfully');
            registerContainer.classList.add('hidden');
            loginContainer.classList.remove('hidden');
        }
    }

    function logout() {
        currentUser = null;
        gameContainer.classList.add('hidden');
        leaderboardContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
    }

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (board[index] === '' && currentUser) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;

            if (checkWin()) {
                setTimeout(() => {
                    alert(`${currentPlayer} wins!`);
                    updateLeaderboard(currentUser);
                    resetGame();
                }, 100);
            } else if (board.every(cell => cell !== '')) {
                setTimeout(() => {
                    alert('Draw!');
                    resetGame();
                }, 100);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'Y' : 'X';
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

    function updateLeaderboard(user) {
        let scores = JSON.parse(localStorage.getItem('leaderboard')) || {};
        scores[user] = scores[user] ? scores[user] + 1 : 1;
        localStorage.setItem('leaderboard', JSON.stringify(scores));
        loadLeaderboard();
    }

    function loadLeaderboard() {
        let scores = JSON.parse(localStorage.getItem('leaderboard')) || {};
        leaderboard.innerHTML = '';
        Object.keys(scores).forEach(user => {
            let li = document.createElement('li');
            li.textContent = `${user}: ${scores[user]}`;
            leaderboard.appendChild(li);
        });
    }
});
