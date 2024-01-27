import { Inter } from '@next/font/google'
import Header from '@/components/global/header'
import HomeComp from '@/components/home/HomeComp'
import Story from '@/components/global/Story'
import Footer from '@/components/global/Footer'
import OurTeam from '@/components/global/OurTeam'
import Fade from 'react-reveal/Fade';
import LightSpeed from 'react-reveal/LightSpeed';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <div className='min-h-screen w-full flex flex-col items-center'>
      <Header />
      <HomeComp />
      <LightSpeed left>
        <Story />
      </LightSpeed>
      <Fade right>
        <OurTeam />
      </Fade>
      <Footer />
    </div >
  )
}
