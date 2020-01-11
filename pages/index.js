import React from 'react';
import PropTypes from 'prop-types';
import { formatDistance, format } from 'date-fns';
import { Typography, Col, Row } from 'antd';

import useDataApi from '../lib/useDataApi';
import provideAuthentication from '../lib/provideAuthentication';
import Layout from '../components/Layout';
import Card, { CardWithLoading, CardWithError } from '../components/Card';

const { Title } = Typography;

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
    } = useDataApi('/api/talks');

    if (isError) {
        return (
            <React.Fragment>
                <CardWithError title="Next talk" onFailureRetry={retry} />
                <CardWithError title="Planned talks" onFailureRetry={retry} />
                <CardWithError title="Next empty month" onFailureRetry={retry} />
            </React.Fragment>
        );
    }

    if (isLoading) {
        return (
            <React.Fragment>
                <Col>
                    <CardWithLoading title="Next talk" />
                </Col>
                <Col>
                    <CardWithLoading title="Planned talks" />
                </Col>
                <Col>
                    <CardWithLoading title="Next empty month" />
                </Col>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Col>
                <NextTalkCard {...nextTalk} />
            </Col>
            <Col>
                <PlannedTalksCard talks={plannedTalks} />
            </Col>
            <Col>
                <EmptyMonthCard date={nextEmptyMonth} />
            </Col>
        </React.Fragment>
    );
};

const NextTweet = () => {
    const {
        data: { nextTweet },
        isLoading,
        isError,
        retry,
    } = useDataApi('/api/communication');

    if (isError) return <CardWithError title="Next tweet" onFailureRetry={retry} />;
    if (isLoading) return <CardWithLoading title="Next tweet" />;

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

const NoCommunication = () => {
    const {
        data: { plannedTalks },
        isLoading,
        isError,
        retry,
    } = useDataApi('/api/talks', {
        nextTweet: null,
    });

    if (isError) return <CardWithError title="No communication" onFailureRetry={retry} />;
    if (isLoading || !plannedTalks) return <CardWithLoading title="No communication" />;

    return (
        <Card title="No communication">
            <ul>
                {plannedTalks
                    .filter(plannedTalk => plannedTalk.tweets && plannedTalk.tweets.length)
                    .map(plannedTalk => (
                        <li key={plannedTalk.name}>{plannedTalk.name}</li>
                    ))}
            </ul>
        </Card>
    );
};

const Home = () => (
    <Layout>
        <Title level={3}>Talks</Title>
        <Row type="flex" gutter={[16, 16]}>
            <Talks />
        </Row>
        <Title level={3}>Communication</Title>
        <Row type="flex" gutter={[16, 16]}>
            <Col>
                <NextTweet />
            </Col>
            <Col>
                <NoCommunication />
            </Col>
        </Row>
    </Layout>
);

Home.getInitialProps = async ({ req, res }) => {
    const securitySettings = provideAuthentication(req, res);
    return securitySettings;
};

export default Home;
