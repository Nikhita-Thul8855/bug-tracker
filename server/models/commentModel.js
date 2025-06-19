const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
ticketId: {
type: mongoose.Schema.Types.ObjectId,
ref: "Ticket",
required: true,
},
content: {
type: String,
required: true,
},
author: {
type: String, // or ObjectId if linking to User
required: true,
},
createdAt: {
type: Date,
default: Date.now,
},
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;