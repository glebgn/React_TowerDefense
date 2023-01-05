const userModel = require("../models/user.js");
const bcrypt = require('bcryptjs');

module.exports.registerUser = function (data) {
    return new Promise((resolve, reject) => {

        //if user nickname "undefined" dont register him
        if (data.user_nickname == "undefined") {
            reject("forbidden nickname");
        }
        //check if all mandatory fields entered
        if (data.user_nickname == "" || data.email == "" || data.password == "") {
            reject("Not all mandatory fields have been entered");
        }

        //nickname should contain only letters and digits
        try {
            if (!(/^[A-Za-z0-9]*$/.test(data.user_nickname))) {
                reject("nickname should contain only letters and digits");
            }
        }
        catch (ex) {
            reject(ex);
        }

        //check if email is valid
        try {
            var email = data.email;
            //if email less than 5 symbols 
            if (email.length < 5) {
                reject("Invalid email length");
            }
            //if email doesnt contain @ or . it is not valid
            if (!(email.includes("@")) || !(email.includes("."))) {
                reject("Invalid email");
            }
        }
        catch (ex) {
            reject(ex);
        }

        //check if passwords match
        if (data.password != data.password_verification) {
            reject("Password does not matches");
        }

        //check if avatar URL is valid if it is not empty
        if (data.user_avatar != "") {
            try {
                url = new URL(data.user_avatar);
            }
            catch (ex) {
                //reject("URL is not valid. Please, enter valid avatar URL");
                data.user_avatar = "";
            }
        }


        //make other initial values zero
        data.user_credits = 0;
        data.user_score = 0;
        data.isVerified = false;

        //assign registration date to now
        try {
            data.user_registrationdate = Date.now();
        }
        catch (ex) {
            reject(ex);
        }

        //encrypt password
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                reject("There was an error while encrypting the password");
            }

            bcrypt.hash(data.password, salt, function (err, hash) {

                if (err) {
                    reject("There was an error encrypting the password");
                }

                data.password = hash;

                const newUser = new userModel(data);

                newUser.save((err) => {
                    if (err) {
                        reject(`There was an error creating the user: ${err}`);
                    } else {
                        resolve(`User ${data.user_nickname} has been created`);
                    }
                })
            })
        })
    })
};

module.exports.loginUser = function (data) {
    return new Promise((resolve, reject) => {
        login = data.login;
        if (login == "") {
            reject("Login is empty");
        }
        if (data.password == "") {
            reject("Password is empty");
        }

        //chech if login is email or nickname
        if (login.includes("@")) {
            //if email
            userModel.findOne({ email: login }).exec().then((result) => {
                if (!(result)) {
                    reject("Unable to find user with the following email: " + login);
                }
                //verify password
                bcrypt.compare(data.password, result.password).then((res) => {
                    if (!res) {
                        reject(`Incorrect Password`);
                    }
                    resolve({
                            // Add more data as needed
                            username:result.user_nickname,
                            email:result.email,
                            score:result.user_score,
                            avatar:result.user_avatar,
                            credits:result.user_credits,
                            tower2IsOpened:result.tower2,
                            tower3IsOpened:result.tower3,
                            tower4IsOpened:result.tower4,
                            tower5IsOpened:result.tower5,
                    });
                });
            }).catch((err) => {
                reject(err);
            });
        }
        else {
            //if nickname
            userModel.findOne({ user_nickname: login }).exec().then((result) => {
                if (!(result)) {
                    reject("Unable to find user with the following nickname: " + login);
                }

                //verify password
                bcrypt.compare(data.password, result.password).then((res) => {
                    if (!res) {
                        reject(`Incorrect Password`);
                    }
                    resolve({
                            username:result.user_nickname,
                            email:result.email,
                            score:result.user_score,
                            avatar:result.user_avatar,
                            credits:result.user_credits,
                            tower2IsOpened:result.tower2,
                            tower3IsOpened:result.tower3,
                            tower4IsOpened:result.tower4,
                            tower5IsOpened:result.tower5,
                    });
                });

            }).catch((err) => {
                reject(err);
            });
        }
    });
};


module.exports.getAllUser = function () {
    return new Promise((resolve, reject) => {
        userModel.find({}).sort("-user_score").exec().then((data) => {
            if (data.length == 0) {
                reject("No users inside the system");
            }
            for (let i = 0; i < data.length; i++) {
                data[i].password = "";
                data[i].user_registrationdate = "";
            }
            resolve(data)
        }).catch((err) => {
            reject(err);
        });
    });
}

//credit get
module.exports.getUserCredit = function (data) {
    return new Promise((resolve, reject) => {
        userModel.findOne({ user_nickname: data }).exec().then((data) => {
            if (data.length == 0) {
                reject("No users inside the system");
            }
            resolve(data.user_credits)
        }).catch((err) => {
            reject(err);
        });
    });
}

//credit get
module.exports.getUserScore = function (data) {
    return new Promise((resolve, reject) => {
        userModel.findOne({ user_nickname: data }).exec().then((data) => {
            if (data.length == 0) {
                reject("No users inside the system");
            }
            resolve(data.user_score)
        }).catch((err) => {
            reject(err);
        });
    });
}
//credit post
//  json propertirs 
//      new_credits

module.exports.updateUserCredit = function (id, data) {
    return new Promise((resolve, reject) => {
        const filter = { user_nickname: id };
        const update = { user_credits: data.new_credits };
        userModel.updateOne(filter, update).exec().then((data) => {
            if (data.length == 0) {
                reject("No users inside the system");
            }
            resolve("Updated credit")
        }).catch((err) => {
            reject(err);
        });
    });
}
//score post 
//      new_score
module.exports.updateUserScore = function (id, data) {
    return new Promise((resolve, reject) => {
        console.log(id);
        console.log(data);

        if (data.new_score == 0) {
            console.log("Score is 0");
            return;
        }

        const NEW_SCORE = data.new_score;
        userModel.findOne({ user_nickname: id }).exec().then((result) => {
            if (!(result)) {
                console.log("Unable to find user with the following nickname: " + id)
                reject("Unable to find user with the following nickname: " + id);
            }
            console.log("User is found")
            let curScore = result.user_score;
            console.log("Cureent score is " + curScore)

            const numberOfCredits = NEW_SCORE / 4;

            //update credits
            userModel.findByIdAndUpdate({ _id: result._id }, { $inc: { user_credits: numberOfCredits } }).exec().then((data) => {

                console.log("Added " + numberOfCredits + " credits")
                console.log(data)

                const filterScore = { user_nickname: id };
                const updateScore = { user_score: NEW_SCORE };

                if (NEW_SCORE <= curScore) {
                    console.log("Current score >= new_score. Dont update score")
                    resolve("Current score >= new_score. Dont update score");
                    return;
                }

                // UpdateScore
                userModel.updateOne(filterScore, updateScore).exec().then((result) => {
                    console.log(result);
                    console.log("Updated score. New score is " + NEW_SCORE)
                    resolve("Updated score")
                }).catch((err) => {
                    console.log(err);
                    reject(err);
                });
            }).catch((err) => {
                console.log(err)
                reject(err);
            });
        }).catch((err) => {
            console.log(err)
            reject(err);
        });
    });
}
//tower post
module.exports.updateUserTower = function (id, towerId) {
    return new Promise((resolve, reject) => {
        let curMoney = 0;
        console.log("Tower to buy" + towerId)
        userModel.findOne({ user_nickname: id }).exec().then((result) => {
            if (!(result)) {
                reject("Unable to find user with the following nickname: " + id);
                return;
            }
            curMoney = result.user_credits;

            const tower2Price = 150;
            const tower3Price = 250;
            const tower4Price = 300;
            const tower5Price = 550;

            const filter = { user_nickname: id };
            console.log("Cur money" + curMoney)
            let update;
            let price;
            if (towerId == 2) {
                if (curMoney < tower2Price) {
                    reject("Not enough credits. Your credits: " + curMoney)
                    return;
                }
                if (result.tower2 == true) {
                    reject("You already have this tower")
                    return;
                }
                update = { tower2: true };
                price = tower2Price * -1;
            }
            if (towerId == 3) {
                if (curMoney < tower3Price) {
                    reject("Not enough credits. Your credits: " + curMoney)
                    console.log("Not enough credits. Your credits")
                    return;
                }
                if (result.tower3 == true) {
                    reject("You already have this tower")
                    console.log("You already have this tower")
                    return;
                }
                update = { tower3: true };
                price = tower3Price * -1;
            }
            if (towerId == 4) {
                if (curMoney < tower4Price) {
                    reject("Not enough credits. Your credits: " + curMoney)
                    return;
                }
                if (result.tower4 == true) {
                    reject("You already have this tower")
                    return;
                }
                update = { tower4: true };
                price = tower4Price * -1;
            }
            if (towerId == 5) {
                if (curMoney < tower5Price) {
                    reject("Not enough credits. Your credits: " + curMoney)
                    return;
                }
                if (result.tower5 == true) {
                    reject("You already have this tower")
                    return;
                }
                update = { tower5: true };
                price = tower5Price * -1;
            }
            userModel.updateOne(filter, update).exec().then((data) => {
                if (data.length == 0) {
                    reject("No users inside the system");
                }
                userModel.findByIdAndUpdate({ _id: result._id }, { $inc: { user_credits: price } }).exec().then((data) => {
                    console.log(data)

                    resolve("New tower is bought")
                }).catch((err) => {
                    console.log(err);
                    reject(err);
                });

            }).catch((err) => {
                reject(err);
            });
        }).catch((err) => {
            reject(err);
        });

    });
}
//tower get
module.exports.getUserTowers = function (id) {
    return new Promise((resolve, reject) => {

        userModel.findOne({ user_nickname: id }).exec().then((data) => {

            if (data.length == 0) {
                reject("No users inside the system");
            }
            towerList = [];
            towerList.push(data.tower2);
            towerList.push(data.tower3);
            towerList.push(data.tower4);
            towerList.push(data.tower5);
            resolve(towerList);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}
//avatar post
//avatar get

/* GET user by ID
Returns a user object
*/
module.exports.getUserByName = function (userName) {
    // ASYNC
    return new Promise((resolve, reject) => {
        // FIND
        userModel.findOne({ user_nickname: userName }).exec().then((data) => {
            // PARSE
            const currUserData = {
                // Add more data as needed
                username:data.user_nickname,
                email:data.email,
                score:data.user_score,
                avatar:data.user_avatar,
                credits:data.user_credits,
                tower2IsOpened:data.tower2,
                tower3IsOpened:data.tower3,
                tower4IsOpened:data.tower4,
                tower5IsOpened:data.tower5,
            }
            resolve(currUserData);
        }).catch((err) => { // ERROR
            console.log({err});
            reject("Error with finding User");
        });
    });
}