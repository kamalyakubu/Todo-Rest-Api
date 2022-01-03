//imports
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const todoController = require('./controllers/todoController');
const PORT = process.env.PORT || 3000;

//routes api
app.use(express.json());
app.get('/', function(req, res){
  res.status(200).json({message: 'Welcome to our todo api'});
});
app.get('/todos', todoController.getAllTodos);
app.post('/todos', todoController.addTodo);
app.patch('/todos/:todoId', todoController.updateTodoById);
app.delete('/todos/:todoId', todoController.deleteTodoById);
app.get('/todos/:todoId', todoController.getTodoById);

//listener
app.listen(PORT, function(){
  console.log('Server has started to run');
  mongoose.connect(process.env.DB_URL)
  .then(function(){
    console.log('DB is connected');
  })
  .catch(function(error){
    console.log('DB is not connected: ', error.message);
  })
});