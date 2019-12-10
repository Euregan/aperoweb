import React from 'react';
import PropTypes from 'prop-types';

import { months, days } from '../lib/date';
import Card from './Card';

const Talk = ({ talk }) => {
    if (talk.date) {
        return (
            <Card
                className="talk"
                title={months[new Date(talk.date).getMonth()]} // todo find better way
                state="valid"
            >
                <div className="date">
                    {days[new Date(talk.date).getDay() - 1]} {new Date(talk.date).getDate()}{' '}
                    {/* todo find better way */}
                </div>
                <div className="name">{talk.name || 'TBD'}</div> {/* todo How it's possible? */}
                <ul className="speakers">
                    {talk.speakers.map((
                        { name }, // todo speakers can be never be null?
                    ) => (
                        <li key={name}>{name}</li>
                    ))}
                </ul>
            </Card>
        );
    }

    return (
        <Card className="talk" title={talk.name} state={'pending'}>
            <ul className="speakers">
                {talk.speakers.map((
                    { name }, // todo speakers can be never be null?
                ) => (
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
                name: PropTypes.string,
            }),
        ),
    }).isRequired,
};

export default Talk;
