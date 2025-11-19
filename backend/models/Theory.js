const mongoose = require('mongoose');

const TheorySchema = new mongoose.Schema({


    algo:
    {
        type: String,
        required: true,
        unique: true
    },
    title:
     { type: String, 
        default: ''
     },
    description:
     { type: String,
         default: '' 
        }, 
    timeComplexity: {
        best: { type: String, default: '' },
        average: { type: String, default: '' },
        worst: { type: String, default: '' }
    },
    spaceComplexity:
     { type: String,
         default: '' 
        },
    stable:
     { type: Boolean,
         default: false 
        },
    usecases: { type: [String], default: [] },
    pros: { type: [String], default: [] },
    cons: { type: [String], default: [] },
    example: { type: String, default: '' }, // small example or note
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Theory', TheorySchema);
