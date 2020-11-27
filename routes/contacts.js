const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get contacts for user
// @access  Private
router.get('/', (request, response) => {
    response.send('get a logged in users contacts');
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Public
router.post('/', (request, response) => {
    response.send('Add new contact');
});

// @route   PUT api/contacts/:id
// @desc    Update existing contact
// @access  Private
router.put('/:id', (request, response) => {
    response.send('Update contact');
});

// @route   DELETE api/contacts/:id
// @desc    Delete existing contact
// @access  Private
router.delete('/:id', (request, response) => {
    response.send('Delete contact');
});
module.exports = router;