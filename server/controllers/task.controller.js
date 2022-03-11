const Task = require('../models/task.model');

exports.task_create = async (req, res) => {
    //console.log('create')
    try {
        const task = await new Task(req.body).save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.task_details = async (req, res) => {
    //console.log('get')
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.task_update = async (req, res) => {
    //console.log('update')
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        );
        res.send(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.task_delete = async (req, res) => {
    //console.log('delete')
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.send(task);
    } catch (error) {
        res.status(400).send(error.message );
    }
};

exports.tasks_delete = async (req, res) => {
    //console.log('delete completed')
    try {
        const task = await Task.deleteMany({ complete: true });
        res.send(task);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};

exports.tasks_update = async (req, res) => {
    console.log('all completed')
    try {
        //const task = await Task.updateMany({ complete: req.body.completed });
        const task = await Task.updateMany({$set: req.body})
        res.send(task);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};