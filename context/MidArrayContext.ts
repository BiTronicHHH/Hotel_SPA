import React from 'react';
interface Props {
    image: string[];
    title: string;
    author: string;
    sells: number;
    likes: number;
    AI: string;
    Category: string;
    Sub: string;
    Tag: string;
    desc: string;
  }

const midArrayContext = React.createContext({
    midArray: [] as Props[],
    setMidArray: (fox:Props[]) => { }
});

export default midArrayContext;