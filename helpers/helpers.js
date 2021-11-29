// Parser
import parse, {
	domToReact,
	attributesToProps,
	domNode,
} from 'html-react-parser';
import Image from 'next/image';

const parsingContainerMethod = {
	replace: (domNode) => {
		if (domNode.name && domNode.name === 'img') {
			const props = attributesToProps(domNode.attribs);
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
					<Image
						{...props}
						className="img-content-page"
						src={props.src}
						layout="fill"
						objectFit="cover"
						alt=""
					/>
				</div>
			);
		}
	},
};

const parsingContainer = (content) => {
	const parsedContainer = parse(content, parsingContainerMethod);
	return parsedContainer;
};

export default function parsing(content) {
	const parsedContainers = parsingContainer(content);
	return parsedContainers;
}
