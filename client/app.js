let matchId;

function createMatch() {
    const team1 = document.getElementById('team1').value;
    const team2 = document.getElementById('team2').value;

    fetch('/api/matches', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team1, team2 }),
    })
    .then(response => response.json())
    .then(data => {
        matchId = data.id;
        updateScoreboard();
    });
}

function updateScore() {
    const runs = document.getElementById('runs').value;
    const wickets = document.getElementById('wickets').value;
    const overs = document.getElementById('overs').value;

    fetch(`/api/matches/${matchId}/score`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ runs, wickets, overs }),
    })
    .then(response => response.json())
    .then(data => {
        updateScoreboard();
    });
}

function updateScoreboard() {
    fetch(`/api/matches/${matchId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('score').innerText = `Score: ${data.runs}/${data.wickets} in ${data.overs} overs`;
    });
}
