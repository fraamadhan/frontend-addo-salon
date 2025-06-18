import React from 'react'
import Button from './button'
import Link from 'next/link'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href: string,
  children: React.ReactNode
}

const OAuthButton = ({ href, children, className, ...rest }: ButtonProps) => {
  return (
    <Link href={href} className='w-full'>
      <Button className={className} {...rest}>
        {children}
      </Button>
    </Link>
  )
}

export default OAuthButton