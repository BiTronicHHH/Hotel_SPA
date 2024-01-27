import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight, FaCertificate, FaChevronRight, FaEye, FaUserCog, FaUserEdit } from 'react-icons/fa'
import { AuthContext } from '@/context/AuthContext'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { AlertState } from '@/components/utils/misc';

interface Props {
    buttonClicked: boolean;
}
const Menu: React.FC<Props> = ({ buttonClicked }) => {
    const { logOut } = React.useContext(AuthContext);
    const [alertState, setAlertState] = React.useState<AlertState>({
        open: false,
        message: '',
        severity: undefined,
    })
    const handleSignOut = () => {
        try {
            logOut();
        } catch (err) {
            console.log(err);
        }
    }
    const [show, setShow] = React.useState(false);
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            const component = document.getElementById('my-component');

            if (component && !component.contains(target)) {
                setShow(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    React.useEffect(() => {
        buttonClicked && setShow(true);
    }, [buttonClicked])
    return (
        <div className={`${show ? 'flex' : 'hidden'} absolute z-20 shadow-card-upload-black right-4 top-12 flex-col rounded-ss-lg rounded-ee-lg bg-white py-12 px-6 text-black`} id="my-component">
            <div className='flex items-center  mb-3'>
                <div className='mr-3'>
                    <Image src="/avatar.png" alt='avatar' className='rounded-full aspect-square shadow-card object-cover object-center' width={350} height={350} layout='fixed' objectFit="cover" objectPosition="center center" />
                </div>
                <div className='flex flex-col'>
                    <div>Albert Eng</div>
                    <div>ID: C87abf488</div>
                </div>
            </div>
            <div className=''>
                <div>Membership: Premium</div>
                <div className='flex items-center'>
                    <div className=' mr-4'>Review Left: 13</div>
                    <Link className='text-custom-blue text-2xl hover:opacity-80' href='/price'>Buy!</Link>
                </div>
            </div>
            <div className='mt-2 pt-2 border-t-2 border-t-dark-grey'>
                <div className='flex items-center'>
                    <FaEye className='mr-2 text-custom-orange' />
                    <div>Reviewed Records</div>
                </div>
                <div className='flex items-center'>
                    <FaCertificate className='mr-2 text-custom-green' />
                    <Link className='hover:scale-105 duration-300' href='/user/membership'>Membership</Link>
                </div>
                <div className='flex items-center'>
                    <FaUserCog className='mr-2 text-custom-purple' />
                    <Link className='hover:scale-105 duration-300' href='/user/account'>Account settings</Link>
                </div>
            </div>
            <div className='w-full flex items-center justify-center mt-4'>
                <div className='flex items-center' onClick={handleSignOut}>
                    <div>Log out</div>
                    <FaArrowRight />
                </div>
            </div>
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
        </div>
    )
}

export default Menu;