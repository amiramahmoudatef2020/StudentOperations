import * as ActionTypes from './ActionTypes';

export const getFilteredContacts = (pageSize, pageNumber) => {
    return {
        type: ActionTypes.LOAD_FILTERED_CONTACTS,
        payload: {
            pageSize,
            pageNumber
        }
    }
}

export const addContact = (newContact) => {
    return {
        type: ActionTypes.ADD_CONTACT,
        payload:newContact
    }
}

export const updateContact = (existingContact) => {
    return {
        type: ActionTypes.UPDATE_CONTACT,
        payload: existingContact
    }
}

export const deleteContacts = () => {
    return {
        type: ActionTypes.DELETE_CONTACTS,
        payload: null
    }
}

export const sortContactsASC = (key) => {
    return {
        type: ActionTypes.SORT_ASC,
        payload: {key}
    }
}

export const sortContactsDESC = (key) => {
    return {
        type: ActionTypes.SORT_DESC,
        payload: {key}
    }
}