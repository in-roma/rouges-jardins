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
				<div style={{ padding: 0 }}>
					{domToReact(children, options)}
				</div>
			);
		}
	},
};

export default function parsing(content) {
	return parse(content, options);
}
