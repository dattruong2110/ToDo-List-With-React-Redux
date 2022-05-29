import { addReducer } from '../Reducers/addToDo';
import { createStore } from 'redux';


export const store = createStore(
    addReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const renderToDoList = (toDoList) => {
    if (!Array.isArray(toDoList) || toDoList.length === 0) {
        return;
    }

    const ulElement = document.queryAllSelector('#todo-list-id');
    if (!ulElement) {
        return;
    }

    ulElement.innerHTML = '';

    for (const toDo of toDoList) {
        const liElement = document.querySelector('#todo-id');
        liElement.textContent = toDo;
    }
}

const initialToDoList = store.getState();
renderToDoList(initialToDoList);
console.log(initialToDoList);

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