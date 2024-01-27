import React from 'react';

const membershipPaid = React.createContext({
    isPaid: false,
    setIsPaid: (fox:boolean) => { },
    update: null as string | null,
    setUpdate: (fox: string | null) => {},
    isUpdateMA: false,
    setIsUpdateMA: (fox: boolean) => {},
    isUpdateMM: false,
    setIsUpdateMM: (fox: boolean) => {},
});

export default membershipPaid;