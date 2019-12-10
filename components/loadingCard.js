import React from 'react';
import { Card } from 'antd';

const LoadingCard = ({ title }) => <Card title={title} loading={true}></Card>;

export default LoadingCard;
