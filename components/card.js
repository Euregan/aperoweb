import React from 'react';
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

const CustomCard = ({ title, id, state, className, children }) => (
    <Card
        id={id}
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

export default CustomCard;
