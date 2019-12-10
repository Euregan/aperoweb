import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

const LoadingCard = ({ title }) => <Card title={title} loading={true}></Card>;

LoadingCard.propTypes = {
    title: PropTypes.string.isRequired,
};

export default LoadingCard;
