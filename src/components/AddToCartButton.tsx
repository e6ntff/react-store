import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import store from '../utils/store';
import { ItemInCart } from '../utils/interfaces';

interface Props {
	id: number;
}

const AddToCartButton: React.FC<Props> = observer(({ id }) => {
	const { addItemToCart, removeItemFromCart, cart } = store;

	const isItemInCart = useMemo(
		() => cart.some((el: ItemInCart) => el.item.id === id),
		[cart, id]
	);

	const toggleItemInCart = () => {
		if (isItemInCart) {
			removeItemFromCart(id);
		} else {
			addItemToCart(id);
		}
	};

	return (
		<Button
			onClick={toggleItemInCart}
			type={isItemInCart ? 'primary' : 'default'}
		>
			<ShoppingCartOutlined />
		</Button>
	);
});

export default AddToCartButton;
