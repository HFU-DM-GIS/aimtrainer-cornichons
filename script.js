document.addEventListener('DOMContentLoaded', function () {
    const target = document.getElementById('target');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const startButton = document.getElementById('start-button');
    const resetButton = document.getElementById('reset-button');
    let attemptNumber = 1;
    let score = 0;
    let time = 60;
    let isGameRunning = false;
    let countdownInterval;
    let targetClickTime; // targetCreationTime wäre treffender

    target.addEventListener('click', hitTarget);
    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);

    function resetGame() {
        clearInterval(countdownInterval);
        isGameRunning = false;
        startButton.disabled = false;
        score = 0;
        time = 60;
        attemptNumber = 1;
        updateScore();
        timerElement.textContent = 'Time: ' + time;

        // Lösche den Inhalt der Tabelle
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';

        // Setze den Ziel-Div zurück
        target.style.transform = 'rotate(0deg) scale(1)';
        target.style.left = '0';
        target.style.top = '0';
    }

    /*function createCornichon() {
        console.log("createCornichon");
        const gameContainer = document.querySelector('.game-container');
        const newTarget = document.createElement('div');
        newTarget.classList.add('target');
        // gebt dem neuen Target eine random id, und dann kann das Element wieder gelöscht werden (gameContainer.removeChild)

        gameContainer.appendChild(newTarget);
        
        newTarget.addEventListener('click', hitTarget);
    
        const maxX = document.querySelector('.game-container').offsetWidth - newTarget.offsetWidth;
        const maxY = document.querySelector('.game-container').offsetHeight - newTarget.offsetHeight;
    
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        newTarget.style.left = randomX + 'px';
        newTarget.style.top = randomY + 'px';
    /*
        document.querySelector('.game-container').appendChild(newTarget);
    
    }*/

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

    function hitTarget(event) { // mit dieser Variable könnt ihr ermitteln worauf geklickt wurde und damit dann zwischen mehreren Cornichons unterscheiden
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
            console.log(event.target); // gibt das HTML Element an, auf welches geklickt wurde
            score += points;
            updateScore();
            updateTable(attemptNumber, reactionTime);
            attemptNumber++; // Increment the attempt number
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

    function updateTimer() {
        time--;
        timerElement.textContent = 'Time: ' + time;

       /* if (time == 55) {
            createCornichon();
        }*/

        if (time <= 0) {
            endGame();
        }
    }

    function endGame() {
        clearInterval(countdownInterval);
        isGameRunning = false;
        startButton.disabled = false;

        // Vermeidet deutsche Kommentare im Code und die Kommentare sollten die Intention des Codes beschreiben und keine Aufforderungen
        // Hier solltest du den Code für das Überprüfen des Scores und Anzeigen einer Meldung einfügen
        if (score < 500) {
            alert('Only ' + score + '!? You SUCK!');
        } else if (score < 1000) {
            alert(score + '? I mean it`s alright');
        } else if (score < 2000) {
            alert('You`ve done well with ' + score + ' points');
        } else if (score > 4000) {
            alert(score + '! OMG MOM GET THE CAMERA');
        }

        // Füge hier den Code für das Abrufen und Anzeigen des motivierenden Zitats hinzu
        fetchMotivationalQuote();
    }

    async function fetchMotivationalQuote() {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json(); //JavaScriptObjectNotation, ein Datenformat für den Austausch von struktuellen Daten

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
        // Erstellt die Tabelle
    const tableBody = document.getElementById('table-body');

    // Erstellt eine neue Reihe
    const newRow = document.createElement('tr');

    // Erstellt und legt den Wert fest
    const attemptCell = document.createElement('td');
    attemptCell.textContent = attempt;
    newRow.appendChild(attemptCell);

    const reactionCell = document.createElement('td');
    reactionCell.textContent = reaction.toFixed(2); // Display reaction time with two decimal places
    newRow.appendChild(reactionCell);

    // Hängt eine neue Zeile an die Tabelle
    tableBody.appendChild(newRow);
    }
});
