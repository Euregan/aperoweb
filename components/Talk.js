import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import Card from './Card';

const Talk = ({ talk }) => {
    if (!talk) {
        return (
            <Card title={DateTime.fromISO(new Date().toISOString()).monthLong} state="pending">
                Pending
            </Card>
        );
    }

    if (talk.date) {
        return (
            <Card className="talk" title={DateTime.fromISO(talk.date).monthLong} state="valid">
                <div className="date">{DateTime.fromISO(talk.date).toFormat('cccc dd')}</div>
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
        name: PropTypes.string.isRequired,
        date: PropTypes.string,
        speakers: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
            }).isRequired,
        ).isRequired,
    }),
};

Talk.defaultProps = {
    talk: null,
};

export default Talk;
