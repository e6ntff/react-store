import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from '../utils/paths';
import { cartStore } from '../utils/store';

const OrderButton: React.FC = observer(() => {
	const { setOrder } = cartStore;

	const navigate = useNavigate();

	const makeOrder = useCallback(() => {
		setOrder();
		navigate(paths.accepted);
	}, [setOrder, navigate]);

	return (
		<Button
			type='primary'
			onClick={makeOrder}
		>
			Order
		</Button>
	);
});

export default OrderButton;
