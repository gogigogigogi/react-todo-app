import { useEffect } from 'react';
import DoneList from './DoneList';
import TodoList from './TodoList';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { init } from '../store/module/todo';

export default function ListContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getTodos() {
      const todos = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/todos`
      );
      console.log(todos.data);

      if (todos.data) {
        dispatch(init(todos.data));
      }
    }
    getTodos();
  }, [dispatch]);

  return (
    <main className='list-container'>
      <TodoList />
      <DoneList />
    </main>
  );
}
