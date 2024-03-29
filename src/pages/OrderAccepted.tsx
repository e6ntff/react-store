import { Button, Image, List } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ItemInCart } from '../utils/interfaces';
import Item from 'antd/es/list/Item';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import paths from '../utils/paths';
import { cartStore } from '../utils/store';

const OrderAccepted: React.FC = observer(() => {
	const { order, total } = cartStore;

	const navigate = useNavigate();

	return (
		<List
			size='small'
			itemLayout='vertical'
		>
			<Title level={1}>Thanks for your order!</Title>
			{order.length ? (
				order.map((item: ItemInCart) => (
					<Item
						key={item.item.id}
						actions={[
							<Title level={3}>
								{item.quantity} pcs / ${item.item.price * item.quantity}
							</Title>,
						]}
						extra={
							<Image
								style={{ blockSize: '10rem' }}
								src={item.item.image}
							/>
						}
					>
						<Title level={2}>{item.item.title}</Title>
					</Item>
				))
			) : (
				<></>
			)}
			<Title level={2}>Total: ${total}</Title>
			<Button
				type='primary'
				onClick={() => navigate(paths.catalog)}
			>
				Go to catalog
			</Button>
		</List>
	);
});

export default OrderAccepted;
