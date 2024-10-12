const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    noteTitle: {type: String,
            required: true,
            unique: true
        },
    noteDescription: {type: String},
    priority: {
        type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW'], 
        required: true  
    },

    dateAdded: {type: Date, 
        default: Date.now
    },
    dateUpdated: {type: Date, 
        default: Date.now
    }
})


// Middleware to update `dateUpdated` before saving the document
noteSchema.pre('save', function (next) {
    this.dateUpdated = Date.now();
    next();
});

module.exports = mongoose.model('Note', noteSchema);