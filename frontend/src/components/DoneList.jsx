import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

export default function DoneList() {
  const todoList = useSelector((state) => state.todo.list);
  const doneList = todoList.filter((todo) => todo.done === true);

  return (
    <section className='done-box'>
      <h3>완료 목록</h3>
      <ul>
        {doneList.map((todo) => {
          return (
            <li key={todo.id}>
              <FontAwesomeIcon icon={faCheck} />
              <span>{todo.text}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
