// Parser
import parse, { domToReact } from 'html-react-parser';

const options = {
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
					{domToReact(children, options)}
				</figure>
			);
		}
	},
};

export default function parsing(content) {
	return parse(content, options);
}
