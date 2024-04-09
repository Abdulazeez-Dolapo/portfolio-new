'use client'
import Image from 'next/image'
import { Fade } from 'react-slideshow-image'

import { getStrapiMedia } from '@/app/[lang]/blog/utils/api-helpers'

type ImageType = {
	id: number
	attributes: {
		alternativeText: string | null
		caption: string | null
		url: string
	}
}

interface SlidShowProps {
	files: {
		data: ImageType[]
	}
}

const Slideshow = ({ data }: { data: SlidShowProps }) => {
	return (
		<div className='slide-container'>
			<Fade>
				{data.files.data.map((fadeImage: ImageType, index) => {
					const imageUrl = getStrapiMedia(fadeImage.attributes.url)

					return (
						<div key={index}>
							{imageUrl && (
								<Image
									className='w-full h-96 object-cover rounded-lg'
									height={400}
									width={600}
									alt='alt text'
									src={imageUrl}
								/>
							)}
						</div>
					)
				})}
			</Fade>
		</div>
	)
}

export default Slideshow
