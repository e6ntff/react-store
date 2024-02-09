import axios from 'axios';

const getItem = async (id: number) =>
	await axios
		.get(`https://fakestoreapi.com/products/${id}`)
		.then((data) => data.data);

export default getItem;
