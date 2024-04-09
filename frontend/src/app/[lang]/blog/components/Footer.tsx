'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { CgWebsite } from 'react-icons/cg'
import { FaDiscord } from 'react-icons/fa'
import { AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai'

import Logo from '@/app/[lang]/blog/components/Logo'

type FooterLinkType = {
	id: number
	url: string
	newTab: boolean
	text: string
	social?: string
}

type CategoryLinkType = {
	id: string
	attributes: {
		name: string
		slug: string
	}
}

interface FooterProps {
	logoUrl: string | null
	logoText: string | null
	menuLinks: FooterLinkType[]
	categoryLinks: CategoryLinkType[]
	legalLinks: FooterLinkType[]
	socialLinks: FooterLinkType[]
}

const FooterLink = ({ url, text }: FooterLinkType) => {
	const path = usePathname()

	return (
		<li className='flex'>
			<Link
				href={url}
				className={`hover:dark:text-violet-400 ${
					path === url && 'dark:text-violet-400 dark:border-violet-400'
				}}`}
			>
				{text}
			</Link>
		</li>
	)
}

const CategoryLink = ({ attributes }: CategoryLinkType) => {
	return (
		<li className='flex'>
			<Link
				href={`/${attributes.slug}`}
				className='hover:dark:text-violet-400'
			>
				{attributes.name}
			</Link>
		</li>
	)
}

const RenderSocialIcon = ({ social }: { social: string | undefined }) => {
	switch (social) {
		case 'WEBSITE':
			return <CgWebsite />
		case 'TWITTER':
			return <AiFillTwitterCircle />
		case 'YOUTUBE':
			return <AiFillYoutube />
		case 'DISCORD':
			return <FaDiscord />
		default:
			return null
	}
}

const Footer = ({
	logoUrl,
	logoText,
	menuLinks,
	categoryLinks,
	legalLinks,
	socialLinks,
}: FooterProps) => {
	return (
		<footer className='py-6 dark:bg-black dark:text-gray-50'>
			<div className='container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50'>
				<div className='grid grid-cols-12'>
					<div className='pb-6 col-span-full md:pb-0 md:col-span-6'>
						<Logo src={logoUrl}>
							{logoText && (
								<h2 className='text-2xl font-bold'>{logoText}</h2>
							)}
						</Logo>
					</div>

					<div className='col-span-6 text-center md:text-left md:col-span-3'>
						<p className='pb-1 text-lg font-medium'>Categories</p>

						<ul>
							{categoryLinks.map((link: CategoryLinkType) => (
								<CategoryLink key={link.id} {...link} />
							))}
						</ul>
					</div>

					<div className='col-span-6 text-center md:text-left md:col-span-3'>
						<p className='pb-1 text-lg font-medium'>Menu</p>

						<ul>
							{menuLinks.map((link: FooterLinkType) => (
								<FooterLink key={link.id} {...link} />
							))}
						</ul>
					</div>
				</div>

				<div className='grid justify-center pt-6 lg:justify-between'>
					<div className='flex'>
						<span className='mr-2'>
							©{new Date().getFullYear()} All rights reserved
						</span>

						<ul className='flex'>
							{legalLinks.map((link: FooterLinkType) => (
								<Link
									href={link.url}
									className='text-gray-400 hover:text-gray-300 mr-2'
									key={link.id}
								>
									{link.text}
								</Link>
							))}
						</ul>
					</div>

					<div className='flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13'>
						{socialLinks.map((link: FooterLinkType) => {
							return (
								<a
									key={link.id}
									rel='noopener noreferrer'
									href={link.url}
									title={link.text}
									target={link.newTab ? '_blank' : '_self'}
									className='flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-400 dark:text-gray-900'
								>
									<RenderSocialIcon social={link.social} />
								</a>
							)
						})}
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
