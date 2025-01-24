const { Todo, sequelize } = require('../models');

exports.getIndex = (req, res) => {
  res.send('response from api-server : [GET /api-server]');
};

exports.getUser = (req, res) => {
  res.send('response from api-server : [GET /api-server/user]');
};

///// todo API 작성 /////
// 전체 조회 GET /api-server/todos
exports.getTodos = async (req, res) => {
  try {
    const todoAll = await Todo.findAll();
    console.log(todoAll);
    res.send(todoAll);
  } catch (err) {
    console.log('server err', err);
    res.status(500).send('sever error');
  }
};

// todo 하나 추가 /api-server/todo
// req.body 사용 예정
exports.addTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await Todo.create({ text });
    res.send({ isSuccess: true });
  } catch (err) {
    console.log('server err', err);
    res.status(500).send('sever error');
  }
};

// todo.done 값 변경
// req.params 로 id 받을 예정
exports.patchDoneState = async (req, res) => {
  try {
    const { todoId } = req.params;

    const [isUpdated] = await Todo.update(
      { done: sequelize.literal('Not done') },
      { where: { id: todoId } }
    );
    // [0], [1]
    Boolean(isUpdated)
      ? res.send({ isSuccess: true })
      : res.send({ isSuccess: false }); // 잘못된 todoId를 사용하는 경우
  } catch (err) {
    console.log('server err', err);
    res.status(500).send('sever error');
  }
};

///// 수정 삭제에 대한 API /////

// todo.text 값 변경
// req.params 로 id 받을 예정
// req.body 로 text 받을 예정
exports.editTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const { todoId } = req.params;
    const [isUpdated] = await Todo.update({ text }, { where: { id: todoId } });
    Boolean(isUpdated)
      ? res.send({ isSuccess: true })
      : res.send({ isSuccess: false });
  } catch (err) {
    console.log('server err', err);
    res.status(500).send('sever error');
  }
};

// todo 삭제
// req.params 로 id 받을 예정
exports.deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const isUpdated = await Todo.destroy({ where: { id: todoId } });
    Boolean(isUpdated)
      ? res.send({ isSuccess: true })
      : res.send({ isSuccess: false });
  } catch (err) {
    console.log('server err', err);
    res.status(500).send('sever error');
  }
};
