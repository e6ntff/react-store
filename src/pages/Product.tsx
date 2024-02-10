import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Col, Flex, Image, Rate, Row, Spin, Tag, Typography } from 'antd';
import CatalogButton from '../components/CatalogButton';
import Title from 'antd/es/typography/Title';
import AddToCartButton from '../components/AddToCartButton';
import { itemsStore } from '../utils/store';
import { Item } from '../utils/interfaces';
import getItem from '../utils/getItem';

const Product: React.FC = observer(() => {
	const { currentItemId, items } = itemsStore;
	const [currentItem, setCurrentItem] = useState<Item>(items[0]);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	useEffect(() => {
		getItem(currentItemId).then((data: Item) => {
			setCurrentItem(data);
			setIsLoaded(true);
		});
		return () => {
			setIsLoaded(false);
		};
	}, [setCurrentItem, setIsLoaded, currentItemId]);

	return (
		<>
			<CatalogButton />
			{isLoaded ? (
				<>
					<Row gutter={[48, 48]}>
						<Col span={12}>
							<Image
								src={currentItem.image}
								style={{ inlineSize: '20rem' }}
							/>
						</Col>
						<Col span={12}>
							<Flex
								vertical
								align='stretch'
							>
								<Title level={1}>{currentItem.title}</Title>
								<Flex justify='space-between'>
									<Tag bordered>{currentItem.category}</Tag>
									<Rate
										disabled
										value={currentItem.rating.rate}
										allowClear
										allowHalf
									/>
								</Flex>
								<Flex
									justify='space-between'
									align='center'
								>
									<AddToCartButton id={currentItem.id} />
									<Title level={2}>${currentItem.price}</Title>
								</Flex>
								<Typography.Text type='secondary'>
									{currentItem.description}
								</Typography.Text>
							</Flex>
						</Col>
					</Row>
				</>
			) : (
				<Spin
					size='large'
					fullscreen
				/>
			)}
		</>
	);
});

export default Product;
