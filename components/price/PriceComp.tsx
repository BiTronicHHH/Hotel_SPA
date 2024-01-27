import React from 'react'
import StripeDialog from '../stripeNew/StripeDialog';
import stripeContext from '@/context/StripeContext';
import priceContext from '@/context/PriceContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config'
import { AuthContext } from '@/context/AuthContext';
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { AlertState } from '@/components/utils/misc';
import loadingContext from '@/context/LoadingContext';

interface Props {
    numReview: number;
    monthPrice: number;
    promptPrice: number;
    accessArticle: boolean;
    totalSave?: number;
    currentPlan?: boolean;
}
const PriceComp: React.FC<Props> = ({ numReview, monthPrice, promptPrice, accessArticle, totalSave, currentPlan }) => {
    const { user } = React.useContext(AuthContext)
    const { openSt, setOpenSt } = React.useContext(stripeContext);
    const [alertState, setAlertState] = React.useState<AlertState>({
        open: false,
        message: '',
        severity: undefined,
    })

    const { price, isMonthly, grade, review, setPrice, setIsMonthly, setGrade, setReview } = React.useContext(priceContext);
    const [currentMonthly, setCurrentMonthly] = React.useState('');
    const [currentGrade, setCurrentGrade] = React.useState(0);
    const [currentUpMaxReview, setCurrentUpMaxReview] = React.useState(0);
    const { isLoading, setIsLoading } = React.useContext(loadingContext);
    // const { currentReview, setCurrentReview, currentPrice, setCurrentPrice, currentIsMonthly, setCurrentIsMonthly, currentMaxReview, setCurrentMaxReview, saveCost, setSaveCost } = React.useContext(currentPlanContext);
    React.useEffect(() => {
        const getUserInfo = async () => {
            if (user != null) {
                setIsLoading(true);
                const docSnap = await getDoc(doc(db, 'membership', user.uid));
                if (docSnap.exists()) {
                    const myData = docSnap.data();
                    const isMonthly = myData.isMonthly;
                    const monthlyDoc = myData.isMonthly;
                    const priceDoc = myData.price;
                    const gradeDoc = myData.grade;

                    setPrice(priceDoc);
                    setIsMonthly(monthlyDoc);
                    setReview(myData.review);
                    setGrade(gradeDoc);
                    setCurrentMonthly(isMonthly);
                    setCurrentGrade(myData.grade)
                    switch (myData.grade) {
                        case 1: setCurrentUpMaxReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_STARTER!));
                            break;
                        case 2: setCurrentUpMaxReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_BASIC!));
                            break;
                        case 3: setCurrentUpMaxReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_PREMIUM!));
                            break;
                        case 4: setCurrentUpMaxReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_PRO!));
                            break;
                    }
                }
                setIsLoading(false);
            }
        }
        if (user && user.uid) {
            getUserInfo();
        }
    }, [user])
    const handleAnnMon = () => {
        setAlertState({
            open: true,
            message: 'Annual Plan cannot go to Monthly Plan!',
            severity: 'error',
        })
    }
    const handleClick = () => {
        if (totalSave) {
            if (monthPrice == parseInt(process.env.NEXT_PUBLIC_AP_STARTER!)) {
                setGrade(1);
                setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_STARTER!));
                localStorage.setItem('grade', '1');
                localStorage.setItem('review', process.env.NEXT_PUBLIC_REVIEW_STARTER!);
            } else if (monthPrice == parseInt(process.env.NEXT_PUBLIC_AP_BASIC!)) {
                setGrade(2);
                localStorage.setItem('grade', '2');
                setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_BASIC!));
                localStorage.setItem('review', process.env.NEXT_PUBLIC_REVIEW_BASIC!);
            } else if (monthPrice == parseInt(process.env.NEXT_PUBLIC_AP_PREMIUM!)) {
                setGrade(3);
                localStorage.setItem('grade', '3');
                setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_PREMIUM!));
                localStorage.setItem('review', process.env.NEXT_PUBLIC_REVIEW_PREMIUM!);
            } else if (monthPrice == parseInt(process.env.NEXT_PUBLIC_AP_PRO!)) {
                setGrade(4);
                localStorage.setItem('grade', '4');
                setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_PRO!));
                localStorage.setItem('review', process.env.NEXT_PUBLIC_REVIEW_PRO!);
            }
            setPrice(monthPrice * 12);
            setIsMonthly('annual');
            localStorage.setItem('price', monthPrice.toString());
            localStorage.setItem('isMonthly', 'annual');
        } else {
            if (monthPrice == parseInt(process.env.NEXT_PUBLIC_MP_STARTER!)) {
                setGrade(1);
                setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_STARTER!));
                localStorage.setItem('grade', '1');
                localStorage.setItem('review', process.env.NEXT_PUBLIC_REVIEW_STARTER!);
            } else if (monthPrice == parseInt(process.env.NEXT_PUBLIC_MP_BASIC!)) {
                setGrade(2);
                setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_BASIC!));
                localStorage.setItem('grade', '2');
                localStorage.setItem('review', process.env.NEXT_PUBLIC_REVIEW_BASIC!);
            } else if (monthPrice == parseInt(process.env.NEXT_PUBLIC_MP_PREMIUM!)) {
                setGrade(3);
                setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_PREMIUM!));
                localStorage.setItem('grade', '3');
                localStorage.setItem('review', process.env.NEXT_PUBLIC_REVIEW_PREMIUM!);
            } else if (monthPrice == parseInt(process.env.NEXT_PUBLIC_MP_PRO!)) {
                setGrade(4);
                setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_PRO!));
                localStorage.setItem('grade', '4');
                localStorage.setItem('review', process.env.NEXT_PUBLIC_REVIEW_PRO!);
            }
            setPrice(monthPrice);
            setIsMonthly('month');
            localStorage.setItem('price', monthPrice.toString());
            localStorage.setItem('update', '');
            localStorage.setItem('isMonthly', 'month');
        }
        setOpenSt(true);
    }
    const handleAnnAnn = async () => {
        const currentDate = new Date();
        setIsLoading(true);
        if (user) {
            const docSnap = await getDoc(doc(db, 'membership', user.uid));
            if (docSnap.exists()) {
                const myData = docSnap.data();
                const startDate = (myData.startDate).toDate();
                const differenceDays = Math.ceil((currentDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
                const passedMonth = Math.floor(differenceDays / 31);
                const totalMonth = Math.ceil(differenceDays / 31);
                const passedDaysNewMonth = differenceDays - passedMonth * 31;
                if (passedDaysNewMonth < 16 && passedDaysNewMonth != 0) {
                    const usedMoney = price / currentUpMaxReview * (currentUpMaxReview - review);
                    const newMoney = (numReview - currentUpMaxReview + review) * monthPrice / numReview;
                    const moreMoneyMonth = (usedMoney + newMoney) - price;
                    const moreMoney = moreMoneyMonth + monthPrice * (12-totalMonth) - price * (12-totalMonth)
                    if (monthPrice == parseInt(process.env.NEXT_PUBLIC_AP_BASIC!)) {
                        setGrade(2);
                        setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_BASIC!) - (currentUpMaxReview - review));
                        localStorage.setItem('grade', '2');
                        localStorage.setItem('review', (parseInt(process.env.NEXT_PUBLIC_REVIEW_BASIC!) - (currentUpMaxReview - review)).toString());
                    } else if (monthPrice == parseInt(process.env.NEXT_PUBLIC_AP_PREMIUM!)) {
                        setGrade(3);
                        setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_PREMIUM!) - (currentUpMaxReview - review));
                        localStorage.setItem('grade', '3');
                        localStorage.setItem('review', (parseInt(process.env.NEXT_PUBLIC_REVIEW_PREMIUM!) - (currentUpMaxReview - review)).toString());
                    } else if (monthPrice == parseInt(process.env.NEXT_PUBLIC_AP_PRO!)) {
                        setGrade(4);
                        setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_PRO!) - (currentUpMaxReview - review));
                        localStorage.setItem('grade', '4');
                        localStorage.setItem('review', (parseInt(process.env.NEXT_PUBLIC_REVIEW_PRO!) - (currentUpMaxReview - review)).toString());
                    }
                    setPrice(moreMoney);
                    setIsMonthly('month');
                    localStorage.setItem('price', monthPrice.toString());
                    localStorage.setItem('isMonthly', 'annual');
                    localStorage.setItem('update', 'mm');
                    setOpenSt(true);
                } else {
                    setAlertState({
                        open: true,
                        message: 'Over 15 Days Passed from Refresh Plan!',
                        severity: 'error',
                    })
                }
            }

        }
        setIsLoading(false);
    }
    const handleLow = () => {
        setAlertState({
            open: true,
            message: 'Invalid Upgrade!',
            severity: 'error',
        })
    }
    const handleMonAnn = async () => {
        const currentDate = new Date();
        setIsLoading(true);
        if (user) {
            const docSnap = await getDoc(doc(db, 'membership', user.uid));
            if (docSnap.exists()) {
                const myData = docSnap.data();
                const startDate = (myData.startDate).toDate();
                const expDate = (myData.expDate).toDate();
                const differenceDays = Math.ceil((currentDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
                if (differenceDays < 16 && differenceDays != 0) {
                    const usedMoney = price / currentUpMaxReview * (currentUpMaxReview - review);
                    const newMoney = (numReview - currentUpMaxReview + review) * monthPrice / numReview;
                    const moreMoneyMonth = (usedMoney + newMoney) - price;
                    const moreMoney = moreMoneyMonth + monthPrice * 11
                    if (monthPrice == parseInt(process.env.NEXT_PUBLIC_AP_STARTER!)) {
                        setGrade(1);
                        setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_STARTER!) - (currentUpMaxReview - review));
                        localStorage.setItem('grade', '1');
                        localStorage.setItem('review', (parseInt(process.env.NEXT_PUBLIC_REVIEW_STARTER!) - (currentUpMaxReview - review)).toString());
                    } else if (monthPrice == parseInt(process.env.NEXT_PUBLIC_AP_BASIC!)) {
                        setGrade(2);
                        setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_BASIC!) - (currentUpMaxReview - review));
                        localStorage.setItem('grade', '2');
                        localStorage.setItem('review', (parseInt(process.env.NEXT_PUBLIC_REVIEW_BASIC!) - (currentUpMaxReview - review)).toString());
                    } else if (monthPrice == parseInt(process.env.NEXT_PUBLIC_AP_PREMIUM!)) {
                        setGrade(3);
                        setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_PREMIUM!) - (currentUpMaxReview - review));
                        localStorage.setItem('grade', '3');
                        localStorage.setItem('review', (parseInt(process.env.NEXT_PUBLIC_REVIEW_PREMIUM!) - (currentUpMaxReview - review)).toString());
                    } else if (monthPrice == parseInt(process.env.NEXT_PUBLIC_AP_PRO!)) {
                        setGrade(4);
                        setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_PRO!) - (currentUpMaxReview - review));
                        localStorage.setItem('grade', '4');
                        localStorage.setItem('review', (parseInt(process.env.NEXT_PUBLIC_REVIEW_PRO!) - (currentUpMaxReview - review)).toString());
                    }
                    setPrice(moreMoney);
                    setIsMonthly('month');
                    const newExpDate = new Date();
                    newExpDate.setDate(startDate.getDate() + 372);
                    alert(newExpDate);
                    localStorage.setItem('price', monthPrice.toString());
                    localStorage.setItem('isMonthly', 'annual');
                    localStorage.setItem('update', 'ma');
                    localStorage.setItem('newExpDate', newExpDate.toString())
                    setOpenSt(true);
                } else {
                    setAlertState({
                        open: true,
                        message: 'Over 15 Days Passed from Refresh Plan!',
                        severity: 'error',
                    })
                }
            }

        }
        setIsLoading(false);
    }
    const handleMonMonHigh = async () => {
        const currentDate = new Date();
        setIsLoading(true);
        if (user) {
            const docSnap = await getDoc(doc(db, 'membership', user.uid));
            if (docSnap.exists()) {
                const myData = docSnap.data();
                const startDate = (myData.startDate).toDate();
                console.log(myData.startDate);
                const differenceDays = Math.ceil((currentDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
                if (differenceDays < 16) {
                    const usedMoney = price / currentUpMaxReview * (currentUpMaxReview - review);
                    const newMoney = (numReview - currentUpMaxReview + review) * monthPrice / numReview;
                    const moreMoney = (usedMoney + newMoney) - price;
                    if (monthPrice == parseInt(process.env.NEXT_PUBLIC_MP_BASIC!)) {
                        setGrade(2);
                        setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_BASIC!) - (currentUpMaxReview - review));
                        localStorage.setItem('grade', '2');
                        localStorage.setItem('review', (parseInt(process.env.NEXT_PUBLIC_REVIEW_BASIC!) - (currentUpMaxReview - review)).toString());
                    } else if (monthPrice == parseInt(process.env.NEXT_PUBLIC_MP_PREMIUM!)) {
                        setGrade(3);
                        setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_PREMIUM!) - (currentUpMaxReview - review));
                        localStorage.setItem('grade', '3');
                        localStorage.setItem('review', (parseInt(process.env.NEXT_PUBLIC_REVIEW_PREMIUM!) - (currentUpMaxReview - review)).toString());
                    } else if (monthPrice == parseInt(process.env.NEXT_PUBLIC_MP_PRO!)) {
                        setGrade(4);
                        setReview(parseInt(process.env.NEXT_PUBLIC_REVIEW_PRO!) - (currentUpMaxReview - review));
                        localStorage.setItem('grade', '4');
                        localStorage.setItem('review', (parseInt(process.env.NEXT_PUBLIC_REVIEW_PRO!) - (currentUpMaxReview - review)).toString());
                    }
                    setPrice(moreMoney);
                    setIsMonthly('month');
                    localStorage.setItem('price', monthPrice.toString());
                    localStorage.setItem('isMonthly', 'month');
                    localStorage.setItem('update', 'mm');
                    setOpenSt(true);
                } else {
                    setAlertState({
                        open: true,
                        message: 'Over 15 Days Passed from Beginning of Plan!',
                        severity: 'error',
                    })
                }
            }

        }
        setIsLoading(false);

    }
    return (
        <>
            <div onClick={(!currentPlan) ? (currentGrade ? (numReview > currentUpMaxReview ? (currentMonthly == 'annual' ? (totalSave ? handleAnnAnn : handleAnnMon) : (totalSave ? handleMonAnn : handleMonMonHigh)) : (numReview == currentUpMaxReview ? (currentMonthly == 'annual' ? handleLow : (totalSave ? handleMonAnn : handleLow)) : handleLow)) : handleClick) : () => { }} className='relative rounded-2xl z-10 flex flex-col items-center hover:scale-105 hover:z-30 px-6 py-12 bg-[#aaaaaa11] text-[white] shadow-card-upload-black hover:bg-gradient-to-br from-[#0e3252] to-[#3a1b3a] hover:bg-opacity-20 duration-300 cursor-pointer mx-1'>
                <div className={`${totalSave ? 'absolute rounded-lg font-semibold px-3 shadow-card-upload-black py-1  top-2 right-2 bg-gradient-to-r to-[#01dcff] from-[#fe01d4]' : 'hidden'}`}>
                    Save 10%
                </div>
                <div className='text-2xl font-Urbansit font-semibold mb-2'>
                    {numReview == 10 ? 'Starter' : numReview == 30 ? 'Basic' : numReview == 50 ? 'Premium' : 'Pro'}
                </div>
                <div className='text-center'>
                    <span className='font-semibold text-lg'>{numReview}</span> of Reviews Available
                </div>
                <div className='flex h-full items-start text-[#01dcff] mt-4'>
                    <div className='flex flex-col text-lg mt-[6px]'>
                        <div>$</div>
                    </div>
                    <div className='flex flex-col text-6xl'>
                        <div>{monthPrice}</div>
                    </div>
                    <div className='flex flex-col justify-end mt-10 text-base'>
                        <div>/mo</div>
                    </div>
                </div>
                <div className={`${currentPlan ? 'to-[#01dcff55] from-[#fe01d455] shadow-auth-box' : currentGrade ? numReview > currentUpMaxReview ? (currentMonthly == 'annual' ? (totalSave ? 'to-[#01dcff] from-[#fe01d4] shadow-card-upload-black' : 'to-[#01dcff55] from-[#fe01d455] shadow-auth-box') : 'to-[#01dcff] from-[#fe01d4] shadow-card-upload-black') : (numReview == currentUpMaxReview ? (currentMonthly == 'annual' ? 'to-[#01dcff55] from-[#fe01d455] shadow-auth-box' : (totalSave ? 'to-[#01dcff] from-[#fe01d4] shadow-card-upload-black' : 'to-[#01dcff55] from-[#fe01d455] shadow-auth-box')) : 'to-[#01dcff55] from-[#fe01d455] shadow-auth-box') : 'to-[#01dcff] from-[#fe01d4] shadow-card-upload-black'} text-[white] my-4  cursor-pointer bg-gradient-to-r font-semibold rounded-full px-6 py-1`}>
                    Upgrade
                </div >
                <ul className='list-disc px-4'>
                    <li className='mb-2'>
                        Mix & Match Midjourney <br />& Chat GPT Available
                    </li>
                    <li className='mb-2'>
                        Price of Prompt:  <span className='font-semibold text-lg'>${promptPrice.toFixed(2)}</span>
                    </li>
                    {
                        (totalSave != 0) && (
                            <li className='mb-2'>
                                Total Save Annually <span className='font-semibold text-lg'>{totalSave}</span>
                            </li>
                        )
                    }
                    <li className='mb-2'>
                        Selling Prompts Available
                    </li>
                    <li className='mb-2'>
                        100,000+ GPT Prompts Questions
                    </li>
                    <li className={`${totalSave ? '' : 'hidden'}  mb-2`} >
                        Total Save: <span className='font-semibold text-lg'>${totalSave?.toFixed(2)}</span>
                    </li>
                    <li className={`${accessArticle ? 'visible' : 'invisible'}`}>
                        Access AI Article: Tips, Techniques
                    </li>
                </ul>
            </div >
            {openSt && <StripeDialog />}
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
        </>

    )
}

export default PriceComp;