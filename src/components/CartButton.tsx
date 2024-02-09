import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from '../utils/paths';
import { observer } from 'mobx-react-lite';
import { cartStore } from '../utils/store';
import { ItemInCart } from '../utils/interfaces';

const CartButton: React.FC = observer(() => {
	const { cart } = cartStore;

	const navigate = useNavigate();

	const redirectToCart = useCallback(() => {
		navigate(paths.cart);
	}, [navigate]);

	const totalItemsInCart = useMemo(
		() =>
			cart.reduce((acc: number, item: ItemInCart) => acc + item.quantity, 0),
		[cart]
	);

	return (
		<Popover
			open={!!cart.length}
			content={totalItemsInCart}
		>
			<Button
				onClick={redirectToCart}
				icon={<ShoppingCartOutlined style={{ scale: '1.25' }} />}
				size='large'
			></Button>
		</Popover>
	);
});

export default CartButton;
