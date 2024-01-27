import { Inter } from '@next/font/google'
import Header from '@/components/global/header'
import Footer from '@/components/global/Footer'
import SS from '@/components/properties/SS';


export default function StateLine() {

    return (
        <div className='min-h-screen min-w-full flex flex-col items-center'>
            <Header />
            <SS />
            <Footer />
        </div >
    )
}
