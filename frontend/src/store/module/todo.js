const initialState = {
  list: [],
};

const count = initialState.list.length; // 3
initialState['nextId'] = count;

// action type 에 대한 상수 설정
const CREATE = 'todo/CREATE';
const DONE = 'todo/DONE';
const INIT = 'todo/INIT';

// components 에서 사용될 액션 반환 함수
export function create(payload) {
  return { type: CREATE, payload: payload };
}

export function done(id) {
  return { type: DONE, payload: id };
}

// data : {id, text, done}[] 인 타입인 데이터
export function init(data) {
  return { type: INIT, payload: data };
}

export function todoReducer(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        list: action.payload,
        nextId:
          action.payload.length === 0
            ? 1
            : action.payload[action.payload.length - 1].id + 1,
      };
    case CREATE:
      if (action.payload.text.trim() === '') return state;

      console.log('CREATE 호출됨', action);
      return {
        ...state,
        list: state.list.concat({
          id: action.payload.id,
          text: action.payload.text,
          done: false,
        }),
        nextId: action.payload.id + 1,
      };
    case DONE:
      console.log('DONE 호출됨', action);
      return {
        ...state,
        list: state.list.map((todo) => {
          // 바꾸고자 하는 조건
          if (todo.id === action.payload) {
            return {
              ...todo, // done을 제외한 text, id 값을 유지시킴
              done: true, // done 값 덮어쓰기
            };
          }
          return todo;
        }),
      };
    default:
      return state;
  }
}
