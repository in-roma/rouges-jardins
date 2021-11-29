// Parser
import parse, {
	domToReact,
	attributesToProps,
	domNode,
} from 'html-react-parser';
import Image from 'next/image';

const parsingContainerMethod = {
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
	},
	replace: (domNode) => {
		if (domNode.name && domNode.name === 'img') {
			const props = attributesToProps(domNode.attribs);
			return (
				<Image
					className="img-content-page"
					src={props.src}
					layout="fill"
					objectFit="cover"
					alt={props.alt}
				/>
			);
		}
	},
};

export default function parsing(content) {
	const parsedContainer = parse(content, parsingContainerMethod);
	return parsedContainer;
}
