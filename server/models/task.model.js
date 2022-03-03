const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
    //id: {type: Number, required: true},
    task: {type: String, required: true, max: 100},
    complete: {type: Boolean, default: false},
});

module.exports = mongoose.model('task', TaskSchema);