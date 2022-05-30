import React from "react";
import { useDispatch } from "react-redux";
import './filters.css';
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import { renderToDoList } from "../../Redux/Actions/actions";
// import { toDoFormElement } from "../../Redux/Actions/actions";
// import { handleSubmitToDo } from '../../Redux/Actions/actions';

export function Filters() {
    const dispatch = useDispatch();

    return (
        <div className='filters-styles'>
            <h3 style={{ fontSize: '1.2rem' }}>Your ToDo</h3>
            <form id='form-todo-id' className='form-todo'>
                <TextField 
                    id='text-todo-id' 
                    className='text-todo'
                    type={'text'}
                    label='Enter your ToDo' 
                    variant='outlined' 
                    size='small'
                />
                <Button 
                    id='add-todo-btn-id'
                    className='add-todo-btn' 
                    variant='contained' 
                    color='primary' 
                    size='large'
                    // onClick={handleSubmitToDo()}
                >
                    <AddIcon />
                </Button>
            </form>

            <ul id='todo-list-id' onChange={() => dispatch(renderToDoList())}>
                <li id='todo-id'></li>
            </ul>
        </div>
    )
}