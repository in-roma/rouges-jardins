import '../styles/globals.scss';
import React, { createContext, useState, useMemo } from 'react';
import { AppContext } from '../lib/context';

function MyApp({ Component, pageProps }) {
	// Posts Volume to fetch - Category - Search value
	const [numberOfPosts, setNumberOfPosts] = useState(40);
	const [category, setCategory] = useState();
	const [searchValue, setSearchValue] = useState('');
	const [searchValuePodcast, setSearchValuePodcast] = useState('');

	const changeNumberOfPosts = (value) => {
		setNumberOfPosts(value);
	};

	const changeCategory = (value) => {
		setCategory(value);
	};

	const changeSearchValue = (value) => {
		setSearchValue(value);
	};

	const changeSearchValuePodcast = (value) => {
		setSearchValuePodcast(value);
	};

	// Cart states
	const [cartList, setCartList] = useState([]);
	const [cartLength, setCartLength] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	const setQuantity = () => {
		if (cartList.length > 0) {
			let newLength = cartList.reduce(function (acc, obj) {
				return acc + obj.quantity;
			}, 0);
			setCartLength(newLength);
		}
	};

	const setTotal = () => {
		if (cartList.length > 0) {
			let newTotal = cartList.reduce(function (acc, obj) {
				return acc + obj.price * obj.quantity;
			}, 0);
			setCartTotal(newTotal);
		}
	};

	// Add to cart
	const addBook = (bookId, bookPicture, bookTitle, bookPrice) => {
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
			setTotal();
		}
		if (cartList.some((el) => el.id === bookId)) {
			let index = cartList.findIndex((el) => el.id === bookId);

			let newList = cartList;
			newList[index].quantity += 1;
			setCartList(newList);
			setQuantity();
			setTotal();
		}
	};
	// Substract quantity
	const substractBook = (bookId) => {
		let index = cartList.findIndex((el) => el.id === bookId);

		if (cartList[index] && cartList[index].quantity > 1) {
			let newList = cartList;
			newList[index].quantity -= 1;
			setCartList(newList);
			setQuantity();
			setTotal();
		}
	};
	/// Remove book from cart
	const removeBook = (bookId) => {
		let newList = cartList.filter((el) => el.id !== bookId);
		setCartList(newList);
		setQuantity();
		setTotal();
	};

	return (
		<AppContext.Provider
			value={{
				numberOfPosts,
				changeNumberOfPosts,
				category,
				changeCategory,
				searchValue,
				changeSearchValue,
				searchValuePodcast,
				changeSearchValuePodcast,
				cartList,
				cartLength,
				addBook,
				removeBook,
				substractBook,
				cartTotal,
			}}
		>
			<Component {...pageProps} />
		</AppContext.Provider>
	);
}

export default MyApp;
