import { Anchor } from 'antd';
import React, { useCallback, useEffect } from 'react';
import store from '../utils/store';
import getItems from '../utils/getItems';
import { Item } from '../utils/interfaces';
import { observer } from 'mobx-react-lite';

const AnchorItems = [
	{ key: 0, href: `#men's clothing`, title: `Men's Clothing` },
	{ key: 1, href: `#women's clothing`, title: `Women's Clothing` },
	{ key: 2, href: '#jewelery', title: 'Jewelery' },
	{ key: 3, href: '#electronics', title: 'Electronics' },
];

const CategoriesNavigation: React.FC = observer(() => {
	const { setItems, setCurrentCategory } = store;

	useEffect(() => {
		getItems().then((data: Item[]) => {
			setItems(data);

			const categoryFromStorage = localStorage.getItem('category') || '';
			setCurrentCategory(categoryFromStorage);
		});
	}, [setItems]);

	const changeCategory = useCallback(
		(name: string) => {
			name && setCurrentCategory(name);
			return name;
		},
		[setCurrentCategory]
	);

	return (
		<Anchor
			direction='horizontal'
			items={AnchorItems}
			// showInkInFixed
			affix
			onChange={changeCategory}
		></Anchor>
	);
});

export default CategoriesNavigation;
