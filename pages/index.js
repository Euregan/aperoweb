import React, { useState } from 'react';
import { DateTime } from 'luxon';

import fetch from '../lib/fetch';
import { months } from '../lib/date';
import Layout from '../components/Layout';
import Card, { CardWithLoading } from '../components/Card';
import Grid from '../components/Grid';

const Home = () => {
    const [talks, setTalks] = useState('loading');
    const [nextTalk, setNextTalk] = useState('loading');
    const [tweets, setTweets] = useState('loading');
    const [nextTweet, setNextTweet] = useState('loading');

    if (talks === 'loading' && nextTalk === 'loading') {
        const talks = fetch('/talks').catch(error => console.error(error) || []);

        talks.then(setTalks);
        talks
            .then(talks => talks.find(talk => talk && new Date(talk.date) > new Date()))
            .then(setNextTalk);
    }

    if (tweets === 'loading' && nextTweet === 'loading') {
        const tweets = fetch('/tweets').catch(error => console.error(error) || []);

        tweets.then(setTweets);
        tweets
            .then(tweets => tweets.find(tweet => new Date(tweet.date) > new Date()))
            .then(setNextTweet);
    }

    const nextTalkCard =
        nextTalk === 'loading' ? (
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
        talks === 'loading' ? (
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
        talks === 'loading' ? (
            <CardWithLoading title="Next empty month" />
        ) : (
            <Card title="Next empty month">
                {
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
        nextTweet === 'loading' ? (
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
