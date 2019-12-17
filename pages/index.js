import React from 'react';
import PropTypes from 'prop-types';
import { formatDistance, format } from 'date-fns';

import useDataApi from '../lib/useDataApi';
import Layout from '../components/Layout';
import Card, { CardWithLoading } from '../components/Card';
import Grid from '../components/Grid';

const NextTalkCard = ({ date, name, speakers }) => (
    <Card title="Next talk">
        <div>{formatDistance(new Date(date), new Date())}</div>
        <div>{name}</div>
        <ul>
            {speakers.map(({ name }) => (
                <li key={name}>{name}</li>
            ))}
        </ul>
    </Card>
);

NextTalkCard.propTypes = {
    date: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    speakers: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })).isRequired,
};

const PlannedTalksCard = ({ talks }) => (
    <Card title="Planned talks">
        <ul className="talks">
            {talks.map(({ name }) => (
                <li key={name}>{name}</li>
            ))}
        </ul>
    </Card>
);

PlannedTalksCard.propTypes = {
    talks: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })).isRequired,
};

const EmptyMonthCard = ({ date }) => (
    <Card title="Next empty month">{format(new Date(date), 'MMMM')}</Card>
);

EmptyMonthCard.propTypes = {
    date: PropTypes.string.isRequired,
};

const Talks = () => {
    const {
        data: { nextTalk, plannedTalks, nextEmptyMonth },
        isLoading,
        isError,
    } = useDataApi('/api/talks', {
        nextTalk: null,
        plannedTalks: null,
        nextEmptyMonth: null,
    });

    if (isError) return <CardWithLoading />;
    if (isLoading || !nextTalk || !plannedTalks || !nextEmptyMonth) {
        return (
            <React.Fragment>
                <CardWithLoading title="Next talk" />
                <CardWithLoading title="Planned talks" />
                <CardWithLoading title="Next empty month" />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <NextTalkCard {...nextTalk} />
            <PlannedTalksCard talks={plannedTalks} />
            <EmptyMonthCard date={nextEmptyMonth} />
        </React.Fragment>
    );
};

const Communication = () => {
    const {
        data: { nextTweet },
        isLoading,
        isError,
    } = useDataApi('/api/communication', {
        nextTweet: null,
    });

    if (isError) return <CardWithLoading title="Next tweet" />;
    if (isLoading || !nextTweet) return <CardWithLoading title="Next tweet" />;

    if (!nextTweet.date) {
        return (
            <Card title="Next tweet" state="error">
                <div>No tweet has been prepared!</div>
            </Card>
        );
    }

    return (
        <Card title="Next tweet" state="error">
            <div>{formatDistance(new Date(nextTweet.date), new Date())}</div>
            <div>{nextTweet.talk.name}</div>
        </Card>
    );
};

const Home = () => (
    <Layout>
        <h2>Talks</h2>
        <Grid>
            <Talks />
        </Grid>
        <h2>Communication</h2>
        <Grid>
            <Communication />
        </Grid>
    </Layout>
);

export default Home;
