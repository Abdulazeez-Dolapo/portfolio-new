import RichText from '@/app/[lang]/blog/components/RichText'
import ImageSlider from '@/app/[lang]/blog/components/ImageSlider'
import Quote from '@/app/[lang]/blog/components/Quote'
import Media from '@/app/[lang]/blog/components/Media'
import VideoEmbed from '@/app/[lang]/blog/components/VideoEmbed'

export const postRenderer = (section: any, index: number) => {
	switch (section.__component) {
		case 'shared.rich-text':
			return <RichText key={index} data={section} />
		case 'shared.slider':
			return <ImageSlider key={index} data={section} />
		case 'shared.quote':
			return <Quote key={index} data={section} />
		case 'shared.media':
			return <Media key={index} data={section} />
		case 'shared.video-embed':
			return <VideoEmbed key={index} data={section} />
		default:
			return null
	}
}
