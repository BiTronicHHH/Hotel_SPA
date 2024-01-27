import React from 'react';

const openNavContext = React.createContext({
    open: false,
    toggleOpen: () => { }
});

export default openNavContext;