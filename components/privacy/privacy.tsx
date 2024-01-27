import React from 'react'
import PrivacyComp from './privacyComp'

const first = [
    {
        title: 'Objective & Scope of Policy',
        description: <div>This Privacy Policy outlines how <b className='text-lg italic'>AI Resources Marketplace</b> collects, uses, discloses, and protects your personal information while you use our website and services. <br />This policy applies to all users and visitors of our website.</div>
    },
    {
        title: 'Acceptance of Terms',
        description: 'By using our website and services, you accept the terms and practices described in this Privacy Policy. If you do not agree with any terms, please do not use our website or services.'
    },
    {
        title: 'Collection of Information',
        description:
            <div>
                <div>We collect various types of information, including:</div>
                <ul className='list-disc px-8'>
                    <li><b className=' italic '>Personal Information: </b>Such as your name and email address for account creation and communication.</li>
                    <li><b className=' italic'>Technical Data: </b>IP address, browser information, and other related metrics.
                    </li>
                    <li><b className=' italic '>Subscription Details: </b>Information related to your subscription preferences and purchase history.
                    </li>
                </ul>
            </div>
    },
    {
        title: 'Use of Personal Information',
        description:
            <div>
                <div>We use your personal information for:</div>
                <ul className='list-disc px-8'>
                    <li>Account creation and management</li>
                    <li>Customer support</li>
                    <li>Communication, including newsletters and promotional messages</li>
                    <li>Analytics to improve our services</li>
                </ul>
            </div>
    },
    {
        title: 'Disclosure of Information',
        description:
            <div className=''>
                <div>We do not sell or rent your personal information. However, we may disclose your personal information in the following situations:</div>
                <ul className='list-disc px-8'>
                    <li>Legal requirements</li>
                    <li>Business transfers, like mergers or acquisitions</li>
                    <li>With your explicit consent</li>
                </ul>
            </div>
    },
    {
        title: 'Outside Parties & Sites',
        description:
            <div className=''>
                Our website may contain links to external sites. We are not responsible for the privacy practices or content of such external sites.
            </div>
    },
    {
        title: 'Security',
        description:
            <div className=''>
                We implement industry-standard encryption and security protocols to protect your data. However, no method of transmission over the internet is 100% secure.
            </div>
    },
    {
        title: 'Retention',
        description:
            <div className=''>
                We retain your personal information as long as your account is active or as necessary to provide services to you.
            </div>
    },
    {
        title: 'Amendment of This Policy',
        description:
            <div className=''>
                We reserve the right to amend this policy at any time. Changes will be posted on this page, and in significant cases, we will notify you through email.
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
        title: 'Additional Privacy Protection for Children',
        description:
            <div className=''>
                Our services are not intended for users under the age of 18. We do not knowingly collect data from users who are below this age.
            </div>
    },
    {
        title: 'Cookies and Tracking Technologies',
        description:
            <div className=''>
                We use cookies for analytics and to improve user experience. You can manage cookie preferences through your browser settings.
            </div>
    },
    {
        title: 'User Choices & Opt-Out Options',
        description:
            <div className=''>
                You may opt out of any future communications or data collection by updating your account settings or contacting us directly.
            </div>
    },
    {
        title: 'Data Portability',
        description:
            <div className=''>
                You have the right to request a copy of the data we hold on you and to have it transferred to another service provider.
            </div>
    },
    {
        title: 'Legal Jurisdiction',
        description:
            <div className=''>
                This policy is governed by the laws of Malaysia. Any disputes will be resolved in the Malaysia courts.
            </div>
    },
    {
        title: 'Contact Information',
        description:
            <div className=''>
                <div>For any queries regarding this Privacy Policy, please contact:
                </div>
                <ul className='list-disc px-8'>
                    <li><b className=' italic '>Email:</b> alberteng123@hotmail.com</li>
                    <li><b className=' italic '>Phone:</b> +65 8911 3801 (Available through WhatsApp only)</li>
                </ul>
            </div>
    }
]
export default function Privacy() {
    return (
        <div className='lg:pt-[144px] flex w-full py-16 md:py-24 flex-col items-center shadow-card-upload-black relative'>
            <img className='absolute top-0 left-0 h-full w-full' src='/bg7.jpg' />
            <div className='font-header text-glow lg:text-6xl md:text-4xl text-center text-3xl px-2 lg:mb-8 md:mb-4 font-bold z-10 text-[white] tracking-wider'>
                Privacy Policy
            </div>
            <div className='z-10'>
                {
                    first.map((element, index) => (
                        <PrivacyComp key={index} title={element.title} description={element.description} />
                    ))
                }
            </div>
        </div>
    )
}
