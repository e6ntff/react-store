import { Anchor, Radio, RadioChangeEvent } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { itemsStore } from '../utils/store';
import getItems from '../utils/getItems';
import { Item } from '../utils/interfaces';
import { observer } from 'mobx-react-lite';

const CategoriesNavigation: React.FC = observer(() => {
	const { setItems, setCurrentCategory, currentCategory } = itemsStore;

	useEffect(() => {
		getItems().then((data: Item[]) => {
			setItems(data);
			const categoryFromStorage = localStorage.getItem('category') || '';
			setCurrentCategory(categoryFromStorage);
		});
	}, [setItems, setCurrentCategory]);

	const changeCategory = useCallback(
		(event: RadioChangeEvent) => {
			const { value } = event.target;
			value && setCurrentCategory(value);
		},
		[setCurrentCategory]
	);

	return (
		<Radio.Group
			value={currentCategory}
			onChange={changeCategory}
			buttonStyle='solid'
		>
			<Radio.Button value={`men's clothing`}>Men's Clothing</Radio.Button>
			<Radio.Button value={`women's clothing`}>Women's Clothing</Radio.Button>
			<Radio.Button value='jewelery'>Jewelery</Radio.Button>
			<Radio.Button value='electronics'>Electronics</Radio.Button>
		</Radio.Group>
	);
});

export default CategoriesNavigation;
