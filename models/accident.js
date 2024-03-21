const db = require('../util/database');

class Accident {
    constructor( severity,damage, location, phoneCause, accidentDate, accidentDescription, userID) {
        this.severity = severity
        this.damage = damage
        this.location = location;
        this.phoneCause = phoneCause;
        this.accidentDate = accidentDate;
        this.accidentDescription = accidentDescription;
        this.userID = userID
    }

    static fetchAll(userID) {
        return db.execute('SELECT * FROM accidents WHERE UserID = ?', [userID]);
    }

    saveAccident() {
        return db.execute(
            'INSERT INTO accidents (userID, severity, damage, location, phoneCause, accidentDate, accidentDescription) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this.userID, this.severity, this.damage, this.location, this.phoneCause, this.accidentDate, this.accidentDescription]
        );
    }
    
}

module.exports = Accident; 