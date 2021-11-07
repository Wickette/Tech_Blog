const User = require("./User");
const Comment = require("./Comment");
const Thread = require("./Thread");

//Thread hasMany Comment
Thread.hasMany(Comment, {
    foreignKey: "thread_id"
});

// Comment belongTo Thread
Comment.belongsTo(Thread, {
    foreignKey: "thread_id"
});

//User hasMany comments
// User.hasMany(Comment, {
//     foreignKey: "user_id"
// });

//Comments belongTo User
Comment.belongsTo(User, {
    foreignKey: "user_id"
});

//User hasMany Threads
// User.hasMany(Thread, {
//     foreignKey: "user_id"
// });
//Threads belongTo to User
Thread.belongsTo(User, {
    foreignKey: "user_id"
});

module.exports = {  User, Thread, Comment };