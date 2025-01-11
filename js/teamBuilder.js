const players = [];
const playersList = document.getElementById("players");
const teamAList = document.getElementById("teamA");
const teamBList = document.getElementById("teamB");
const sharedPlayerList = document.getElementById("sharedPlayer");

// Add player to the list
document.getElementById("addPlayer").addEventListener("click", () => {
    const playerName = document.getElementById("playerName").value.trim();
    const playerGrade = document.getElementById("playerGrade").value;

    if (playerName && playerGrade) {
        players.push({ name: playerName, grade: playerGrade });
        updatePlayerList();
        document.getElementById("playerName").value = "";
    } else {
        alert('Please enter a player name and grade!');
    }
});

// Update the player list display
function updatePlayerList() {
    let countPlayers = 0;
    playersList.innerHTML = "";
    players.forEach((player, index) => {
        countPlayers = index + 1;
        const li = document.createElement("li");
        // li.textContent = `${player.name} (Grade: ${player.grade})`;
        li.innerHTML = `<b> ${countPlayers}. ${player.name} (Grade: ${player.grade})</b>`;
        playersList.appendChild(li);
    });
}

const divideTeamsButton = document.getElementById('divideTeams');
const loader = document.getElementById('loader');

        divideTeamsButton.addEventListener('click', () => {
            // Show the sports loader
            loader.style.display = 'flex';

            // Simulate a delay (5 seconds) for team division
            setTimeout(() => {
                // Hide the sports loader
                loader.style.display = 'none';

                // Perform team division logic here
                divideTeams();
            }, 5000);
        });

// Divide players into two balanced teams
function divideTeams() {
    if (players.length < 2) {
        alert("Please add at least two players!");
        return;
    }

    const grades = { A: [], B: [], C: [] };
    players.forEach(player => grades[player.grade].push(player));

    const teamA = [];
    const teamB = [];

    // Distribute players grade-wise
    Object.keys(grades).forEach(grade => {
        const gradePlayers = grades[grade];
        gradePlayers.forEach((player, index) => {
            if (index % 2 === 0) {
                teamA.push(player);
            } else {
                teamB.push(player);
            }
        });
    });

    console.log('Team A:', teamA);
    console.log('Team B:', teamB);

    let diff = teamA.length - teamB.length;
    if (diff > 1){
        let i = 0;
        while (diff > 1){
            if(teamA.length > teamB.length){
                teamB.push(teamA[i]);
                teamA.splice(i, 1);
            } else {
                teamA.push(teamB[i]);
                teamB.splice(i, 1);
            }
            // teamB.push(teamA[i]);
            // teamA.splice(i, 1);
            diff = teamA.length - teamB.length;
        }
    }
   
    console.log('Team A:', teamA);
    console.log('Team B:', teamB);
    // Handle odd number of players
    let sharedPlayer = null;
    if (teamA.length !== teamB.length) {
        if (teamA.length > teamB.length) {
            sharedPlayer = teamA.pop();
        } else {
            sharedPlayer = teamB.pop();
        }
    }
    //print the teams
    console.log('Team A:', teamA);
    console.log('Team B:', teamB);
    console.log('Shared Player:', sharedPlayer);

    //Swap Players
    swapPlayers(teamA, teamB);
    //print the teams
    console.log('Team A:', teamA);
    console.log('Team B:', teamB);
    console.log('Shared Player:', sharedPlayer);

    displayTeams(teamA, teamB, sharedPlayer);
}


//Swap Players
function swapPlayers(teamA, teamB) {
    const swapCount = Math.min(teamA.length, teamB.length); // Swap within the smaller team's size
    for (let i = 0; i < swapCount; i++) {
        if (Math.random() > 0.5) { // Randomly decide whether to swap
            [teamA[i], teamB[i]] = [teamB[i], teamA[i]]; // Swap players using destructuring
        }
    }
}


// Display the teams
function displayTeams(teamA, teamB, sharedPlayer) {
    teamAList.innerHTML = "";
    teamBList.innerHTML = "";
    sharedPlayerList.innerHTML = "";

    teamA.forEach(player => {
        const li = document.createElement("li");
        // li.textContent = `${player.name} (Grade: ${player.grade})`;
        li.innerHTML = `<b> &nbsp; ${player.name}</b>`;
        teamAList.appendChild(li);
    });

    teamB.forEach(player => {
        const li = document.createElement("li");
        // li.textContent = `${player.name} (Grade: ${player.grade})`;
        li.innerHTML = `<b> &nbsp; ${player.name}</b>`;
        teamBList.appendChild(li);
    });

    if (sharedPlayer) {
        const li = document.createElement("li");
        // li.textContent = `${sharedPlayer.name} (Grade: ${sharedPlayer.grade})`;
        li.innerHTML = `<b> &nbsp; ${sharedPlayer.name}</b>`;
        sharedPlayerList.appendChild(li);
    }
}

// Add event listener for resetting teams
document.getElementById('resetTeams').addEventListener('click', resetTeams);

// Function to reset teams
function resetTeams() {
    teamAList.innerHTML = '';
    teamBList.innerHTML = '';
    sharedPlayerList.innerHTML = '';
    alert('Teams have been reset!');
}

const flipTossButton = document.getElementById('flipToss');
const tossLoader = document.getElementById('tossLoader');
const tossResult = document.getElementById('tossResult');

flipTossButton.addEventListener('click', () => {
    // Show the toss loader
    tossLoader.style.display = 'flex';

    // Simulate toss flipping for 5 seconds
    setTimeout(() => {
        // Hide the toss loader
        tossLoader.style.display = 'none';

        // Generate random toss result
        // const tossOutcome = Math.random() > 0.5 ? 'Heads' : 'Tails';
        // Generate random number between 0 and 1
        let randomNumber = Math.floor(Math.random() * 2) + 1;
        console.log(randomNumber);
        if (randomNumber % 2 === 0) {
            tossOutcome = 'Heads';
        }
        else {
            tossOutcome = 'Tails';
        } 

        // Show toss result with animation
        tossResult.style.display = 'block';
        tossResult.textContent = `Result: ${tossOutcome}`;
        // Hide the result after 5 seconds
        setTimeout(() => {
            tossResult.style.display = 'none';
        }, 5000);
    }, 5000);
});
