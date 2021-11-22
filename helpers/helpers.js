// Parser
import parse, { domToReact } from 'html-react-parser';

const parsingImage = {
	replace: ({ attribs, children }) => {
		if (!attribs) {
			return;
		}
		if (
			attribs.class &&
			attribs.class.includes('sqs-image-shape-container-element')
		) {
			return (
				<figure
					className="wp-block-image size-full"
					style={{ padding: 0, margin: 0 }}
				>
					{domToReact(children, parsingImage)}
				</figure>
			);
		}
	},
};

const regexSpaces = /<p class="" style="white-space:pre-wrap;">&nbsp;<\/p>\\n/gm;

export default function parsing(content) {
	const parsedContentImage = parse(content, parsingImage);
	// const results = parsedContentImage.replace(
	// 	'J’ai une mon enfance bercée de dictons',
	// 	''
	// );

	return parsedContentImage;
}
