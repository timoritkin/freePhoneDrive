const db = require('../util/database');

// Define the QuestionnaireResponse class
class QuestionnaireResponse {
    constructor(userID, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, drivingDistractionScore) {
        this.userID = userID;
        this.q1 = q1;
        this.q2 = q2;
        this.q3 = q3;
        this.q4 = q4;
        this.q5 = q5;
        this.q6 = q6;
        this.q7 = q7;
        this.q8 = q8;
        this.q9 = q9;
        this.q10 = q10;
        this.drivingDistractionScore = drivingDistractionScore;
    }

    // Method to save questionnaire response to the database
    save() {
        return db.execute(
            'INSERT INTO questionnaire_responses (UserID, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, driving_distraction_score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.userID, this.q1, this.q2, this.q3, this.q4, this.q5, this.q6, this.q7, this.q8, this.q9, this.q10, this.drivingDistractionScore]
        );
    }

    // Method to fetch all questionnaire responses for a specific user
    static fetchAllByUserID(userID) {
        return db.execute('SELECT * FROM questionnaire_responses WHERE UserID = ?', [userID]);
    }
}

module.exports = QuestionnaireResponse; 
