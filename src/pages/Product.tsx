import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Flex, Image, List, Rate, Row, Tag, Typography } from 'antd';
import CatalogButton from '../components/CatalogButton';
import Title from 'antd/es/typography/Title';
import Item from 'antd/es/list/Item';
import AddToCartButton from '../components/AddToCartButton';
import { itemsStore } from '../utils/store';

const Product: React.FC = observer(() => {
	const { currentItem } = itemsStore;
	const { id, title, price, description, category, image, rating } =
		currentItem;
	return (
		<>
			<CatalogButton />
			<Row gutter={[48, 48]}>
				<Col span={12}>
					<Image
						src={image}
						style={{ inlineSize: '20rem' }}
					/>
				</Col>
				<Col span={12}>
					<Flex
						vertical
						align='stretch'
					>
						<Title level={1}>{title}</Title>
						<Flex justify='space-between'>
							<Tag bordered>{category}</Tag>
							<Rate
								disabled
								value={rating.rate}
								allowClear
								allowHalf
							/>
						</Flex>
						<Flex
							justify='space-between'
							align='center'
						>
							<AddToCartButton id={id} />
							<Title level={2}>${price}</Title>
						</Flex>
						<Typography.Text type='secondary'>{description}</Typography.Text>
					</Flex>
				</Col>
			</Row>
			<List>
				<Item></Item>
			</List>
		</>
	);
});

export default Product;
