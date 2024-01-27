import React from 'react';

const currentPlanContext = React.createContext({
    currentReview: 0,
    setCurrentReview: (fox:number) => { },
    currentPrice: 0,
    setCurrentPrice: (fox:number) => { },
    currentIsMonthly: '',
    setCurrentIsMonthly: (fox:string) => { },
    currentMaxReview: 0,
    setCurrentMaxReview: (fox:number) => { },
    saveCost: 0,
    setSaveCost: (fox: number) => {}
});

export default currentPlanContext;