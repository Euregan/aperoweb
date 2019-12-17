import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Card from './Card';

const Talk = ({ name, date, speakers }) => {
    if (!name) {
        return (
            <Card className="talk" title={format(new Date(date), 'MMMM')} state="pending">
                Pending
            </Card>
        );
    }

    if (date) {
        return (
            <Card className="talk" title={format(new Date(date), 'MMMM')} state="valid">
                <div className="date">{format(new Date(date), 'EEEE dd')}</div>
                <div className="name">{name}</div>
                <ul className="speakers">
                    {speakers.map(({ name }) => (
                        <li key={name}>{name}</li>
                    ))}
                </ul>
            </Card>
        );
    }

    return (
        <Card className="talk" title={name} state="pending">
            <ul className="speakers">
                {speakers.map(({ name }) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
        </Card>
    );
};

Talk.propTypes = {
    name: PropTypes.string,
    date: PropTypes.string,
    speakers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    ),
};

export default Talk;
