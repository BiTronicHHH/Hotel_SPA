import Header from '@/components/global/header'
import Footer from '@/components/global/Footer'
import ContactComp from '@/components/global/ContactComp'

export default function Home() {

    return (
        <div className='min-h-screen min-w-full flex flex-col items-center'>
            <Header />
            <ContactComp />
            <Footer />
        </div >
    )
}
