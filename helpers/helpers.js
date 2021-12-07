// Parser
import parse, {
	domToReact,
	attributesToProps,
	domNode,
} from 'html-react-parser';
import Image from 'next/image';

const parsingContainerMethod = {
	replace: ({ attribs, children, name }) => {
		if (!attribs) {
			return;
		}
		if (
			(attribs.class &&
				attribs.class.includes('sqs-image-shape-container-element')) ||
			attribs.class === 'wp-block-image size-large' ||
			attribs.class === 'wp-block-image size-full'
		) {
			return (
				<div
					className="container-img-content-page"
					style={{
						display: 'block',
						position: 'relative',
						borderRadius: '6px',
						overflow: 'hidden',
					}}
				>
					{domToReact(children, parsingContainerMethod)}
				</div>
			);
		}
		if (name === 'p' && attribs === 'data-rte-preserve-empty') {
			return <></>;
		}
		if (
			(attribs.class && attribs.class.includes('wp-image')) ||
			(attribs.class && attribs.class.includes('thumb-image'))
		) {
			return (
				<Image
					className="img-content-page"
					src={attribs.src && attribs.src}
					layout="fill"
					objectFit="cover"
					alt={attribs.alt && attribs.alt}
				/>
			);
		}
	},
	// replace: (domNode) => {
	// 	if (domNode.name && domNode.name === 'img') {
	// 		const props = attributesToProps(domNode.attribs);
	// 		return (
	// 			<Image
	// 				className="img-content-page"
	// 				src={props.src && props.src}
	// 				layout="fill"
	// 				objectFit="cover"
	// 				alt={props.alt && props.alt}
	// 			/>
	// 		);
	// 	}
	// },
};

export default function parsing(content) {
	const parsedContainer = parse(content, parsingContainerMethod);
	return parsedContainer;
}
