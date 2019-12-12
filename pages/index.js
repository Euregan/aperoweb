import React from 'react';
import { DateTime, Info } from 'luxon';

import fetch from '../lib/fetch';
import Layout from '../components/Layout';
import Card, { CardWithLoading } from '../components/Card';
import Grid from '../components/Grid';

const Home = () => {
    const [talks, setTalks] = React.useState(null);
    const [nextTalk, setNextTalk] = React.useState(null);
    const [nextTweet, setNextTweet] = React.useState(null);

    React.useEffect(() => {
        const fetchTalks = async () => {
            const { talks } = await fetch('/talks');
            setTalks(talks);
            setNextTalk(talks.find(talk => new Date(talk.date) > new Date()));
        };

        fetchTalks();
    }, []);

    React.useEffect(() => {
        const fetchTweets = async () => {
            const { tweets } = await fetch('/tweets');
            setNextTweet(tweets.find(tweet => new Date(tweet.date) > new Date()));
        };

        fetchTweets();
    }, []);

    const nextTalkCard =
        nextTalk === null ? (
            <CardWithLoading title="Next talk" />
        ) : (
            <Card title="Next talk">
                <div>{DateTime.fromISO(nextTalk.date).toRelative()}</div>
                <div>{nextTalk.name}</div>
                <ul>
                    {nextTalk.speakers.map(speaker => (
                        <li key={speaker.name}>{speaker.name}</li>
                    ))}
                </ul>
            </Card>
        );

    const plannedTalksCard =
        talks === null ? (
            <CardWithLoading title="Planned talks" />
        ) : (
            <Card title="Planned talks">
                {talks
                    .filter(talk => talk && talk.date)
                    .map(talk => (
                        <div key={talk.name}>{talk.name}</div>
                    ))}
            </Card>
        );

    const nextEmptyMonthCard =
        talks === null ? (
            <CardWithLoading title="Next empty month" />
        ) : (
            <Card title="Next empty month">
                {
                    Info.months()[
                        talks.reduce(
                            (lastMonth, talk) =>
                                new Date(talk.date).getMonth() === (lastMonth + 1) % 12
                                    ? (lastMonth + 1) % 12
                                    : lastMonth,
                            new Date().getMonth() - 1,
                        ) + 1
                    ]
                }
            </Card>
        );

    const nextTweetCard =
        nextTweet === null ? (
            <CardWithLoading title="Next tweet" />
        ) : (
            <Card title="Next tweet" state={nextTweet ? '' : 'error'}>
                <div>
                    {nextTweet
                        ? DateTime.fromISO(nextTweet.date).toRelative()
                        : 'No tweet has been prepared!'}
                </div>
                <div>{nextTweet ? nextTweet.talk.name : ''}</div>
            </Card>
        );

    return (
        <Layout>
            <h2>Talks</h2>
            <Grid>
                {nextTalkCard}
                {plannedTalksCard}
                {nextEmptyMonthCard}
            </Grid>
            <h2>Communication</h2>
            <Grid>{nextTweetCard}</Grid>
        </Layout>
    );
};

export default Home;
