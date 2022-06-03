# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### create component Todo -> create file todo.jsx
import React, { useState } from 'react';
import { store } from '../../Redux/Actions/actions'

export const Todo = (props) => {
    const [status, setStatus] = useState('todo');



    const handleOnclick = (e) => {
        e.preventDefault();

        // update local  state
        if (status === 'todo') {
            setStatus('completed');
        } else {
            setStatus('todo');
        }

        store.dispatch({
            type: 'UPDATE_TODO',    
            payload: {
                id: props.id,
                status: status
            }
        })
    }

    return (
        <>
            <li onClick={handleOnclick}>{props.content}</li>
        </>
    )
}

### create component TodoList -> create file todoList.jsx
import React, { useEffect, useState } from 'react'
import { Todo } from '../Todo/todo'
import { store } from '../../Redux/Actions/actions';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

const todoSelector = (state) => state;

export const TodoList = () => {
    const [itemList, setItemList] = useState([]);

    const todoFromSelector = useSelector(todoSelector);

    useEffect(() => {
        const listFromStore = store.getState();
        console.log('List from store:', listFromStore)
        setItemList(listFromStore)
    }, [todoFromSelector])

    return (
        <div>
            {itemList.map(todo => {
               return (<Todo key={todo.id} id={todo.id} content={todo.content} status={todo.status}>
                
                </Todo>)
            })}
        </div>
        
    )
}

const mapStateToProps = function(state) {
  return {
    ...state
  }
}

// export default connect(mapStateToProps)(TodoList);

### modify filters.jsx
import React, { useEffect, useState } from "react";
import './filters.css';
import { useDispatch } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import { v4 } from 'uuid';
import { store } from "../../Redux/Actions/actions";
import { renderToDoList } from "../../Redux/Actions/actions";
import { TodoList } from "../TodoList/todoList";
import { toDoFormElement } from "../../Redux/Actions/actions";


export function Filters() {
    const dispatch = useDispatch();

    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        renderToDoList(store.getState());
    }, []);
    
    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem('todo_list')) || []
    );

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (!value) {
            return;
        }

        console.log('Submit', value);
        setValue(store.dispatch({
            type: 'ADD_TODO',
            payload: { 
                    id: v4(),
                    content: document.getElementById('text-todo-id').value,
                    status: 'todo'
                 }
        }));

        document.getElementById('form-todo-id').reset();
    };

    return (
        <div className='filters-styles'>
            <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Your ToDo</h3>
            <form
                id='form-todo-id'
                className='form-todo'
                style={{ marginTop: 10 }}
                onSubmit={handleOnSubmit}
            >
                <TextField 
                    id='text-todo-id' 
                    className='text-todo'
                    type={'text'}
                    label='Enter your ToDo' 
                    variant='outlined' 
                    color='primary'
                    size='small'
                />
                <Button 
                    id='add-todo-btn-id'
                    className='add-todo-btn' 
                    variant='contained' 
                    size='large'
                    style={{ marginLeft: 1, backgroundColor: '#cc93e2', color: '#fff' }}
                    onClick={handleOnSubmit}
                >
                    <AddIcon />
                </Button>
            </form>

            <TodoList />
        </div>
    )
}

### modify actions.js
import { createStore } from 'redux';
import { todoReducer } from '../Reducers/todoReducer';
import { v4 } from 'uuid';

export const store = createStore(
    todoReducer,
    JSON.parse(localStorage.getItem('todo_list')) || [],
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// const handleFinishToDo = (element) => {
//     element.style.textDecoration = 'line-through';

//     const currentStatus = element.getAttribute('data-status');
    
//     store.dispatch({
//         type: 'UPDATE_TODO',
//         payload: { id: element.id, status: currentStatus === 'completed' ? 'todo' : 'completed'},
//     });
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
        // liElement.id = v4();
        Object.assign(liElement.style, {
            marginTop: '10px',
            marginLeft: '15px', 
            color: '#fff',
            cursor: 'pointer'
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
                payload: { 
                    id: v4(),
                    content: toDoTextElement.value,
                    status: 'todo'
                 }
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
    localStorage.setItem('todo_list', JSON.stringify(newToDoList));
    
    renderToDoList(newToDoList);
});

### modify file addReducer.js -> todoReducer.js
export const initialState = JSON.parse(localStorage.getItem('todo_list')) || [];

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO': {
            const newList = [...state];
            newList.push(action.payload);
            return newList;
        }
        case 'UPDATE_TODO': {
            const todoToUpdate = state.find(todo => todo.id === action.payload.id);
            if (!todoToUpdate) {
                return state;
            }

            todoToUpdate.status = action.payload.status;

            state.splice(state.indexOf(todoToUpdate), 1, { ...todoToUpdate });
            
            return [...state];
        }
        default: {
            return state;
        }
    }
}

### index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { renderToDoList } from './Redux/Actions/actions';
import { todoReducer } from './Redux/Reducers/todoReducer';
import { createStore } from 'redux';

export const store = createStore(
  todoReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe (() => {
  console.log('State Update: ', store.getState());
  const newToDoList = store.getState();
  renderToDoList(newToDoList);

  localStorage.setItem('todo_list', JSON.stringify(newToDoList));
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
 
