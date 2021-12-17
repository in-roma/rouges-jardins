// Parser
import parse, {
	domToReact,
	attributesToProps,
	domNode,
} from 'html-react-parser';
import Image from 'next/image';

const parsingContainerMethod = {
	replace: ({ name, attribs, children }) => {
		if (!attribs) {
			return;
		}
		if (
			(attribs.class &&
				attribs.class.includes('sqs-image-shape-container-element')) ||
			attribs.class === 'wp-block-image size-large' ||
			attribs.class === 'wp-block-image size-full' ||
			attribs.class === 'wp-block-image'
		) {
			return (
				<div className="container-img-content-page">
					{domToReact(children, parsingContainerMethod)}
				</div>
			);
		}
		if (name === 'p' && attribs === 'data-rte-preserve-empty') {
			return <></>;
		}
		if (
			name &&
			name === 'img'
			// (attribs.class && attribs.class.includes('wp-image')) ||
			// (attribs.class && attribs.class.includes('thumb-image'))
		) {
			return (
				<div className="wrapper-img-content-page">
					<Image
						className="img-content-page"
						src={attribs.src && attribs.src}
						layout="fill"
						objectFit="cover"
						alt={attribs.alt && attribs.alt}
					/>
				</div>
			);
		}
	},
};

export default function parsing(content) {
	const parsedContainer = parse(content, parsingContainerMethod);
	return parsedContainer;
}
