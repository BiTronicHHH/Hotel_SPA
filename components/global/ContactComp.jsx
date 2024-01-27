import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import LoadingModal from './LoadingModal';
import { FaEnvelope, FaExclamationCircle, FaPhone, FaUser } from 'react-icons/fa';

const ContactComp = () => {
  const [alertState, setAlertState] = React.useState({
    open: false,
    message: '',
    severity: undefined,
  })
  const [isLoading, setIsLoadinig] = React.useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoadinig(true);
    emailjs.sendForm(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_TEMPLATE_ID, form.current, process.env.NEXT_PUBLIC_PUBKEY)
      .then((result) => {
        setAlertState({
          open: true,
          message: 'Thank you for your message. It has been sent.',
          severity: 'success',
        })
      }, (error) => {
        setAlertState({
          open: true,
          message: 'Sorry!',
          severity: 'error',
        })
      });
    setIsLoadinig(false);
  };

  return (
    <div className='flex relative justify-center items-center mt-40 mb-20'>
      {/* <div className='h-[190px] min-w-[100vw]  max-w-[100vw] bg-[#3098d4] absolute top-0 right-0 flex'>
      </div> */}
      <div className='w-full flex flex-col justify-center items-center gap-10 lg:gap-0 lg:flex-row lg:justify-between lg:items-start px-8 xl:max-w-[1200px] xl:min-w-[1200px] lg:max-w-[1000px] lg:min-w-[1000px] md:max-w-[700px] md:min-w-[700px] max-w-[100vw] min-w-[400px]' >
        <div className=' min-w-[45%] flex flex-col justify-center items-center bg-[#3179cc0f] p-12'>
          <form ref={form} onSubmit={sendEmail} className='flex flex-col w-full'>
            <div className='flex justify-between gap-6'>
              <div className='relative'>
                <input type="text" name="first_name" className='border-[#ccc] my-2 pl-9' placeholder='First Name*' required />
                <FaUser className='absolute top-5 left-3 text-[#666]' />
              </div>
              <div className='relative'>
                <input type="text" name="last_name" className='border-[#ccc] my-2 pl-9' placeholder='Last Name*' required />
                <FaUser className='absolute top-5 left-3 text-[#666]' />
              </div>
            </div>
            <div className='flex justify-between gap-6'>
              <div className='relative'>
                <input type="email" name="first_name" className='border-[#ccc] my-2 pl-9' placeholder='Email Address*' required />
                <FaEnvelope className='absolute top-5 left-3 text-[#666]' />
              </div>
              <div className='relative'>
                <input type="text" name="last_name" className='border-[#ccc] my-2 pl-9' placeholder='Phone*' />
                <FaPhone className='absolute top-5 left-3 text-[#666]' />
              </div>
            </div>
            <div className='relative'>
              <textarea name="message" placeholder='Comments/Questions' className='border-[#ccc] my-2 pl-9 w-full' />
              <FaExclamationCircle className='absolute top-5 left-3 text-[#666]' />
            </div>
            <div className='w-full flex items-center justify-center mt-20 mb-4'>
              <input type="submit" value="Submit" className=' cursor-pointer rounded-full px-8 py-2 bg-[#3bb7ff] border-2 border-[#4d94f1] text-white duration-300 hover:scale-105 text-xl font-semibold' />
            </div>
          </form>
        </div>
        <div className=' flex flex-col justify-start items-center lg:items-start  p-4'>
          <div className='text-3xl uppercase mb-2'>Office Location</div>
          <div className='text-lg text-[#444] mb-6 '>
            StateLine StayOvers<br />
            200 E 49th St<br />
            Texarkana, AR 71854
          </div>
          <div className='text-3xl uppercase mb-2'>Phone</div>
          <div className='text-lg text-[#444]  mb-6 underline'>
            (870) 774-3151
          </div>
          <div className='text-3xl uppercase mb-2'>Hours</div>
          <div className='text-lg text-[#444]  mb-6 '>
            MON – FRI<br />
            8:00AM – 7:00PM
          </div>
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
      {
        isLoading &&
        <LoadingModal />
      }
    </div>
  );
};

export default ContactComp;