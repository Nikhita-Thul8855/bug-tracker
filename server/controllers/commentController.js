const Comment = require("../models/commentModel");

// Create a comment
exports.createComment = async (req, res) => {
try {
const { ticketId, content, author } = req.body;

pgsql
Copy
Edit
const comment = new Comment({
  ticketId,
  content,
  author,
  createdAt: new Date(),
});

await comment.save();
res.status(201).json(comment);
} catch (error) {
console.error("❌ Error creating comment:", error);
res.status(500).json({ message: "Failed to create comment" });
}
};

// Get comments for a ticket
exports.getCommentsByTicketId = async (req, res) => {
try {
const { ticketId } = req.params;

csharp
Copy
Edit
const comments = await Comment.find({ ticketId }).sort({ createdAt: -1 });
res.json(comments);
} catch (error) {
console.error("❌ Error fetching comments:", error);
res.status(500).json({ message: "Failed to fetch comments" });
}
};