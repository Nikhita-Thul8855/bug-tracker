const express = require("express");
const {
createComment,
getCommentsByTicketId,
} = require("../controllers/commentController");

const router = express.Router();

// POST /api/comments - Create new comment
router.post("/", createComment);

// GET /api/comments/ticket/:ticketId - Fetch all comments for a ticket
router.get("/ticket/:ticketId", getCommentsByTicketId);

module.exports = router;