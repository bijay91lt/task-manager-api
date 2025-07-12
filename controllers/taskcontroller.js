const Task = require('../models/Task');

//Create Task
exports.createTask = async (req, res) => {
    try{
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (err){
        res.status(400).json({ error: err.message});
    }
};

//Get All Tasks
exports.getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
}

//Get One Task 
exports.getTask = async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({error: 'Not found'});
        res.json(task);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

//Update Task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if(!task) return res.status(404).json({ error: "Not found"});
        res.json(task);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

//Delete Task 
exports.deleteTask = async (req, res) => {
    try{
        const task =await Task.findByIdAndDelete(req.params.id);
        if(!task) return res.status(404).json({error: "Not founf"});
        res.json({message: "Deleted successfully"});
    } catch (err){
        res.status(400).json({error: err.message});
    }
};