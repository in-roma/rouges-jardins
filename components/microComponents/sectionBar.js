import Link from 'next/link';

// Styling
import styles from '../../styles/components/microComponents/SectionBar.module.scss';

export default function SectionBar({ sectionTitle, slug, text }) {
	return (
		<div className={styles.sectionBar}>
			<span className={styles.titleSectionBar}>{sectionTitle}</span>
			<Link href={slug}>
				<a className={styles.linkSectionBar}>{text}</a>
			</Link>
		</div>
	);
}
