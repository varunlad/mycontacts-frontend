import React, { useState } from 'react';
import ContactContex from './ContactContes.js'
import { Children } from 'react';

function ContactProvider({children}) {
    const [newContact, setNewContact] = useState(false);
    const updateNewContact = (val) =>{
        setNewContact(val)
      }

  return (
    <ContactContex.Provider value={{newContact,updateNewContact}}>
        {children}
    </ContactContex.Provider>
  )
}

export default ContactProvider