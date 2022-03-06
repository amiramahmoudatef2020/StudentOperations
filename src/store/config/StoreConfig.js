import React from 'react';
import {createStore , combineReducers} from 'redux';
import {Provider} from 'react-redux';
import ContactsReducer from '../reducers/ContactsReducer';

let rootReducer = combineReducers({
    Contacts: ContactsReducer
})
let store = createStore(rootReducer);

const App = (props) => {
    return(
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}

export default App;