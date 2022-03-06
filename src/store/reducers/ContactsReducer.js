import {uid} from 'react-uid';
import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    currentLoaded: [],
    allContactsLength: 0,
    allContacts: [
        // {
        //     id: "uiddsa1",
        //     firstName: "dadsadsa",
        //     lastName: "dsadasdsa",
        //     category: ["Family", "Father"],
        //     phone: " +86  464656",
        //     birthDate: "2019-12-23",
        //     isSelected: false
        // },
        // {
        //     id: "uiddsdsaa1",
        //     firstName: "dadsadsa",
        //     lastName: "dsadasdsa",
        //     category: ["Family", "Father"],
        //     phone: " +86  464656",
        //     birthDate: "2019-12-23",
        //     isSelected: false
        // },
        // {
        //     id: "uiddsdsadsaa1",
        //     firstName: "dadsadsa",
        //     lastName: "dsadasdsa",
        //     category: ["Family", "Father"],
        //     phone: " +86  464656",
        //     birthDate: "2019-12-23",
        //     isSelected: false
        // },
    ]
}

const getContactIndexById = (id) => {
    return this.props.contacts.findIndex((item) => item.id === id);
}

const ContactsReducer = (state = initialState, action) => {
    if (action.type === ActionTypes.ADD_CONTACT) {
        let newContact={
            id: uid(action.payload),
            // fullName:`${action.payload.FirstName} ${action.payload.LastName}`,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            category: action.payload.category,
            phone: ` +${action.payload.prefix}  ${action.payload.phone}`,
            birthDate: action.payload.datePicker.format('YYYY-MM-DD'),
            isSelected: false
        }
        localStorage.setItem('contactsData', JSON.stringify([...state.allContacts,newContact]));
        return {
            ...state,
            allContacts: [...state.allContacts,newContact],
            allContactsLength: state.allContacts.length + 1
        }
    } else if (action.type === ActionTypes.UPDATE_CONTACT) {

        let contactIndex = state.allContacts.findIndex((item) => item.id === action.payload.id);
        state.allContacts[contactIndex] = {
            id: action.payload.id,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            category: action.payload.category,
            phone: `${action.payload.phone}`,
            birthDate: action.payload.datePicker ? action.payload.datePicker.format('YYYY-MM-DD'): action.payload.birthDate,
            isSelected: action.payload.isSelected
        }
        localStorage.setItem('contactsData', JSON.stringify(state.allContacts));
        return {
            ...state,
            allContacts: [...state.allContacts]
        }
    } else if (action.type === ActionTypes.DELETE_CONTACTS) {

        let filteredContacts = state.allContacts.filter((item) => !item.isSelected);
        localStorage.setItem('contactsData', JSON.stringify(filteredContacts));
        return {
            ...state,
            allContacts: [...filteredContacts],
            allContactsLength: filteredContacts.length
        }
    } else if (action.type === ActionTypes.SORT_ASC) {

        state.allContacts.sort((a, b) => {
            if(a[action.payload.key] < b[action.payload.key]) {
                return -1;
            } else if (a[action.payload.key] > b[action.payload.key]) {
                return 1;
            } else return 0;
        });
        localStorage.setItem('contactsData', JSON.stringify(state.allContacts));
        return {
            ...state,
            allContacts: [...state.allContacts],
            allContactsLength: state.allContactsLength
        }
    } else if (action.type === ActionTypes.SORT_DESC) {

        state.allContacts.sort((a, b) => {
            if(a[action.payload.key] < b[action.payload.key]) {
                return -1;
            } else if (a[action.payload.key] > b[action.payload.key]) {
                return 1;
            } else return 0;
        });
        state.allContacts.reverse();
        localStorage.setItem('contactsData', JSON.stringify(state.allContacts));
        return {
            ...state,
            allContacts: [...state.allContacts],
            allContactsLength: state.allContactsLength
        }
    } else if (action.type === ActionTypes.LOAD_FILTERED_CONTACTS) {

        let storedContacts = JSON.parse(localStorage.getItem('contactsData'));
        if(storedContacts){
            state.allContacts = storedContacts;
            state.allContactsLength = storedContacts.length;
        }

        let filteredData = [];
        let pageSize = (Number)(action.payload.pageSize);
        let pageNumber = action.payload.pageNumber;
        let startIndex = ( ( pageNumber - 1 ) * pageSize );
        let endIndex = startIndex + pageSize;
        endIndex = endIndex > state.allContactsLength ? state.allContactsLength : endIndex;

        
        
        if(storedContacts) {
            for(let i = startIndex; i < endIndex ; i++) {
                filteredData.push(state.allContacts[i]);
            } 
            return {
                ...state,
                allContacts: [...state.allContacts],
                currentLoaded: [...filteredData],
                allContactsLength: state.allContactsLength
            }
        } else {
            return {
                ...state
            }
        }



    }
    return state;
}

export default ContactsReducer;