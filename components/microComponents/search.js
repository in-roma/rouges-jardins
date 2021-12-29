import Image from 'next/image';

// Components
import styles from '../../styles/components/microComponents/Search.module.scss';
import searchPicBlack from '../../public/searchBlack.svg';

export default function Search({
	value,
	onSubmitSearch,
	onChangeInput,
	autofocusSet,
}) {
	return (
		<form className={styles.formSearch}>
			<label htmlFor="inputSearch">
				<Image
					className={styles.iconSearch}
					src={searchPicBlack}
					alt="search icon"
				/>
			</label>

			{autofocusSet ? (
				<input
					id="inputSearch"
					className={styles.inputSearch}
					placeholder="Entrez votre recherche"
					maxLength="40"
					onChange={onChangeInput}
					value={value}
					autoFocus
				></input>
			) : (
				<input
					id="inputSearch"
					className={styles.inputSearch}
					placeholder="Entrez votre recherche"
					maxLength="40"
					onChange={onChangeInput}
					value={value}
				></input>
			)}

			<button className={styles.buttonSearch} onClick={onSubmitSearch}>
				OK
			</button>
		</form>
	);
}
