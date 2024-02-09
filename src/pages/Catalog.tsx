import React from 'react';
import CardsList from '../components/CardsList';
import CategoriesNavigation from '../components/CategoriesNavigation';
import SearchBar from '../components/SearchBar';
import { observer } from 'mobx-react-lite';
import CartButton from '../components/CartButton';
import { Flex } from 'antd';

const Catalog: React.FC = observer(() => {
	return (
		<>
			<Flex gap={16}>
				<SearchBar />
				<CartButton />
			</Flex>
			<CategoriesNavigation />
			<CardsList />
		</>
	);
});

export default Catalog;
