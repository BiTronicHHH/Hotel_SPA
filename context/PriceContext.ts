import React from 'react';

const priceContext = React.createContext({
    price: 0,
    setPrice: (fox:number) => { },
    isMonthly: '',
    setIsMonthly: (fox: string) => {},
    grade: 0,
    setGrade: (fox: number) => {},
    review: 0,
    setReview: (fox: number) => {}
});

export default priceContext;