import React from "react";
import './filters.css';
import { useDispatch } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import { store } from "../../Redux/Actions/actions";
import { renderToDoList } from "../../Redux/Actions/actions";

export function Filters() {
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const value = document.getElementById('text-todo-id')?.value;
        if (!value) {
            return;
        }

        console.log('Submit', value);
        store.dispatch({
            type: 'ADD_TODO',
            payload: value
        });

        document.getElementById('form-todo-id').reset();
    }

    return (
        <div className='filters-styles'>
            <h3 style={{ fontSize: '1.2rem', color: '#3f51b5' }}>Your ToDo</h3>
            <form id='form-todo-id' className='form-todo' style={{ marginTop: 10 }} onSubmit={handleOnSubmit}>
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
                    style={{ marginLeft: 1 }}
                    onClick={handleOnSubmit}
                >
                    <AddIcon />
                </Button>
            </form>

            <ul id='todo-list-id' onChange={() => dispatch(renderToDoList())}></ul>
        </div>
    )
}