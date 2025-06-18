import React from 'react'
import OAuthButton from './oauth-button'
import Image from 'next/image'

export const OAuthGoogle = ({ label }: { label: string }) => {
    return (
        <OAuthButton href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login/google`} className='w-full flex items-center justify-center gap-x-2 bg-white text-black hover:bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm transition-colors duration-200'>
            <Image width="24" height="24" src={'/google-icon.svg'} alt="google-logo" />
            {label}
        </OAuthButton>
    )
}
