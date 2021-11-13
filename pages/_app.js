import '../styles/globals.scss';
import React, { createContext, useState, useMemo } from 'react';
import { AppContext } from '../lib/context';

function MyApp({ Component, pageProps }) {
	const [searchValue, setSearchValue] = useState('');
	const changeValue = (value) => {
		setSearchValue(value);
	};
	const [postsViewed, setPostsViewed] = useState([]);
	const changePostsViewed = (post) => {
		let newArr = postsViewed;
		newArr.push(post);
		setPostsViewed(newArr);
	};

	return (
		<AppContext.Provider
			value={{ searchValue, changeValue, postsViewed, changePostsViewed }}
		>
			<Component {...pageProps} />
		</AppContext.Provider>
	);
}

export default MyApp;
