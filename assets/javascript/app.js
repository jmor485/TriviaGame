$(document).ready(function () {

    $("#start-button").on("click", gameState.startTimer);

});

var gameState = {

    timeRemaining: 60,

    startTimer: function () {
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        setInterval(gameState.countdown, 1000);
        $("#start-page").hide();
        trivia.displayQuestions();
    },

    countdown: function () {
        gameState.timeRemaining--;
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        if (gameState.timeRemaining === 0) {
            gameState.stopTimer();
            $("#timer").empty();
        }
    },

    stopTimer: function () {
        clearInterval();
        trivia.checkAnswers();
    },

    showEndPage: function (numCorrect, numIncorrect, numUnanswered) {
        $("#end-page").show();
        $("#questions-box").empty();
        $("#timer").empty();
        $("#timer").hide();
        $("#correct-answers").text("Correct answers (Sweet!): " + numCorrect);
        $("#incorrect-answers").text("Incorrect answers (Not-so sweet): " + numIncorrect);
        $("#unanswered").text("Skipped questions (Sour): " + numUnanswered);
    }
}

var trivia = {

    displayQuestions: function () {
        var divContainer = $("#questions-box");
        var answerGroup = $(".form-check");
        divContainer.append('<h2>Answer the following questions:</h2>');

        for (var i = 0; i < questionBank.length; i++) {

            divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

            var answer1 = questionBank[i].answers[0];
            var answer2 = questionBank[i].answers[1];
            var answer3 = questionBank[i].answers[2];
            var answer4 = questionBank[i].answers[3];

            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer1 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer2 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer3 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer4 + '</label></div>');
        }

    
        var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
        divContainer.append(doneButton);
        $("#done-button").on("click", gameState.stopTimer);
    },


    checkAnswers: function () {
        var correctAnswer;
        var userAnswer;
        var numCorrect = 0;
        var numIncorrect = 0;
        var numUnanswered = 0;

    
        for (var i = 0; i < questionBank.length; i++) {
            correctAnswer = questionBank[i].correct;
            userAnswer = $('input[id=radio' + i + ']:checked + label').text();

            if (userAnswer === correctAnswer) {
                numCorrect++;
            } else if (userAnswer === "") {
                numUnanswered++;
            } else if (userAnswer !== correctAnswer) {
                {
                    numIncorrect++;
                }
            }
        }

        gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
}

var questionBank =
    [
        {
            question: "How long is Hubba Bubba Bubble Tape?",
            answers: ["Three Feet", "Six Feet", "Eight Feet", "Ten Feet"],
            correct: "Six Feet"
        },

        {
            question: "Complete the slogan for Now and Later candies: Share the __________.",
            answers: ["Flavor", "Taste", "Square", "Deliciousness"],
            correct: "Square"
        },

        {
            question: "How long did the extremely sour taste of Cry Baby Gum last, according to the package?",
            answers: ["20 Seconds", "30 Seconds", "40 Seconds", "60 Seconds"],
            correct: "40 Seconds"
        },

        {
            question: "What is the name of the candy made as a Wonka brand jawbreaker?",
            answers: ["Forever Jawpopper", "Super Duper Jawbreaker", "Everlasting Gobstopper", "Oompa Loompa's Tasty Treat"],
            correct: "Everlasting Gobstopper"
        },


        {
            question: "Which of these was not an original Baby Bottle Pop flavor?",
            answers: ["Cherry", "Watermelon", "Sour Blue Raspberry", "Sour Green Apple"],
            correct: "Sour Green Apple"
        },

        {
            question: "Which of these candies were not created in the 1990s?",
            answers: ["Sour Punch Straws", "Nerd Ropes", "Wonder Ball", "Sweet Tarts"],
            correct: "Sweet Tarts"
        },


    ]
