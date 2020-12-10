import React, {useContext, useRef, useEffect} from "react";
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');
    const {filterContacts, clearFilter, filtered} = contactContext;

    useEffect(() => {
        text.current.value = '';
    })
    const onChange = event => {
        if(text.current.value !== ''){
            filterContacts(event.target.value);
        }
        else{
            clearFilter();
        }
    }
    return(
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts..." value={text.current.value} onChange={onChange}/>
        </form>
    )
}

export default ContactFilter;