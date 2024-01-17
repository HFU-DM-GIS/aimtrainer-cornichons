document.addEventListener('DOMContentLoaded', function () {
    const target = document.getElementById('target');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const startButton = document.getElementById('start-button');
    const resetButton = document.getElementById('reset-button');
    const tableBody = document.getElementById('table-body');
    const difficultySelect = document.getElementById('difficulty');
    const applyDifficultyButton = document.getElementById('apply-difficulty');
    const highScoreElement = document.getElementById('high-score');

    let attemptNumber = 1;
    let score = 0;
    let time = 60;
    let points = 0;
    let size;
    let isGameRunning = false;
    let countdownInterval;
    let startReactionTime;
    let highScore = localStorage.getItem('highScore') || 0; // Removes the extra declaration

    target.addEventListener('click', hitTarget);
    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);
    applyDifficultyButton.addEventListener('click', applyDifficulty);

     function startGame() {
        if (!isGameRunning) {
            score = 0;
            time = 60;
            updateScore();  
            startButton.disabled = true;
            isGameRunning = true;
            countdownInterval = setInterval(updateTimer, 1000);
            rotateAndMoveTarget();
        }
    }

    function resetGame() {
        clearInterval(countdownInterval);
        isGameRunning = false;
        startButton.disabled = false;
        score = 0;
        time = 60;
        attemptNumber = 1;
        timerElement.textContent = 'Time: ' + time;

        // Clears the table content
        tableBody.innerHTML = '';

        // Sets the target to its original position
        target.style.transform = 'rotate(0deg) scale(1)';
        target.style.left = '0';
        target.style.top = '0';
    }

    function hitTarget() {
        if (isGameRunning) {
            const endReactionTime = new Date().getTime();
            const reactionTime = (endReactionTime - startReactionTime) / 1000; // subtracts the saved the times to get the time inbetweem hits 

            if (reactionTime < 0.5) {
                points = 100;
            } else if (reactionTime >= 0.5 && reactionTime < 1) {
                points = 50;
            } else if (reactionTime >= 1 && reactionTime < 1.5) {
                points = 25;
            }

            score += points;
            updateScore();
            updateTable(attemptNumber, reactionTime);
            attemptNumber++; 
            rotateAndMoveTarget();
        }
    }

    function updateScore() {
        scoreElement.textContent = 'Score: ' + score;
        updateHighScore();  // Calls the function to update and display the high score
    }

    function updateHighScore() {
        
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore); // Updates localStorage with the new high score
        }
        highScoreElement.textContent = 'High Score: ' + highScore;
    }

    function rotateAndMoveTarget() {
        const rotation = Math.floor(Math.random() * 360); // Random rotation between 0 and 360 degrees
        
        if (difficultySelect.value == 'medium') {
            size = Math.floor(Math.random() * 100) + 50;
        } else if(difficultySelect.value == 'hard') {
            size = Math.floor(Math.random() * 50) + 50;
        } else {
            size = Math.floor(Math.random() * 150) + 100;
        }

        target.style.transform = 'rotate(' + rotation + 'deg) scale(' + size / 100 + ')';

        const maxX = document.querySelector('.game-container').offsetWidth - target.offsetWidth;
        const maxY = document.querySelector('.game-container').offsetHeight - target.offsetHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        target.style.left = randomX + 'px';
        target.style.top = randomY + 'px';

        startReactionTime = new Date().getTime(); // Sets the time when the target was moved
    }

    function updateTimer() {
        time--;
        timerElement.textContent = 'Time: ' + time;


        if (time <= 0) {
            endGame();
        }
    }

    function endGame() {
        clearInterval(countdownInterval);
        isGameRunning = false;
        startButton.disabled = false;

        if (score < 500) {
            alert('Only ' + score + '!? You SUCK!');
        } else if (score < 1000) {
            alert(score + '? I mean it`s alright like');
        } else if (score < 2000) {
            alert('You`ve done well with ' + score + ' points');
        } else if (score > 4000) {
            alert(score + '! OMG MOM GET THE CAMERA');
        }

        fetchMotivationalQuote();
    }

    async function fetchMotivationalQuote() {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();

            if (response.ok) {
                showMotivationalQuote(data.content, data.author);
            } else {
                console.error('Failed to fetch motivational quote:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching motivational quote:', error.message);
        }
    }

    function showMotivationalQuote(content, author) {
        const quoteMessage = `Congratulations! Your final score is ${score}. Keep aiming high!\n\n"${content}" - ${author}`;
        alert(quoteMessage);
    }

    function updateTable(attempt, reaction) {
        // Gets the table
        const tableBody = document.getElementById('table-body');

        // Creates a new row
        const newRow = document.createElement('tr');

        // Creates and sets the value
        const attemptCell = document.createElement('td');
        attemptCell.textContent = attempt;
        newRow.appendChild(attemptCell);

        const reactionCell = document.createElement('td');
        reactionCell.textContent = reaction.toFixed(2); // Display reaction time with two decimal places
        newRow.appendChild(reactionCell);

        tableBody.appendChild(newRow);
    }

    function applyDifficulty() {

        if (!isGameRunning) {
        const selectedDifficulty = difficultySelect.value;

        // Can switch between 3 difficulties
        switch (selectedDifficulty) {
            case 'easy':
                break;

            case 'medium':
                break;

            case 'hard':
                break;
        }
        alert(`Difficulty set to ${selectedDifficulty}`);
    } else {
        alert('Cannot change difficulty while the game is running. Please stop the game first.');
    }
    }
}

);
