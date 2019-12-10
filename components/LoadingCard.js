import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

// todo rename CardWithLoading or uselss component ?
const LoadingCard = ({ title }) => <Card title={title} loading={true}></Card>;

LoadingCard.propTypes = {
    title: PropTypes.string,
};

LoadingCard.defaultTypes = {
    title: '',
};

export default LoadingCard;
