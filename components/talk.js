import React from 'react';

import months from '../utilities/months';
import days from '../utilities/days';
import Card from '../components/card';

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

export default Talk;
