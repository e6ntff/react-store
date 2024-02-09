import React, { useCallback, useEffect } from 'react';
import { itemsStore } from '../utils/store';
import { Item } from '../utils/interfaces';
import {
	Card,
	CardProps,
	Empty,
	Flex,
	Image,
	Popover,
	Rate,
	Spin,
	Tag,
	Typography,
} from 'antd';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import paths from '../utils/paths';
import AddToCartButton from './AddToCartButton';
import Title from 'antd/es/typography/Title';
import getItems from '../utils/getItems';

const CardStyles: CardProps['styles'] = {
	header: { inlineSize: '20rem', paddingBlock: '0', paddingInline: '1rem' },
	body: { padding: '1rem', inlineSize: '20rem', textAlign: 'right' },
	extra: {},
	title: {},
	actions: {},
	cover: {
		inlineSize: '20rem',
		blockSize: '20rem',
		overflow: 'hidden',
	},
};

const CardsList: React.FC = observer(() => {
	const {
		currentItems,
		setCurrentItemId,
		setItems,
		setCurrentCategory,
		isItemsLoaded,
		setIsItemsLoaded,
	} = itemsStore;

	useEffect(() => {
		getItems().then((data: Item[]) => {
			setItems(data);
			setIsItemsLoaded(true);

			const categoryFromStorage = localStorage.getItem('category') || '';
			setCurrentCategory(categoryFromStorage);
		});

		return () => {
			setIsItemsLoaded(false);
		};
	}, [setItems, setCurrentCategory, setIsItemsLoaded]);

	const navigate = useNavigate();

	const updateItem = useCallback(
		(id: number) => {
			setCurrentItemId(id);
			navigate(paths.product);
		},
		[setCurrentItemId, navigate]
	);

	return (
		<>
			{isItemsLoaded ? (
				<Flex
					wrap='wrap'
					justify='space-around'
					gap='1.5rem'
				>
					{currentItems.length ? (
						currentItems.map((item: Item) => (
							<Card
								key={item.id}
								title={
									<Popover
										key={item.id}
										title={item.title}
										content={item.description}
										style={{ inlineSize: '2rem' }}
									>
										{item.title}
									</Popover>
								}
								cover={
									<Image
										onClick={() => updateItem(item.id)}
										src={item.image}
										alt={item.title}
									/>
								}
								styles={CardStyles}
								hoverable
								type='inner'
								extra={[
									<AddToCartButton
										key={`add-to-cart-${item.id}`}
										id={item.id}
									/>,
								]}
								actions={[
									<Flex
										align='center'
										justify='space-between'
									>
										<Flex gap={8}>
											<Rate
												disabled
												value={item.rating.rate}
												allowClear
												allowHalf
											/>
											<Typography.Text type='secondary'>
												{item.rating.count}
											</Typography.Text>
										</Flex>
										<Tag bordered>{item.category}</Tag>
									</Flex>,
								]}
							>
								<Title level={3}>${item.price}</Title>
							</Card>
						))
					) : (
						<Empty description='No items matched' />
					)}
				</Flex>
			) : (
				<Spin
					size='large'
					fullscreen
				/>
			)}
		</>
	);
});

export default CardsList;
