import React from 'react';

const stripeContext = React.createContext({
    openSt: false,
    setOpenSt: (fox:boolean) => { }
});

export default stripeContext;