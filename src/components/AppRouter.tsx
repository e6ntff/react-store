import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import paths from '../utils/paths';
import Catalog from '../pages/Catalog';
import Cart from '../pages/Cart';
import OrderAccepted from '../pages/OrderAccepted';
import Product from '../pages/Product';

const AppRouter: React.FC = () => {
	return (
		<Routes>
			<Route
				path={paths.accepted}
				element={<OrderAccepted />}
			></Route>
			<Route
				path={paths.cart}
				element={<Cart />}
			></Route>
			<Route
				path={paths.product}
				element={<Product />}
			></Route>
			<Route
				path={paths.catalog}
				element={<Catalog />}
			></Route>
			<Route
				path='/*'
				element={<Navigate to={paths.catalog} />}
			></Route>
		</Routes>
	);
};

export default AppRouter;
