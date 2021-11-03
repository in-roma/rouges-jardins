import Image from 'next/image';

// Components
import styles from '../../styles/components/microComponents/Search.module.scss';
import searchPicBlack from '../../public/searchBlack.svg';

export default function Search() {
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
			></input>
			<div className={styles.buttonSearch}>OK</div>
		</form>
	);
}
