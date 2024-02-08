import axios from 'axios';

const getItems = async () =>
	await axios
		.get('https://fakestoreapi.com/products')
		.then((data) => data.data);

export default getItems;
