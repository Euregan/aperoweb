import React from 'react';
import PropTypes from 'prop-types';
import { formatDistance, format } from 'date-fns';
import { Col, Row } from 'antd';

import useDataApi from '../lib/useDataApi';
import Layout from '../components/Layout';
import Card, { CardWithLoading, CardWithError } from '../components/Card';

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
        retry,
    } = useDataApi('/api/talks', {
        nextTalk: null,
        plannedTalks: null,
        nextEmptyMonth: null,
    });

    if (isError) {
        return (
            <React.Fragment>
                <CardWithError title="Next talk" onFailureRetry={retry} />
                <CardWithError title="Planned talks" onFailureRetry={retry} />
                <CardWithError title="Next empty month" onFailureRetry={retry} />
            </React.Fragment>
        );
    }

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
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                <NextTalkCard {...nextTalk} />
            </Col>
            <Col span={8}>
                <PlannedTalksCard talks={plannedTalks} />
            </Col>
            <Col span={8}>
                <EmptyMonthCard date={nextEmptyMonth} />
            </Col>
        </React.Fragment>
    );
};

const Communication = () => {
    const {
        data: { nextTweet },
        isLoading,
        isError,
        retry,
    } = useDataApi('/api/communication', {
        nextTweet: null,
    });

    if (isError) return <CardWithError title="Next tweet" onFailureRetry={retry} />;
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
        <Row gutter={16}>
            <Talks />
        </Row>
        <h2>Communication</h2>
        <Row>
            <Col>
                <Communication />
            </Col>
        </Row>
    </Layout>
);

export default Home;
