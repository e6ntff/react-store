import { Radio, RadioChangeEvent } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { itemsStore } from '../utils/store';
import getItems from '../utils/getItems';
import { Category, Item } from '../utils/interfaces';
import { observer } from 'mobx-react-lite';
import categories from '../utils/categories';

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
			{categories.map((el: Category) => (
				<Radio.Button
					key={el.name}
					value={el.name}
				>
					{el.title}
				</Radio.Button>
			))}
		</Radio.Group>
	);
});

export default CategoriesNavigation;
