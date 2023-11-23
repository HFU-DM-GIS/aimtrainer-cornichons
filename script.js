document.addEventListener('DOMContentLoaded', function () {
    const target = document.getElementById('target');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const startButton = document.getElementById('start-button');
    let score = 0;
    let time = 60;
    let isGameRunning = false;
    let countdownInterval;
    let targetClickTime;

    target.addEventListener('click', hitTarget);
    startButton.addEventListener('click', startGame);

    function hitTarget() {
        if (isGameRunning) {
            const clickTime = new Date().getTime();
            const reactionTime = (clickTime - targetClickTime) / 1000; // in Sekunden

            let points = 0;

            if (reactionTime < 0.5) {
                points = 100;
            } else if (reactionTime >= 0.5 && reactionTime < 1) {
                points = 50;
            } else if (reactionTime >= 1 && reactionTime < 1.5) {
                points = 25;
            }

            score += points;
            updateScore();
            rotateAndMoveTarget();
        }
    }

    function updateScore() {
        scoreElement.textContent = 'Score: ' + score;
    }

    function rotateAndMoveTarget() {
        const rotation = Math.floor(Math.random() * 360); // Zufällige Drehung zwischen 0 und 360 Grad
        const size = Math.floor(Math.random() * 150) + 100; // Zufällige Größe zwischen 100% und 250%

        target.style.transform = 'rotate(' + rotation + 'deg) scale(' + size / 100 + ')';

        moveTarget();
    }

    function moveTarget() {
        const maxX = document.querySelector('.game-container').offsetWidth - target.offsetWidth;
        const maxY = document.querySelector('.game-container').offsetHeight - target.offsetHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        target.style.left = randomX + 'px';
        target.style.top = randomY + 'px';

        targetClickTime = new Date().getTime(); // Setze die Zeit, wenn das Ziel bewegt wurde
    }

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
        if (score < 20)
        alert('Only ' + score + '!? You SUCK!');
        else
        if(score < 40)
        alert(score + '? I mean it`s alright')
        else
        if(score < 60)
        alert('You`ve done well with ' + points + ' points')
        else(score > 60)
        alert(points + '! OMG MOM GET THE CAMERA')
    }
});
