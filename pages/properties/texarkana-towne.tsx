import { Inter } from '@next/font/google'
import Header from '@/components/global/header'
import Footer from '@/components/global/Footer'
import TT from '@/components/properties/TT'


export default function TTComp() {

    return (
        <div className='min-h-screen min-w-full flex flex-col items-center'>
            <Header />
            <TT />
            <Footer />
        </div >
    )
}
