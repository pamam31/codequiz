
const highscoreList = document.getElementById('highscores');
const clearBtn = document.getElementById('clear');

let highscores = [];


const newScoreJSON = localStorage.getItem('newScore');

if (newScoreJSON) {
    try {
        const newScores = JSON.parse(newScoreJSON);
        highscores.push(...newScores);
    } catch (error) {
        console.error('Error parsing newScore JSON:', error);
    }
}

function createHighScores() {
    highscoreList.innerHTML = '';

    const sortedScores = [...highscores].sort((a, b) => b.score - a.score);

    sortedScores.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${score.name} - ${score.score}`;
        highscoreList.appendChild(listItem);
    });
}


function clearHighScores() {
    localStorage.removeItem('newScore');
    highscores = [];
    createHighScores();
}


clearBtn.addEventListener('click', clearHighScores);

window.addEventListener('load', createHighScores);
