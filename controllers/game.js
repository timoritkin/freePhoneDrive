const GameModel = require('../models/game');

exports.getGame = (req, res, next) => {
    // Check if user is logged in
    if (!req.session.isLoggedIn) {
        // If not logged in, render the error page with the error message
        return res.status(401).render('error', { error: "Unauthorized: You need to be logged in to play the game!" });
    }
    else {
        res.render('game');
    }
}

exports.saveGame = (req, res, next) => {
    const userID = req.session.userId;

    const solution = req.body.solution;
    const guesses = req.body.guesses;
    const gameTime = req.body.gameTime;
    const score = req.body.score;
    const gameResult = req.body.gameResult;
    const totalGuesses = req.body.totalGuesses;
    const prize = req.body.prize;

    const game = new GameModel(solution, guesses, gameTime, score, gameResult, totalGuesses, prize, userID);

    game.save()
        .then(() => {
            console.log("Game data saved successfully.");
            res.redirect('/game');
        })
        .catch(err => {
            return res.status(401).render('error', { error: "Unauthorized: You need to be logged in to play this game" });
        });
};

exports.getGameResult = (req, res, next) => {



    const userID = req.session.userId;

    // Fetch questionnaire responses from the database for the logged-in user
    GameModel.getByUserID(userID)
        .then(gameResults => {
            // Render the view with the fetched gameResults responses
            res.render('gameResult', { gameResults: gameResults });
        })
        .catch(err => {
            console.error('Error fetching game results', err);
            res.status(500).render('error', { error: "Error occurred while fetching game results." });
        });

}