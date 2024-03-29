import { RollbackOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import paths from '../utils/paths';

const CatalogButton: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Button
			onClick={() => navigate(paths.catalog)}
			icon={<RollbackOutlined style={{ scale: '1.25' }} />}
			size='large'
		></Button>
	);
};

export default CatalogButton;
