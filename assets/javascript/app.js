$(document).ready(function () {
    // Variables

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var counter = 0;
    var timeRemaining = 16;
    var intervalID;
    var indexQandA = 0; //index to load a different question each round without the game reset or screen refresh
    var answered = false; //variable to stop the timer if user has clicked an answer
    var correct;
    var triviaGame = [{
        question: "How did Daenerys Targeryen eventually hatch her dragon eggs?",
        answer: ["In a lightning storm", "In a funeral pyre", "In a fireplace", "In a frozen cave"],
        correct: "1",
        image: ("assets/images/danerys.jpeg")
    }, {
        question: "The phrase, 'Valar Morghulis' translates to which of the following?",
        answer: ["All men must die", "All men must serve", "All men must ride", "All men must cry"],
        correct: "0",
        image: ("assets/images/valar-morghulis.jpeg")
    }, {
        question: "What other substance, besides dragonglass, is capable of defeating White Walkers?",
        answer: ["Weirwood", "Wildfire", "Valyrian Steel", "Snowballs"],
        correct: "2",
        image: ("assets/images/white-walker.jpeg")
    }, {
        question: "What is the name of Ned Stark's greatsword?",
        answer: ["Heartsbane", "Widow's Wail", "Oathkeeper", "Ice"],
        correct: "3",
        image: ("assets/images/ned-stark-ice.jpeg")
    }, {
        question: "What is the name of Jon snow's direwolf? ",
        answer: ["Nymeria", "Ghost", "Summer", "Carl"],
        correct: "1",
        image: ("assets/images/ghost-got.jpeg")
    }, {
        question: "What are the Stark family words?",
        answer: ["Ours is the fury", "Growing Strong", "Winter is Coming", "Hear Me Roar"],
        correct: "2",
        image: ("assets/images/stark-family-crest.jpeg")
    }, {

    }];

    // Functions


    function startGame() {
        console.log("game has begun");
        $('.start-button').remove();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        loadQandA();
    }

    function loadQandA() {
        answered = false; 
        timeRemaining = 16;
        intervalID = setInterval(timer, 1000);
        if (answered === false) {
            timer();
        }
        correct = triviaGame[indexQandA].correct;
        var question = triviaGame[indexQandA].question;
        $('.question').html(question);
        for (var i = 0; i < 4; i++) {
            var answer = triviaGame[indexQandA].answer[i];
            $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
        }

        $("h4").click(function () {
            var id = $(this).attr('id');
            if (id === correct) {
                answered = true; 
                $('.question').text("THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                correctAnswer();
            } else {
                answered = true; 
                $('.question').text("YOU CHOSE: " + triviaGame[indexQandA].answer[id] + ".....HOWEVER THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                incorrectAnswer();
            }
        });
    }

    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            $('.question').text("THE CORRECT ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
            unAnswered();
        } else if (answered === true) {
            clearInterval(intervalID);
        } else {
            timeRemaining--;
            $('.timeRemaining').text('YOU HAVE ' + timeRemaining + ' SECONDS TO CHOOSE');
        }
    }

    function correctAnswer() {
        correctAnswers++;
        $('.timeRemaining').text("YOU HAVE ANSWERED CORRECTLY!").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function incorrectAnswer() {
        incorrectAnswers++;
        $('.timeRemaining').text("YOU HAVE ANSWERED INCORRECTLY!").css({
            'color': '#3D414F'
        });
        resetRound();

    }

    function unAnswered() {
        unansweredQuestions++;
        $('.timeRemaining').text("YOU FAILED TO CHOOSE AN ANSWER").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function resetRound() {
        $('.answersAll').remove();
        $('.answers').append('<img class=answerImage width="150" height="150" src="' + triviaGame[indexQandA].image + ' ">'); // adds answer image
        indexQandA++; // increments index which will load next question when loadQandA() is called again
        if (indexQandA < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
                $('.answerImage').remove();
            }, 5000); // removes answer image from previous round
        } else {
            setTimeout(function () {
                $('.question').remove();
                $('.timeRemaining').remove();
                $('.answerImage').remove();
                $('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
                setTimeout(function () {
                    location.reload();
                }, 7000);
            }, 5000);
        }

}

    $('.startButton').on("click", function () {
        $('.startButton');
        startGame();

    });
//Attempting to give user their total score and then reset the game...was trying to run this above, but wasn't doing what I had hoped. 
    //function () {
        //$(".target-number").html(targetNumber);
        //$(".counter").html("<p>Wins: " + correctAnswers + "</p>" + "<p>Losses: " + incorrectAnswers + "</p>");


});

