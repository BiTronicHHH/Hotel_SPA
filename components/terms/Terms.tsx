import React from 'react'
import Link from 'next/link'
import TermsComp from './TermsComp'

const first = [
    {
        title: 'Acceptance of Terms',
        description: <div>By accessing or using the services provided by <b className='italic'>AI Resources Marketplace</b>, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</div>
    },
    {
        title: 'Description of Service',
        description: 'We provide an online platform for selling subscription-based AI prompts and educational articles. These services may be modified or terminated at any time, with or without notice.'
    },
    {
        title: 'User Registration',
        description:
            <div>
                To use our services, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </div>
    },
    {
        title: 'Subscription and Payments',
        description:
            <div>
                Subscriptions may be purchased for varying periods. Payments are non-refundable, except as required by law or as stated in our refund policy.
            </div>
    },
    {
        title: 'Acceptable Use',
        description:
            <div className=''>
                You agree not to use our services for any unlawful activities, to violate any laws, or to engage in any activity that interferes with the proper working of our services.
            </div>
    },
    {
        title: 'Copyright and Ownership',
        description:
            <div className=''>
                All content provided on this platform, including AI prompts and articles, is owned by <b className='italic'>AI Resources Marketplace</b> or its content creators and is protected by international copyright laws.
            </div>
    },
    {
        title: 'Termination',
        description:
            <div className=''>
                We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
            </div>
    },
    {
        title: 'Disclaimers and Limitations of Liability',
        description:
            <div className=''>
                Our services are provided &quot;as is&quot; without any warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, error-free, or completely secure.
            </div>
    },
    {
        title: 'Governing Law',
        description:
            <div className=''>
                These Terms of Service are governed by the laws of Malaysia, without regard to its conflicts of law principles.
            </div>
    },
    {
        title: 'Access & Accuracy',
        description:
            <div className=''>
                You have the right to access, correct, or delete your personal data. You may update your information through your account settings or by contacting us.
            </div>
    },
    {
        title: 'Amendments',
        description:
            <div className=''>
                We reserve the right to modify these Terms of Service at any time. Your continued use of our services after such modifications constitutes your acceptance of the new terms.
            </div>
    },
    {
        title: 'Contact Information',
        description:
            <div className=''>
                <div>For any questions about these Terms of Service, please contact:
                </div>
                <ul className='list-disc px-8'>
                    <li><b className=' italic '>Email:</b> alberteng123@hotmail.com</li>
                    <li><b className=' italic '>Phone:</b> +65 8911 3801 (Available through WhatsApp only)</li>
                </ul>
            </div>
    }
]
export default function Terms() {
    return (
        <div className=' lg:pt-[144px] flex w-full py-16 md:py-24 flex-col items-center shadow-card-upload-black relative'>
            <img className='absolute top-0 left-0 h-full w-full' src='/bg14.jpg' />
            <div className='font-header text-glow lg:text-6xl md:text-4xl text-center text-3xl px-2 lg:mb-8 md:mb-4 font-bold z-10 text-[white] tracking-wider'>
                Terms of Service
            </div>
            <div className='z-10'>
                {
                    first.map((element, index) => (
                        <TermsComp key={index} title={element.title} description={element.description} />
                    ))
                }
            </div>
        </div>
    )
}
