import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import paths from '../utils/paths';
import { observer } from 'mobx-react-lite';
import store from '../utils/store';

const CartButton: React.FC = observer(() => {
	const { cart, getItemInCartQuantity } = store;

	const navigate = useNavigate();

	const redirectToCart = () => {
		navigate(paths.cart);
	};

	return (
		<Popover
			open={!!cart.length}
			content={getItemInCartQuantity()}
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
