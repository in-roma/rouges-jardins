import Link from 'next/link';

// Components
import Search from '../../components/microComponents/search';

// Styling
import styles from '../../styles/components/microComponents/SectionBar.module.scss';

export default function SectionBar({
	sectionTitle,
	slug,
	text,
	search = false,
}) {
	return (
		<>
			<div className={styles.containerSectionBar}>
				<div className={styles.sectionBar}>
					<div className={styles.containerTitleSearchSectionBar}>
						<span className={styles.titleSectionBar}>
							{sectionTitle}
						</span>
						<div className={styles.searchSectionBar}>
							{search && <Search />}
						</div>
					</div>
					<Link href={slug}>
						<a className={styles.linkSectionBar}>{text}</a>
					</Link>
				</div>

				<div className={styles.searchMobile}>
					<Search />
				</div>
			</div>
		</>
	);
}
