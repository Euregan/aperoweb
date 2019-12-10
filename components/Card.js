import React from 'react';
import PropTypes from 'prop-types';
import { Card as AntCard, Icon } from 'antd';
import { blue, green, orange, red } from '@ant-design/colors';

const stateToIcon = {
    pending: 'question-circle',
    valid: 'check-circle',
    warning: 'exclamation-circle',
    error: 'warning',
};

const stateToColor = {
    pending: blue.primary,
    valid: green.primary,
    warning: orange.primary,
    error: red.primary,
};

const Card = ({ title, state, className, children }) => {
    const extra = state ? (
        <Icon type={stateToIcon[state]} theme="twoTone" twoToneColor={stateToColor[state]} />
    ) : (
        ''
    );

    return (
        <AntCard title={title} className={className} extra={extra}>
            {children}
        </AntCard>
    );
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
    state: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Card.defaultProps = {
    className: null,
    state: null,
};

export default Card;
