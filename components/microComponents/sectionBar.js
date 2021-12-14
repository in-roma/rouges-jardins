import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

// Components
import Search from '../../components/microComponents/search';
import searchPicBlack from '../../public/searchBlack.svg';
import crossIcon from '../../public/crossBlack.svg';

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
	const [searchMobileActive, setSearchMobileActive] = useState(true);
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
								<>
									<div
										className={styles.searchInputContainer}
									>
										<Search
											search={search}
											onChangeInput={onChangeInput}
											onSubmitSearch={onSubmitSearch}
											value={value}
											autofocusSet={false}
										/>
									</div>

									<div
										className={
											styles.iconSearchMobileBlogSearch
										}
										onClick={() =>
											!searchMobileActive
												? setSearchMobileActive(true)
												: setSearchMobileActive(false)
										}
									>
										{!searchMobileActive ? (
											<Image
												src={searchPicBlack}
												alt="search icon"
											/>
										) : (
											<Image
												src={crossIcon}
												alt="close icon"
											/>
										)}
									</div>
								</>
							)}
						</div>
					</div>
					{text && (
						<Link href={slug}>
							<a className={styles.linkSectionBar}>{text}</a>
						</Link>
					)}
				</div>

				{/* <div className={styles.searchMobile} value={value}>
					{search && searchMobileActive && (
						<Search autofocusSet={true} />
					)}
				</div> */}

				{search && searchMobileActive ? (
					<div className={styles.searchInputMobileContainerBlog}>
						<Search
							// value={searchValue}
							// onChangeInput={onChangeInput}
							// onSubmitSearch={searchPosts}
							autofocusSet={true}
						/>
						{/* <div
							className={styles.iconSearchMobileBlogClose}
							onClick={() => setSearchMobileActive(false)}
						>
							<Image src={crossIcon} alt="close icon" />
						</div> */}
					</div>
				) : null}
			</section>
		</>
	);
}
