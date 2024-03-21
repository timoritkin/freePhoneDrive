const db = require('../util/database');

module.exports = class GameModel {
    constructor(solution, guesses, gameTime, score, gameResult, totalGuesses,prize, userID) {
        this.userID = userID;
        this.solution = solution;
        this.guesses = guesses;
        this.gameTime = gameTime;
        this.score = score;
        this.gameResult = gameResult;
        this.totalGuesses = totalGuesses;
        this.prize = prize;
    }

    save() {
        return db.execute(
            'INSERT INTO game (UserID, solution, guesses, gameTime, score, gameResult, totalGuesses,prize) VALUES (?, ?, ?, ?,?, ?, ?, ?)',
            [this.userID, this.solution, this.guesses, this.gameTime, this.score, this.gameResult, this.totalGuesses,this.prize]
        ).catch(err => {
            console.error('Error occurred while saving game:', err);
            throw err; 
        });
    }

    static getByUserID(userID) {
        return db.execute('SELECT * FROM game WHERE UserID = ?', [userID]);
    }
};

