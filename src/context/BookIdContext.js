import React, {useState, createContext} from 'react';

export const BookIdContext = createContext()

export const BookIdProvider = props => {
    const [bookId, setBookId] = useState('');
   
    
    return(
        <BookIdContext.Provider value={[bookId, setBookId]}>
            {props.children}
        </BookIdContext.Provider>
    );
}
