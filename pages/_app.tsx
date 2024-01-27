import '@/styles/globals.css'
import '../styles/styles.css'
import "../styles/fonts.css"
import { initFlowbite } from 'flowbite'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  getAuth,
  signInWithEmailAndPassword,
  deleteUser,
  updatePassword
} from 'firebase/auth'
import { User } from "firebase/auth";
import { firebase_app } from '../firebase/config'
// import { AuthContextProvider } from '../context/AuthContext'
import { AuthContext } from '../context/AuthContext'
import openNavContext from '../context/OpenNavContext'
import stripeContext from '@/context/StripeContext'
import priceContext from '@/context/PriceContext'
import React from 'react';
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { AlertState } from '@/components/utils/misc';
import loadingContext from '@/context/LoadingContext';
import midArrayContext from '@/context/MidArrayContext'
import childrenContext from '@/context/ChildrenContext'
import membershipPaid from '@/context/MembershipPaid'

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

const auth = getAuth(firebase_app);
export default function App({ Component, pageProps }: AppProps) {
  const [alertState, setAlertState] = React.useState<AlertState>({
    open: false,
    message: '',
    severity: undefined,
  })

  const [openSt, setOpenSt] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const [isMonthly, setIsMonthly] = React.useState('month');
  const [grade, setGrade] = React.useState(0);
  const [midArray, setMidArray] = React.useState<Props[]>([]);
  const [childrenFox, setChildrenFox] = React.useState<JSX.Element[]>([]);
  const [review, setReview] = React.useState(0);
  const [isPaid, setIsPaid] = React.useState(false);
  const [isUpdateMA, setIsUpdateMA] = React.useState(false);
  const [isUpdateMM, setIsUpdateMM] = React.useState(false);
  const [update, setUpdate] = React.useState<string | null>('');
  const router = useRouter()
  const [currentURL, setCurrentUrl] = React.useState('');
  // const [currentReview, setCurrentReview] = React.useState(0);
  // const [currentPrice, setCurrentPrice] = React.useState(0);
  // const [currentIsMonthly, setCurrentIsMonthly] = React.useState('month');
  // const [currentMaxReview, setCurrentMaxReview] = React.useState(0);
  // const [saveCost, setSaveCost] = React.useState(0);

  React.useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  React.useEffect(() => {
    initFlowbite();
  }, [])
  const [user, setUser] = useState<User | null>(null);
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  }
  const logOut = () => {
    try {
      signOut(auth);
    } catch (err) {
      console.log(err);
    }
  }
  const delUser = (userNow: User) => {
    if (userNow) {
      deleteUser(userNow)
        .then(() => {
          console.log('User account deleted successfully!');
        })
        .catch(error => {
          console.error('Error deleting user account:', error);
        });
    }
  }
  const updatePass = (userNow: User, newPassword: string) => {
    updatePassword(userNow, newPassword).then(() => {
      console.log('passwordUpdated');
    }).catch((error) => {
      console.log(error);
    });
  }
  const signIn = async (email: string, password: string) => {
    let result = null,
      error = null;
    try {
      result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      error = e;
    }

    return { error }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentURL.split('redirect_status=')[1] == 'succeeded') {
        setUpdate(localStorage.getItem('update'));
        if (update != '') {
          if ( update == 'ma') {
            setIsUpdateMA(true);
          } else if (update == 'mm' ) {
            setIsUpdateMM(true);
          }
        } else {
          setIsPaid(true);
        }
        router.push('/user/membership');
      }
    });
    return () => {
      unsubscribe();
    }
  }, [auth, currentURL])

  const [open, setOpen] = useState(true);
  const toggleOpen = () => {
    setOpen(!open)
  }
  return <AuthContext.Provider value={{ googleSignIn, delUser, logOut, signIn, updatePass, user }}>
    <midArrayContext.Provider value={{ midArray, setMidArray }}>
      <childrenContext.Provider value={{ childrenFox, setChildrenFox }}>
        <membershipPaid.Provider value={{ isPaid, setIsPaid, update, setUpdate, isUpdateMA, setIsUpdateMA, isUpdateMM, setIsUpdateMM }}>
            <loadingContext.Provider value={{ isLoading, setIsLoading }} >
              <stripeContext.Provider value={{ openSt, setOpenSt }} >
                <priceContext.Provider value={{ price, setPrice, isMonthly, setIsMonthly, grade, setGrade, review, setReview }} >
                  <openNavContext.Provider value={{ open, toggleOpen }}>
                    <Component {...pageProps} />
                    <Snackbar
                      open={alertState.open}
                      autoHideDuration={6000}
                      onClose={() => setAlertState({ ...alertState, open: false })}
                    >
                      <Alert
                        onClose={() => setAlertState({ ...alertState, open: false })}
                        severity={alertState.severity}
                        className='text-[red]'
                      >
                        {alertState.message}
                      </Alert>
                    </Snackbar>
                  </openNavContext.Provider>
                </priceContext.Provider>
              </stripeContext.Provider>
            </loadingContext.Provider>
        </membershipPaid.Provider>
      </childrenContext.Provider>
    </midArrayContext.Provider>
  </AuthContext.Provider>
}
