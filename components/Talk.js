import React from 'react';
import PropTypes from 'prop-types';

import { months, days } from '../lib/date';
import Card from './Card';

const Talk = ({ talk }) => (
    <Card
        className="talk"
        title={talk.date ? months[new Date(talk.date).getMonth()] : talk.name}
        state={talk.date ? 'valid' : 'pending'}
    >
        {talk.date ? (
            <div className="date">
                {days[new Date(talk.date).getDay() - 1]} {new Date(talk.date).getDate()}
            </div>
        ) : (
            ''
        )}
        {talk.date ? <div className="name">{talk.name || 'TBD'}</div> : ''}
        <ul className="speakers">
            {talk.speakers.map(({ name }) => (
                <li key={name}>{name}</li>
            ))}
        </ul>
    </Card>
);

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
