import update from 'immutability-helper';
import { createReducers } from '../common/utility'

const initialState = {
    current_page: 'MAIN_PAGE',
    page_history: [],
}

function goToPage(state, action) {
    const new_obj = update(state, {
        page_history: {
            $push: [state.current_page]
        },
        current_page: {
            $set: action.payload
        }
    })
    return new_obj
}

function goBackPage(state, action){
    const new_obj = update(state, {
        current_page: {
            $set: state.page_history[state.page_history.length - 1]
        },
        page_history: {
            $splice: [[-1, 1]]
        },
    })
    return new_obj;
}

export const pageReducers = createReducers(initialState, {
    GO_TO_PAGE: goToPage,
    GO_BACK_PAGE: goBackPage
})