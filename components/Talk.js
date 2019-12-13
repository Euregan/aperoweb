import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Card from './Card';

const Talk = ({ talk }) => {
    if (!talk.name) {
        return (
            <Card className="talk" title={format(new Date(talk.date), 'MMMM')} state="pending">
                Pending
            </Card>
        );
    }

    if (talk.date) {
        return (
            <Card className="talk" title={format(new Date(talk.date), 'MMMM')} state="valid">
                <div className="date">{format(new Date(talk.date), 'EEEE dd')}</div>
                <div className="name">{talk.name}</div>
                <ul className="speakers">
                    {talk.speakers.map(({ name }) => (
                        <li key={name}>{name}</li>
                    ))}
                </ul>
            </Card>
        );
    }

    return (
        <Card className="talk" title={talk.name} state="pending">
            <ul className="speakers">
                {talk.speakers.map(({ name }) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
        </Card>
    );
};

Talk.propTypes = {
    talk: PropTypes.shape({
        name: PropTypes.string,
        date: PropTypes.string,
        speakers: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
            }).isRequired,
        ),
    }).isRequired,
};

export default Talk;
