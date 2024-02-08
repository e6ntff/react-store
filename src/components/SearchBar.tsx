import Search from 'antd/es/input/Search';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { itemsStore } from '../utils/store';

const SearchBar: React.FC = observer(() => {
	const { filterItemsByName } = itemsStore;
	const search = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			filterItemsByName(value);
		},
		[filterItemsByName]
	);

	return (
		<Search
			placeholder='input search text'
			allowClear
			size='large'
			onChange={search}
		/>
	);
});

export default SearchBar;
