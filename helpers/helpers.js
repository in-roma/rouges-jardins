// Parser
import parse, {
	domToReact,
	attributesToProps,
	domNode,
} from 'html-react-parser';
import Image from 'next/image';

const parsingImageContainer = {
	replace: ({ attribs, children }) => {
		if (!attribs) {
			return;
		}
		if (
			attribs.class &&
			attribs.class.includes('sqs-image-shape-container-element')
		) {
			return (
				<div
					className="containerImagePage"
					style={{
						display: 'block',
						position: 'relative',
						borderRadius: '6px',
						overflow: 'hidden',
					}}
				>
					{domToReact(children, parsingImageContainer)}
				</div>
			);
		}
	},
	replace: (domNode) => {
		if (domNode.attribs && domNode.attribs.class === 'thumb-image') {
			const props = attributesToProps(domNode.attribs);
			return <Image {...props} layout="fill" objectFit="cover" alt="" />;
		}
	},
};

export default function parsing(content) {
	const parsedContainer = parse(content, parsingImageContainer);

	return parsedContainer;
}

// const parsingImageContainer = {
// 	replace: ({ attribs, children }) => {
// 		if (!attribs) {
// 			return;
// 		}
// 		if (
// 			attribs.class &&
// 			attribs.class.includes('sqs-image-shape-container-element')
// 		) {
// 			return (
// 				<figure
// 					className="wp-block-image size-full"
// 					style={{ padding: 0, margin: 0 }}
// 				>
// 					{domToReact(children, parsingImageContainer)}
// 				</figure>
// 			);
// 		}
// 	},
// };
