document.addEventListener('DOMContentLoaded', function () {
    const target = document.getElementById('target');
    const scoreElement = document.getElementById('score');
    let score = 0;

    target.addEventListener('click', hitTarget);

    function hitTarget() {
        score++;
        updateScore();
        moveTarget();
    }

    function updateScore() {
        scoreElement.textContent = 'Score: ' + score;
    }

    function moveTarget() {
        const maxX = document.querySelector('.game-container').offsetWidth - target.offsetWidth;
        const maxY = document.querySelector('.game-container').offsetHeight - target.offsetHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        target.style.left = randomX + 'px';
        target.style.top = randomY + 'px';
    }

    moveTarget(); // Initial target placement
});
