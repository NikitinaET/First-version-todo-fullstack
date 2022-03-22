const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
    task: {type: String, required: true, max: 40},
    complete: {type: Boolean, default: false},
    created: {type: Date, default: Date.now},
    description: {type: String, default: 'what exactly to do', max: 100},
});

module.exports = mongoose.model('task', TaskSchema);