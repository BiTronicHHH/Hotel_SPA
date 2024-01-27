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

const gptArrayContext = React.createContext({
    gptArray: [] as Props[],
    setGptArray: (fox:Props[]) => { }
});

export default gptArrayContext;