import React from 'react';
import CardsList from '../components/CardsList';
import CategoriesNavigation from '../components/CategoriesNavigation';
import SearchBar from '../components/SearchBar';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import CartButton from '../components/CartButton';

const HeaderWrapper = styled.div`
	display: flex;
	gap: 1.5rem;
	justify-content: space-between;
`;

const Catalog: React.FC = observer(() => {
	return (
		<>
			<HeaderWrapper>
				<SearchBar />
				<CartButton />
			</HeaderWrapper>
			<CategoriesNavigation />
			<CardsList />
		</>
	);
});

export default Catalog;
