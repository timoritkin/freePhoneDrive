const QuestionnaireResponse = require('../models/questionnaireResponse');



exports.getQuestionnaire = (req, res, next) => {
    // Check if user is logged in
    if (!req.session.isLoggedIn) {
        // If not logged in, render the error page with the error message
        return res.status(401).render('error', { error: "Unauthorized: You need to be logged in to submit the questionnaire." });
    }
    else{
        res.render('questionnaire');
    }

}

exports.showHomePage = (req, res, next) => {


    res.render('index');
}


// Function to handle questionnaire submission
exports.submitQuestionnaire = (req, res, next) => {


    // Retrieve questionnaire answers from the request body
    const answers = req.body;

    // Calculate the driving distraction score
    const drivingDistractionScore = calculateDrivingDistractionScore(answers);

    // Store the score in the session or any other appropriate place for later retrieval
    req.session.drivingDistractionScore = drivingDistractionScore;

    // Save questionnaire responses and driving distraction score to the database
    const userID = req.session.userId;

    // Create a new QuestionnaireResponse object with the questionnaire data and driving distraction score
    const q1 = answers.q1;
    const q2 = answers.q2;
    const q3 = answers.q3;
    const q4 = answers.q4;
    const q5 = answers.q5;
    const q6 = answers.q6;
    const q7 = answers.q7;
    const q8 = answers.q8;
    const q9 = answers.q9;
    const q10 = answers.q10;

    const questionnaireResponse = new QuestionnaireResponse(userID, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, drivingDistractionScore)

    console.log(questionnaireResponse)
    // Save the questionnaire response to the database
    questionnaireResponse.save()
        .then(() => {
            // Redirect the user to the car accident form
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            return res.status(401).render('error', { error: "Error occurred while saving questionnaire data." });

        });
};



exports.getQuestionnaireResult = (req, res, next) => {
    // Check if user is logged in
    if (!req.session.isLoggedIn) {
        // If not logged in, render the error page with the error message
        return res.status(401).render('error', { error: "Unauthorized: You need to be logged in to see your questionnaire Result." });
    }

    const userID = req.session.userId;

    // Fetch questionnaire responses from the database for the logged-in user
    QuestionnaireResponse.fetchAllByUserID(userID)
        .then(questionnaireResponses => {
            // Render the view with the fetched questionnaire responses
            res.render('questionnaire-result', { questionnaireResponses: questionnaireResponses });
        })
        .catch(err => {
            console.error('Error fetching questionnaire responses:', err);
            res.status(500).render('error', { error: "Error occurred while fetching questionnaire responses." });
        });
};


// Function to calculate the driving distraction score
function calculateDrivingDistractionScore(answers) {
    let totalScore = 0;
    const numQuestions = Object.keys(answers).length;

    // Loop through each answer and calculate the total score
    for (let i = 1; i <= numQuestions; i++) {
        const answer = parseInt(answers['q' + i]);
        totalScore += answer;
    }

    // Calculate the average score
    const averageScore = totalScore / numQuestions;
    return averageScore;
}