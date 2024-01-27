import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context/AuthContext';

interface Props {
    children: JSX.Element | JSX.Element[] | React.ReactNode;
}



const Protected: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const { user } = useContext(AuthContext);
    // React.useEffect(()=> {
    //     if (!user) {
    //         console.log(user, ">>>>>>");
    //         router.push('/');
    //     }
    // }, [user])

        return (<>{children}</>);
    }

    export default Protected;
