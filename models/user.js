const db = require('../util/database');

module.exports = class User {
    constructor(UserID, FirstName, LastName, birthDate, Email, PhoneNumber, password, Street, City, Country, Gender) {
        this.UserID = UserID;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.birthDate = birthDate; 
        this.Email = Email;
        this.PhoneNumber = PhoneNumber;
        this.password = password;
        this.Street = Street;
        this.City = City;
        this.Country = Country;
        this.Gender = Gender;
    }
    static getByUserIDandPass(UserID,password){
        return db.execute('select * from users where UserID=? and password=?',[UserID,password]);
    }
    save() {
        return db.execute('INSERT INTO users (`UserID`,`FirstName`,`LastName`,`birthDate`,`Email`,`PhoneNumber`,`password`,`Street`,`City`,`Country`,`Gender`) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [this.UserID, this.FirstName, this.LastName, this.birthDate, this.Email, this.PhoneNumber, this.password, this.Street, this.City, this.Country, this.Gender]);
    }
    static getByUserID(UserID){
        return db.execute('select * from users where UserID=?',[UserID]);
    }
};

