import Image from 'next/image';

// Components
import styles from '../../styles/components/microComponents/Search.module.scss';
import searchPicBlack from '../../public/searchBlack.svg';

export default function Search({ value, search, onChange }) {
	return (
		<form className={styles.formSearch}>
			<label>
				<Image
					className={styles.iconSearch}
					src={searchPicBlack}
					alt="cross icon"
				/>
			</label>
			<input
				className={styles.inputSearch}
				placeholder="Entrez votre recherche"
				autoFocus
				maxlength="40"
				value={value}
				onChange={onChange}
			></input>
			<div className={styles.buttonSearch} onClick={search({ value })}>
				OK
			</div>
		</form>
	);
}
