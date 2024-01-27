import { Inter } from '@next/font/google'
import Header from '@/components/global/header'
import Story from '@/components/global/Story'
import Footer from '@/components/global/Footer'
import PropertiesComp from '@/components/global/Properties'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    return (
        <div className='min-h-screen w-full flex flex-col items-center'>
            <Header />
            <PropertiesComp />
            <Footer />
        </div >
    )
}
