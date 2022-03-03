//const Task = require('../models/task.model');
const task_controller = require('../controllers/task.controller')
const express = require('express');
const router = express.Router();

router.get('', task_controller.task_details);
router.post('', task_controller.task_create);
/*router.get('', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    }
    catch (e){
        res.send(e);
    }
});*/

router.put('/:id', task_controller.task_update);
router.put('', task_controller.tasks_update);
router.delete('/:id', task_controller.task_delete);
router.delete('', task_controller.tasks_delete);

module.exports = router;
