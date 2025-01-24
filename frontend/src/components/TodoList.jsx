import {
  faCalendarDays,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { create, done } from '../store/module/todo';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function TodoList() {
  let todoList = useSelector((state) => state.todo.list);
  todoList = todoList.filter((todo) => todo.done === false);
  const nextId = useSelector((state) => {
    return state.todo.nextId;
  });

  const [isEditing, setIsEditing] = useState(false);

  // useDispatch()를 통해서 dispatch 함수 생성
  const dispatch = useDispatch();

  const inputRef = useRef();

  const enterTodo = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') createTodo();
  };

  // 할일 추가 POST /todo
  const createTodo = async () => {
    if (inputRef.current.value.trim() === '') return;

    // DB 정보를 바꾸기 위해서 axios 요청

    await axios.post(`${process.env.REACT_APP_API_SERVER}/todo`, {
      text: inputRef.current.value,
    });

    // state를 변경해서 화면을 바꾸는 것
    dispatch(create({ id: nextId, text: inputRef.current.value }));
    inputRef.current.value = '';
    inputRef.current.focus();
  };

  // todo 상태 변경 PATCH /todo/:todoId
  const toDone = async (id) => {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_SERVER}/todo/${id}`
    );
    // state를 변경해서 화면을 바꾸는 것
    dispatch(done(id));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <section className='todo-box'>
      <h3>
        <FontAwesomeIcon icon={faCalendarDays} />
        <span>할 일 목록</span>
      </h3>
      <div className='add-box'>
        <input type='text' ref={inputRef} onKeyDown={enterTodo} />
        <button onClick={createTodo}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
      <ul>
        {todoList.map((todo) => {
          console.log(todo);
          return (
            <li key={todo.id}>
              <button onClick={() => toDone(todo.id)}>
                <FontAwesomeIcon icon={faSquare} />
              </button>
              <span>{todo.text}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
