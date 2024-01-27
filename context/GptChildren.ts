import React from 'react';

const gptChildrenContext = React.createContext({
    gptChildren: [] as any,
    setGptChildren: (fox:any[]) => { }
});

export default gptChildrenContext;