import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface RichTextProps {
	data: {
		body: string
	}
}

const RichText = ({ data }: RichTextProps) => {
	return (
		<section className='rich-text py-6 dark:bg-black dark:text-gray-50 '>
			<Markdown children={data.body} remarkPlugins={[remarkGfm]} />
		</section>
	)
}

export default RichText
