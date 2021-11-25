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
	const [cartLength, setCartLength] = useState();

	const setQuantity = () => {
		if (cartList.length > 0) {
			let newLength = cartList.reduce(function (acc, obj) {
				return acc + obj.quantity;
			}, 1);
			setCartLength(newLength);
		}
	};

	// Add to cart
	const addBookContext = (bookId, bookPicture, bookTitle, bookPrice) => {
		if (cartList.every((el) => el.id !== bookId)) {
			setCartList((prevBooks) => [
				...prevBooks,
				{
					id: bookId,
					title: bookTitle,
					price: bookPrice,
					quantity: 1,
					picture: bookPicture,
				},
			]);
			setQuantity();
		}
		if (cartList.some((el) => el.id === bookId)) {
			let index = cartList.findIndex((el) => el.id === bookId);
			console.log('this is index', index);
			let newList = cartList;
			newList[index].quantity += 1;
			setCartList(newList);
			setQuantity();
		}
	};
	// Remove from cart
	const removeBookContext = (bookId) => {
		let index = cartList.findIndex((el) => el.id === bookId);

		if (cartList[index] && cartList[index].quantity > 0) {
			console.log('this is index', index);
			let newList = cartList;
			newList[index].quantity -= 1;
			setCartList(newList);
			setQuantity();
		}
	};

	return (
		<AppContext.Provider
			value={{
				searchValue,
				changeValue,
				cartList,
				cartLength,
				addBookContext,
				removeBookContext,
			}}
		>
			<Component {...pageProps} />
		</AppContext.Provider>
	);
}

export default MyApp;
