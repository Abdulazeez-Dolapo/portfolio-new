import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'

interface LogoProps {
	src: string | null
	children?: ReactNode
}

const Logo = ({ src, children }: LogoProps) => {
	return (
		<Link
			href='/'
			aria-label='Back to homepage'
			className='flex items-center p-2'
		>
			{src && <Image src={src} alt='logo' width={45} height={45} />}

			<div className='ml-2'>{children}</div>
		</Link>
	)
}

export default Logo
