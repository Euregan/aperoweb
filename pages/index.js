import React from 'react';
import { formatDistance } from 'date-fns';

import fetch from '../lib/fetch';
import Layout from '../components/Layout';
import Card, { CardWithLoading } from '../components/Card';
import Grid from '../components/Grid';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const Home = () => {
    const [talks, setTalks] = React.useState(null);
    const [nextTalk, setNextTalk] = React.useState(null);
    const [nextTweet, setNextTweet] = React.useState(null);

    React.useEffect(() => {
        const fetchTalks = async () => {
            const { talks, error } = await fetch('/talks');
            if (error) {
                return console.error(error);
            }

            setTalks(talks);
            setNextTalk(talks.find(talk => new Date(talk.date) > new Date()));
        };

        fetchTalks();
    }, []);

    React.useEffect(() => {
        const fetchTweets = async () => {
            const { tweets, error } = await fetch('/tweets');
            if (error) {
                return console.log(error);
            }

            setNextTweet(tweets.find(tweet => new Date(tweet.date) > new Date()));
        };

        fetchTweets();
    }, []);

    const nextTalkCard =
        nextTalk === null ? (
            <CardWithLoading title="Next talk" />
        ) : (
            <Card title="Next talk">
                <div>{formatDistance(new Date(nextTalk.date), new Date())}</div>
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
                    // todo another PR, put this logic on API side
                    months[
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
                        ? formatDistance(new Date(nextTweet.date), new Date())
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
