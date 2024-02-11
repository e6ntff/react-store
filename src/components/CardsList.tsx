import React, { useEffect, useState } from 'react';
import { itemsStore } from '../utils/store';
import { Item } from '../utils/interfaces';
import { Empty, Flex, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import getItems from '../utils/getItems';
import CardItem from './CardItem';

const CardsList: React.FC = observer(() => {
	const { currentItems, setItems, setCurrentCategory } = itemsStore;
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	useEffect(() => {
		getItems().then((data: Item[]) => {
			setItems(data);
			setIsLoaded(true);

			const categoryFromStorage = localStorage.getItem('category') || '';
			setCurrentCategory(categoryFromStorage);
		});

		return () => {
			setIsLoaded(false);
		};
	}, [setItems, setCurrentCategory, setIsLoaded]);

	return (
		<>
			{isLoaded ? (
				<Flex
					wrap='wrap'
					justify='space-around'
					gap='1.5rem'
				>
					{currentItems.length ? (
						currentItems.map((item: Item) => (
							<CardItem
								key={item.id}
								item={item}
							/>
						))
					) : (
						<Empty description='No items matched' />
					)}
				</Flex>
			) : (
				<Spin
					size='large'
					fullscreen
				/>
			)}
		</>
	);
});

export default CardsList;
