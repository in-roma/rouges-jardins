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
	onSubmitSearch,
	onChangeInput,
	value,
	marginBottom,
	style,
}) {
	return (
		<>
			<section className={styles.containerSectionBar} style={style}>
				<div
					className={styles.sectionBar}
					style={{ marginBottom: marginBottom }}
				>
					<div className={styles.containerTitleSearchSectionBar}>
						{sectionTitle && (
							<h1 className={styles.titleSectionBar}>
								{sectionTitle}
							</h1>
						)}
						<div className={styles.searchSectionBar}>
							{search && (
								<Search
									search={search}
									onChangeInput={onChangeInput}
									onSubmitSearch={onSubmitSearch}
									value={value}
								/>
							)}
						</div>
					</div>
					{text && (
						<Link href={slug}>
							<a className={styles.linkSectionBar}>{text}</a>
						</Link>
					)}
				</div>

				<div className={styles.searchMobile} value={value}>
					{search && <Search />}
				</div>
			</section>
		</>
	);
}
