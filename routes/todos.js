const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const Todo = require('../models/Todo');
const router = Router();

const todoValidator = [
    check('title', 'incorrect title field').isString().notEmpty(),
    check('completed', 'incorrect completed field').isBoolean(),
]

router.post("/", todoValidator, async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Incorect data',
        })
    }

    try {
        const todo = await new Todo(req.body).save();
        return res.status(201).send(todo);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        return res.send(todos)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.put("/:id", todoValidator, async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            {_id: req.params.id},
            req.body
        );
        return res.send(todo);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        return res.send(todo)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

module.exports = router