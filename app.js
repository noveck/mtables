var leaderboard = [];

function startQuiz() {
    var name = document.getElementById("name").value;
    var numRounds = parseInt(document.getElementById("numRounds").value);
    // Validate the number of rounds
    if (isNaN(numRounds) || numRounds < 1) {
        alert("Please enter a valid number of rounds (minimum 1)");
        return;
    }
    var round = 1;
    var totalTime = 0;
    var totalCorrect = 0;

    document.getElementById("quiz").style.display = "block";
    document.getElementById("start").style.display = "none";
    document.getElementById("round").innerHTML = round;

    function playRound() {

        // Generate two random numbers between 2 and 12
        var num1 = Math.floor(Math.random() * 11 + 2);
        var num2 = Math.floor(Math.random() * 11 + 2);
        document.getElementById("number1").innerHTML = num1;
        document.getElementById("number2").innerHTML = num2;
        document.getElementById("answer").value = "";

        // Start the timer
        var startTime = new Date().getTime();

        // Check the answer
        document.getElementById("submitButton").onclick = function() {
            var answer = document.getElementById("answer").value;
            // Validate the answer
            if (isNaN(answer)) {
                alert("Please enter a valid number as your answer");
                return;
            }
            var timeTaken = (new Date().getTime() - startTime) / 1000;
            totalTime += timeTaken;
            var result = "";
            if (answer == num1 * num2) {
                totalCorrect++;
                result = "Correct! Time taken: " + timeTaken + " seconds.";
                document.getElementById("result").classList.remove("incorrect");
                document.getElementById("result").classList.add("correct");
            } else {
                result = "Incorrect. The correct answer was: " + num1 * num2 + ". Time taken: " + timeTaken + " seconds + 10 seconds penalty.";
                totalTime += 10;
                document.getElementById("result").classList.remove("correct");
                document.getElementById("result").classList.add("incorrect");
            }
            document.getElementById("result").innerHTML = result;
            round++;
            document.getElementById("round").innerHTML = round;
            document.getElementById("progress-bar").style.width = ((round - 1) / numRounds * 100) + "%";
            if (round <= numRounds) {
                playRound();
            } else {
                result = "Congrats, " + name + "! You have completed all " + numRounds + " rounds. Total time: " + totalTime.toFixed(2) + " seconds. Final Score: " + (totalCorrect / numRounds * 100).toFixed(2) + "%.";
                document.getElementById("leaderboard").style.display = "block";
                document.getElementById("result").classList.remove("incorrect");
                document.getElementById("result").classList.remove("correct");
                document.getElementById("result").innerHTML = result;
                document.getElementById("submitButton").style.display = "none";
                document.getElementById("progress-bar").style.width = "100%";
                leaderboard.push({
                    name: name,
                    numRounds: numRounds,
                    totalTime: totalTime.toFixed(2),
                    totalCorrect: totalCorrect,
                    date: new Date().toLocaleString()
                });
                leaderboard.sort(function(a, b) {
                    return b.score - a.score;
                });
                var leaderboardHTML = "<h2>Score Details</h2><table><tr><th>Rank</th><th>Name</th><th>Rounds</h><th>Time (secs)</th><th>Score</th><th>Date</th></tr>";
                for (var i = 0; i < leaderboard.length; i++) {
                    leaderboardHTML += "<tr><td>" + (i + 1) + "</td><td>" + leaderboard[i].name + "</td><td>" + leaderboard[i].numRounds + "</td><td>" + leaderboard[i].totalTime + "</td><td>" + (leaderboard[i].totalCorrect / leaderboard[i].numRounds * 100).toFixed(2) + "%</td><td>" + leaderboard[i].date + "</td></tr>";
                }
                leaderboardHTML += "</table>";
                leaderboardHTML += "<br><img width=\"8%\" src=\"light-bulb-svgrepo-com.svg\" />"
                document.getElementById("leaderboard").innerHTML = leaderboardHTML;

                //
                document.getElementById("playAgainButton").style.display = "inline-block";
                document.getElementById("playAgainButton").onclick = function() {
                    document.getElementById("quiz").style.display = "none";
                    document.getElementById("leaderboard").innerHTML = "";
                    document.getElementById("playAgainButton").style.display = "none";
                    document.getElementById("start").style.display = "block";
                    document.getElementById("result").classList.remove("incorrect");
                    document.getElementById("result").classList.remove("correct");
                    document.getElementById("result").innerHTML = "";
                    document.getElementById("leaderboard").style.display = "none";
                    document.getElementById("submitButton").style.display = "inline-block";
                    document.getElementById("progress-bar").style.width = "0%";
                };
                //
            }
        };
    }
    playRound();
}