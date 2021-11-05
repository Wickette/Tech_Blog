const User = require("./User");
const Comment = require("./Comment");
const Thread = require("./Thread");

//User hasMany Threads
User.hasMany(Thread, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});
//Threads belongTo to User
Thread.belongsTo(User, {
    foreignKey: "user_id"
});

//User hasMany comments
User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});
//Comments belongTo User
Comment.belongsTo(User, {
    foreignKey: "user_id"
});

//Threads hasMany Comments
Thread.hasMany(Comment, {
    foreignKey: "thread_id",
    onDelete: "CASCADE"
});
//Comments belongTo Threads
Comment.belongsTo(Thread, {
    foreignKey: "thread_id"
})