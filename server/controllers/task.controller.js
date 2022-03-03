const Task = require('../models/task.model');

/*exports.task_create = function (req, res) {
    console.log(res);
   let task = new Task({
       task: req.body.task,
       complete: req.body.complete,
   });
   task.save(function(err) {
       if (err) {
           console.log(err);
       }
       res.send(task);
   });
};*/
exports.task_create = async (req, res) => {
    try {
        const task = await new Task(req.body).save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

/*exports.task_details = function (req, res) {
    Task.find(req.params, function (err, task) {
        if (err) console.log(err);
        res.send(task);
    });
};*/

exports.task_details = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/*exports.task_update = function (req, res) {
    Task.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, task) {
        if (err) console.log(err);
        res.send(task);
    });
};*/

exports.task_update = async (req, res) => {
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

/*exports.task_delete = function (req, res) {
    Task.findByIdAndDelete(req.params.id, function (err, task) {
        if (err) console.log(err);
        res.send(task);
    })
};*/

exports.task_delete = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.send(task);
    } catch (error) {
        res.status(400).send(error.message );
    }
};

/*exports.tasks_delete = function (req, res) {
    Task.deleteMany({ complete: true }, function (err, task) {
        if (err) console.log(err);
        res.send(task);
    });
};*/

exports.tasks_delete = async (req, res) => {
    try {
        const task = await Task.deleteMany({ complete: true });
        res.send(task);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};

/*exports.tasks_update = function (req, res) {
    Task.updateMany({ complete: req.body.completed }, function (err, task) {
        if (err) console.log(err);
        res.send(task);
    });
};*/

exports.tasks_update = async (req, res) => {
    try {
        const task = await Task.updateMany({ complete: req.body.completed });
        res.send(task);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};