import '../styles/globals.scss';
import React, { createContext, useState, useMemo } from 'react';
import { AppContext } from '../lib/context';

function MyApp({ Component, pageProps }) {
	// Search value states between home & blog pages
	const [searchValue, setSearchValue] = useState('');
	const changeValue = (value) => {
		setSearchValue(value);
	};

	// Cart states
	const [cartList, setCartList] = useState([]);
	const [cartLength, setCartLength] = useState(0);

	// Add to cart
	const addBook = (bookId) => {
		if (!cartList.every((el) => el.id !== bookId)) {
			setCartList((prevBooks) => [
				...prevBooks,
				{ id: bookId, quantity: 1 },
			]);
			if (cartList.length > 0) {
				setCartLength(
					cartList.reduce(function (prev, cur) {
						return prev.quantity + cur.quantity;
					})
				);
			}
			console.log('this is cartLength:', cartLength);
		}
	};
	// Remove from cart
	const substractBook = (bookId) => {};

	return (
		<AppContext.Provider
			value={{
				searchValue,
				changeValue,
				cartList,
				cartLength,
				addBook,
				substractBook,
			}}
		>
			<Component {...pageProps} />
		</AppContext.Provider>
	);
}

export default MyApp;
