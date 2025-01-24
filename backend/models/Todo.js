const TodoModel = (sequelize, DataType) => {
  const Todo = sequelize.define(
    'Todo',
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataType.STRING(100),
        allowNull: false,
      },
      done: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: 0, // 기본값 false로 설정한다는 의미
      },
    },
    { freezeTableName: true, timestamps: false, tableName: 'todo' }
  );
  return Todo;
};

module.exports = TodoModel;
