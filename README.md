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
import { store } from '../../Redux/Actions/actions';

export const Todo = (props) => {
    // const [status, setStatus] = useState('todo');

    const { status } = props;

    const handleOnclick = (e) => {
        e.preventDefault();

        // update local  state
        let newStatus = '';
        if (status === 'todo') {
            newStatus = 'completed';
        } else {
            newStatus = 'todo';
        }

        store.dispatch({
            type: 'UPDATE_TODO',
            payload: {
                id: props.id,
                status: newStatus,
            }
        })
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <li
                onClick={handleOnclick}
                style={{
                    fontSize: '1.2rem',
                    lineHeight: '2rem',
                    color: '#333',
                    textDecorationLine: props.status==='completed' ? 'line-through' : 'none'
                }}
            >
                {props.content}
            </li>
        </div>
    )
}

### create component TodoList -> create file todoList.jsx
import React from 'react'
import { Todo } from '../Todo/todo'
import { useSelector } from 'react-redux';

const todoSelector = (state) => {
    console.log('Current state:', state);
    return state;
}

export const TodoList = () => {
    const todoFromSelector = useSelector(todoSelector);

    return (
        <div>
            {todoFromSelector.map(todo => {
                return (<Todo
                            key={todo.id}
                            id={todo.id}
                            content={todo.content}
                            status={todo.status}
                        >
                </Todo>)
            })}
        </div>
    )
}

### modify filters.jsx
import React from "react";
import './filters.css';
import { TextField, Button } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import { v4 } from 'uuid';
import { store } from "../../Redux/Actions/actions";
import { TodoList } from "../TodoList/todoList";


export function Filters() {

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const value = document.getElementById('text-todo-id')?.value;
        if (!value) {
            return;
        }

        console.log('Submit', value);
        store.dispatch({
            type: 'ADD_TODO',
            payload: { 
                    id: v4(),
                    content: value,
                    status: 'todo'
                 }
        });

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

export const store = createStore(
    todoReducer,
    JSON.parse(localStorage.getItem('todo_list')) || [],
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

### modify file addReducer.js -> todoReducer.js
export const initialState = JSON.parse(localStorage.getItem('todo_list')) || [];

const saveStateToStorage = (state) => {
    localStorage.setItem('todo_list', JSON.stringify(state));
}

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO': {
            const newList = [...state];
            newList.push(action.payload);

            saveStateToStorage(newList);

            return newList;
        }
        case 'UPDATE_TODO': {
            const todoToUpdate = state.find(todo => todo.id === action.payload.id);
            if (!todoToUpdate) {
                return state;
            }

            todoToUpdate.status = action.payload.status;

            state.splice(state.indexOf(todoToUpdate), 1, { ...todoToUpdate });

            saveStateToStorage(state);
            
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
import { store } from './Redux/Actions/actions';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
 
 ### modify App.js
 import React from "react";
import "./App.css";
import { Card } from "@material-ui/core";
import { Filters } from "./Components/Filters/filters";

function App() {
  return (
    <div className='App'>
      <Card 
        className='box-shadow box-shadow-hover' 
        style={{
          marginTop: '30px',
          height: '600px',
          background: 'linear-gradient(to bottom right, #cc93e2, #ffffffee)'
        }}
      >
        <h1 
          style={{ 
            marginTop: '10px', 
            fontSize: '1.8rem', 
            textAlign: 'center', 
            color: '#fff' 
          }}
        >
          TODO APP
        </h1>
        <Filters />
      </Card>
    </div>
  );
}

export default App;
