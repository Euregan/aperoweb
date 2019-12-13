import React from 'react';
import { formatDistance, format } from 'date-fns';

import useDataApi from '../lib/useDataApi';
import Layout from '../components/Layout';
import Card, { CardWithLoading } from '../components/Card';
import Grid from '../components/Grid';

const NextTalkCard = ({ talk }) => {
    if (!talk) {
        return <CardWithLoading title="Next talk" />;
    }

    const { date, name, speakers } = talk;
    return (
        <Card title="Next talk">
            <div>{formatDistance(new Date(date), new Date())}</div>
            <div>{name}</div>
            <ul>
                {speakers.map(speaker => (
                    <li key={speaker.name}>{speaker.name}</li>
                ))}
            </ul>
        </Card>
    );
};

const PlannedTalksCard = ({ talks }) => {
    if (!talks) {
        return <CardWithLoading title="Planned talks" />;
    }
    return (
        <Card title="Planned talks">
            {talks.map(talk => (
                <div key={talk.name}>{talk.name}</div>
            ))}
        </Card>
    );
};

const EmptyMonthCard = ({ date }) => {
    if (!date) {
        return <CardWithLoading title="Next empty month" />;
    }
    return <Card title="Next empty month">{format(new Date(date), 'MMMM')}</Card>;
};

const Talks = () => {
    const {
        data: { nextTalk, plannedTalks, nextEmptyMonth },
        isError,
    } = useDataApi('/api/talks', {
        nextTalk: null,
        plannedTalks: null,
        nextEmptyMonth: null,
    });

    if (isError) return <CardWithLoading />;

    return (
        <React.Fragment>
            <NextTalkCard talk={nextTalk} />
            <PlannedTalksCard talks={plannedTalks} />
            <EmptyMonthCard date={nextEmptyMonth} />
        </React.Fragment>
    );
};

const Communication = () => {
    const {
        data: { nextTweet },
        isError,
    } = useDataApi('/api/communication', {
        nextTweet: null,
    });

    if (isError) return <CardWithLoading title="Next tweet" />;
    if (nextTweet === null) return <CardWithLoading title="Next tweet" />;

    if (!nextTweet) {
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
