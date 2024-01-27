// import React from 'react';

// const childrenContext = React.createContext({
//     childrenFox: [] as any,
//     setChildrenFox: (fox:any[]) => { }
// });

// export default childrenContext;
import React from 'react';

interface ChildrenContextType {
  childrenFox: JSX.Element[];
  setChildrenFox: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
}

const childrenContext = React.createContext<ChildrenContextType>({
  childrenFox: [],
  setChildrenFox: () => {},
});

export default childrenContext;