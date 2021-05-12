import React, {useState, createContext} from 'react';

export const UrlContext = createContext();

export const UrlProvider = props => {
    const [urlRequest, setUrlRequest] = useState('');
   
    
    return(
        <UrlContext.Provider value={[urlRequest, setUrlRequest]}>
            {props.children}
        </UrlContext.Provider>
    );
}