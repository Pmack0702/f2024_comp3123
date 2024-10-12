const express = require('express');
const noteModel = require('../models/NotesModel');
const app = express.Router();

app.use(express.json());


//http://mongoosejs.com/docs/api.html#document_Document-save
app.post('/notes', async (req, res) => {
    // Validate request
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note title and description cannot be empty"
        });
    }

    // Destructure values from request body
    const { noteTitle, noteDescription, priority, dateAdded, dateUpdated } = req.body;

    try {
        // Create a new note with the destructured values
        const newNote = new noteModel({
            noteTitle,
            noteDescription,
            priority, // This can be HIGH, MEDIUM, or LOW
            dateAdded: dateAdded || Date.now(),  // Default to the current date if not provided
            dateUpdated: dateUpdated || Date.now() // Default to the current date if not provided
        });

        // Save the new note to the database
        const noteCreated = await newNote.save();

        // Send success response
        res.status(200).json({
            message: "Note Created Successfully",
            note: noteCreated  // Send back the created note
        });

    } catch (error) {
        // Handle errors during the save process
        res.status(400).json({
            message: 'Error creating note',
            error: error.message
        });
    }
});


//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', async (req, res) => {
    // Validate request
    try {
        const notes = await noteModel.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving notes', error });
    }

});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', async (req, res) => {
    // Validate request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Note content can not be empty"
    //     });
    // }

    // Get the notes id from the parameter
    const {noteId} = req.params;

    try {
        const notes = await noteModel.findById(noteId);
        if(notes){
            res.status(200).json(notes)
        }else{
            res.status(404).json({message: `Employee not found ${noteId}` })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message: 'Error', error})
    }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', async (req, res) => {
    // Validate request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Note content can not be empty"
    //     });
    // }

    const {noteId} = req.params; // Get the note Id from the parameter
    const noteupd = req.body; // Destruct the data from the body

    try {

        const updatednote = await noteModel.findByIdAndUpdate(noteId, noteupd, {new: true});
        if(updatednote){
            res.status(201).json(updatednote)
        }else{
            res.status(404).json({message: 'Employee Not Found'})
        }
        
    } catch (error) {
        res.status(400).json({message: 'Error', error})
    }
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', async (req, res) => {
    // Validate request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Note content can not be empty"
    //     });
    // }

    const {noteId} = req.params;

    try {
        const deletedNote = await noteModel.findByIdAndRemove(noteId);
        if(deletedNote){
            res.status(204).json({ message: 'Employee deleted successfully' }); // Return status 204 (No Content) if the deletion is successful
        }else{
            res.status(404).json({message: 'Employee Not Found'});
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error deleting employee', error }); 

    }
});

module.exports = app;

