const Accident = require('../models/accident'); // Import the Accident class

exports.getCarAccident = (req, res, next) => {
    // Check if user is logged in
    if (!req.session.isLoggedIn) {
        // If not logged in, render the error page with the error message
        return res.status(401).render('error', { error: "Unauthorized: You need to be logged in to submit the accident form." });
    }
    else{
        res.render('car-accident');
    }

}



exports.submitCarAccident = (req, res, next) => {


    // Retrieve UserID from the session
    const userID = req.session.userId;
    const severity = req.body.severity;
    const damage = req.body.damage;
    const location = req.body.location;
    const phoneCause = req.body.phoneCause;
    const accidentDate = req.body.accidentDate;
    const accidentDescription = req.body.accidentDescription;

    // Create a new Accident object with the form data
    const accident = new Accident(severity, damage, location, phoneCause, accidentDate, accidentDescription, userID);

    // Save the accident data to the database
    accident.saveAccident()
        .then(() => {
            // On successful save, you can redirect or render a confirmation page
            console.log("confirmed")
            res.redirect('/');

        })
        .catch(err => {
            console.log(err);
            return res.status(401).render('error', { error: "Error occurred while saving data." });

        });
};



exports.getAccidentsData = (req, res, next) => {
    // Check if user is logged in
    if (!req.session.isLoggedIn) {
        // If not logged in, render the error page with the error message
        return res.status(401).render('error', { error: "Unauthorized: You need to be logged in to see your form's history." });
    }

    const userID = req.session.userId;

    // Fetch accident data from the database
    Accident.fetchAll(userID)
        .then(accidents => {
            console.log('Fetched accidents:', accidents);
            // Render a view with the fetched accident data
            res.render('car-accident-data', { accidents: accidents });
        })
        .catch(err => {
            console.log(err);
            return res.status(401).render('error', { error: "Error occurred while fetching data." });

        });
};
