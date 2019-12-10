import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';
import { blue, green, orange, red } from '@ant-design/colors';

const stateToIcon = state => {
    switch (state) {
        case 'pending':
            return 'question-circle';
        case 'valid':
            return 'check-circle';
        case 'warning':
            return 'exclamation-circle';
        case 'error':
            return 'warning';
    }
};

const stateToColor = state => {
    switch (state) {
        case 'pending':
            return blue.primary;
        case 'valid':
            return green.primary;
        case 'warning':
            return orange.primary;
        case 'error':
            return red.primary;
    }
};

const CustomCard = ({ title, state, className, children }) => (
    <Card
        title={title}
        className={className}
        extra={
            state ? (
                <Icon
                    type={stateToIcon(state)}
                    theme="twoTone"
                    twoToneColor={stateToColor(state)}
                />
            ) : (
                ''
            )
        }
    >
        {children}
    </Card>
);

CustomCard.propTypes = {
    title: PropTypes.string.isRequired,
    state: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

CustomCard.defaultProps = {
    className: null,
    state: null,
};

export default CustomCard;
