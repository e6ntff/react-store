import Search from 'antd/es/input/Search';
import { observer } from 'mobx-react-lite';
import React from 'react';
import store from '../utils/store';

const SearchBar: React.FC = observer(() => {
	const { filterItemsByName } = store;
	const search = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		filterItemsByName(value);
	};

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
