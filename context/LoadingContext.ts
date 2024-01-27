import React from 'react';

const loadingContext = React.createContext({
    isLoading: false,
    setIsLoading: (fox:boolean) => { }
});

export default loadingContext;