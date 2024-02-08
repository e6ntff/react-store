import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { observer } from 'mobx-react-lite';
import store from './utils/store';

const App: React.FC = observer(() => {
	const { setCart } = store;

	useEffect(() => {
		const cartFromStorage = localStorage.getItem('cart');

		if (cartFromStorage) {
			try {
				const parsedCart = JSON.parse(cartFromStorage);
				setCart(parsedCart);
			} catch (error) {
				console.error('Error parsing JSON:', error);
			}
		}
	}, [setCart]);

	return (
		<HashRouter>
			<AppRouter />
		</HashRouter>
	);
});

export default App;
