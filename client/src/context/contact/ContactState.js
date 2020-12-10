import  React, {useReducer} from 'react';
import axios from "axios";
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types';

 const ContactState = props => {
     const initialState ={
         contacts: [],
         current: null,
         filtered: null,
         error: null
     };

     const [state, dispatch] = useReducer(contactReducer, initialState);

     const getContacts = async () => {
         try{
             const response = await axios.get('api/contacts');
             dispatch({type: GET_CONTACTS, payload: response.data});
         }
         catch (exception){
             dispatch({type: CONTACT_ERROR, payload: exception.message});
         }
     }
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const response = await axios.post('api/contacts', contact, config);
            dispatch({type: ADD_CONTACT, payload: response.data});
        }
        catch (exception){
            dispatch({type: CONTACT_ERROR, payload: exception.message});
        }

    }

     const updateContact = async contact => {
         const config = {
             headers: {
                 'Content-Type': 'application/json'
             }
         }
         try{
             const response = await axios.put(`api/contacts/${contact._id}`, contact, config);
             dispatch({type: UPDATE_CONTACT, payload: response.data});
         }
         catch (exception){
             dispatch({type: CONTACT_ERROR, payload: exception.message});
         }
     }

     const deleteContact = async id => {
         try{
             const response = await axios.delete(`api/contacts/${id}`);
             dispatch({type: DELETE_CONTACT, payload: id});
         }
         catch (exception){
             dispatch({type: CONTACT_ERROR, payload: exception.message});
         }

     }

     const setCurrentContact = contact => {
         dispatch({type: SET_CURRENT, payload: contact});
     }

     const clearCurrentContact = () => {
         dispatch({type: CLEAR_CURRENT});
     }

     const clearContacts = () => {
         dispatch({type: CLEAR_CONTACTS});
     }

     const filterContacts = text => {
         dispatch({type: FILTER_CONTACTS, payload: text});
     }

     const clearFilter = () => {
         dispatch({type: CLEAR_FILTER});
     }

     return (
         <ContactContext.Provider
         value={
             {
                 contacts: state.contacts,
                 current: state.current,
                 filtered: state.filtered,
                 error: state.error,
                 addContact,
                 deleteContact,
                 setCurrentContact,
                 clearCurrentContact,
                 updateContact,
                 filterContacts,
                 clearFilter,
                 getContacts,
             }
         }>
             {props.children}
         </ContactContext.Provider>
     );
 };

 export default ContactState;