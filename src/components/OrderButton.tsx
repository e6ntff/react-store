import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import store from '../utils/store';
import { useNavigate } from 'react-router-dom';
import paths from '../utils/paths';

const OrderButton: React.FC = observer(() => {
	const { setOrder } = store;

	const navigate = useNavigate();

	const makeOrder = () => {
		setOrder();
		navigate(paths.accepted);
	};

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
