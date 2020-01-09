import React from 'react';
import PropTypes from 'prop-types';
import { formatDistance, format } from 'date-fns';
import { Typography, Col, Row } from 'antd';

import useDataApi from '../lib/useDataApi';
import provideAuthentication from '../lib/provideAuthentication';
import Layout from '../components/Layout';
import Card, { CardWithNetwork } from '../components/Card';

const { Title } = Typography;

const NextTalkCard = ({ date, name, speakers, requestState }) => (
    <Card title="Next talk" requestState={requestState}>
        {requestState.ifLoaded(() => (
            <>
                <div>{formatDistance(new Date(date), new Date())}</div>
                <div>{name}</div>
                <ul>
                    {speakers.map(({ name }) => (
                        <li key={name}>{name}</li>
                    ))}
                </ul>
            </>
        ))}
    </Card>
);

NextTalkCard.propTypes = {
    date: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    speakers: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })).isRequired,
    requestState: PropTypes.shape({ ifLoaded: PropTypes.func }),
};

const PlannedTalksCard = ({ talks, requestState }) => (
    <Card title="Planned talks" requestState={requestState}>
        {requestState.ifLoaded(() => (
            <ul className="talks">
                {talks.map(({ name }) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
        ))}
    </Card>
);

PlannedTalksCard.propTypes = {
    talks: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })).isRequired,
    requestState: PropTypes.shape({ ifLoaded: PropTypes.func }),
};

const EmptyMonthCard = ({ date, requestState }) => (
    <Card title="Next empty month" requestState={requestState}>
        {requestState.ifLoaded(() => format(new Date(date), 'MMMM'))}
    </Card>
);

EmptyMonthCard.propTypes = {
    date: PropTypes.string.isRequired,
    requestState: PropTypes.shape({ ifLoaded: PropTypes.func }),
};

const Talks = () => {
    const requestState = useDataApi('/api/talks');
    const { nextTalk, plannedTalks, nextEmptyMonth } = requestState.data;

    return (
        <React.Fragment>
            <Col>
                <NextTalkCard {...nextTalk} requestState={requestState} />
            </Col>
            <Col>
                <PlannedTalksCard talks={plannedTalks} requestState={requestState} />
            </Col>
            <Col>
                <EmptyMonthCard date={nextEmptyMonth} requestState={requestState} />
            </Col>
        </React.Fragment>
    );
};

const NextTweet = () => {
    const requestState = useDataApi('/api/communication');
    const nextTweet = requestState.data.nextTweet;

    return (
        <CardWithNetwork title="Next tweet" state="error" requestState={requestState}>
            {requestState.ifLoaded(() => {
                return nextTweet && nextTweet.date ? (
                    <>
                        <div>{formatDistance(new Date(nextTweet.date), new Date())}</div>
                        <div>{nextTweet.talk.name}</div>
                    </>
                ) : (
                    <div>No tweet has been prepared!</div>
                );
            })}
        </CardWithNetwork>
    );
};

const NoCommunication = () => {
    const requestState = useDataApi('/api/talks');
    const plannedTalks = requestState.data.plannedTalks;

    return (
        <CardWithNetwork title="communication" requestState={requestState}>
            {requestState.ifLoaded(() => {
                <ul>
                    {plannedTalks
                        .filter(plannedTalk => plannedTalk.tweets && plannedTalk.tweets.length)
                        .map(plannedTalk => (
                            <li key={plannedTalk.name}>{plannedTalk.name}</li>
                        ))}
                </ul>;
            })}
        </CardWithNetwork>
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
