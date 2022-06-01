const initialState = JSON.parse(localStorage.getItem('todo_list')) || [];

console.log(initialState);

export const addReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO': {
            const newList = [...state];
            newList.push(action.payload);
            return newList;
        }
        default: {
            return state;
        }
    };
};