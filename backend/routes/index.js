const express = require('express');
const controller = require('../controller/Cmain');
const router = express.Router();

// GET /api-server
router.get('/', controller.getIndex);

// GET /api-server/user
router.get('/user', controller.getUser);

//////////////////
//////////////////
//////////////////

// GET /api-server/todos
router.get('/todos', controller.getTodos);

// POST /api-server/todo
router.post('/todo', controller.addTodo);

// Patch /api-server/todo/:todoId
router.patch('/todo/:todoId', controller.patchDoneState);

// Patch /api-server/todo/:todoId
// router.patch('/todo/:todoId', controller.editTodo);

// Delete /api-server/todo/:todoId
router.delete('/todo/:todoId', controller.deleteTodo);

module.exports = router;
