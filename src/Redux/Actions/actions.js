import { createStore } from 'redux';
import { addReducer } from '../Reducers/addToDo';

export const store = createStore(
    addReducer,
    JSON.parse(localStorage.getItem('todo_list')) || [],
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// const handleFinishToDo = () => {
//     document.getElementById('todo-id').style.textDecoration = 'line-through';
// }

export const renderToDoList = (toDoList) => {
    if (!Array.isArray(toDoList) || toDoList.length === 0) {
        return;
    }

    const ulElement = document.querySelector('#todo-list-id');
    if (!ulElement) {
        return;
    }

    ulElement.innerHTML = '';

    for (const toDo of toDoList) {
        const liElement = document.createElement('li');
        liElement.id = 'todo-id';
        Object.assign(liElement.style, {
           marginTop: '10px',
           marginLeft: '15px', 
        });
        // liElement.onclick = handleFinishToDo();
        liElement.textContent = toDo;

        ulElement.appendChild(liElement);
    }
};

const initialToDoList = store.getState();
console.log(initialToDoList);
renderToDoList(initialToDoList);

export const toDoFormElement = document.querySelector('#form-todo-id');
if (toDoFormElement) {
    const handleSubmitToDo = (e) => {
        e.preventDefault();
        const toDoTextElement = toDoFormElement.querySelector('#text-todo-id');
        if (!toDoTextElement) {
            return;
        }

        console.log('Submit', toDoTextElement.value);
        const action = () => {
            return {
                type: 'ADD_TODO',
                payload: toDoTextElement.value
            }
        };
        store.dispatch(action);

        toDoFormElement.reset();
    };
    toDoFormElement.addEventListener('submit', handleSubmitToDo);
}

store.subscribe (() => {
    console.log('State Update: ', store.getState());
    const newToDoList = store.getState();
    renderToDoList(newToDoList);

    localStorage.setItem('todo_list', JSON.stringify(newToDoList));
});
