import '../styles/globals.scss';
import React, { createContext, useState, useMemo } from 'react';
import { AppContext } from '../lib/context';

function MyApp({ Component, pageProps }) {
	const [searchValue, setSearchValue] = useState('');
	const changeValue = (value) => {
		setSearchValue(value);
	};

	return (
		<AppContext.Provider value={{ searchValue, changeValue }}>
			<Component {...pageProps} />
		</AppContext.Provider>
	);
}

export default MyApp;
