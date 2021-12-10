import Image from 'next/image';
import { useState } from 'react';
import Media from 'react-media';

// Components
import styles from '../../styles/components/microComponents/Search.module.scss';
import searchPicBlack from '../../public/searchBlack.svg';
import crossIcon from '../../public/crossBlack.svg';

export default function Search({ value, onSubmitSearch, onChangeInput }) {
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
				maxLength="40"
				onChange={onChangeInput}
				value={value}
			></input>

			<button className={styles.buttonSearch} onClick={onSubmitSearch}>
				OK
			</button>
		</form>
	);
}
