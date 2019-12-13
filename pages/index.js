import React from 'react';
import { formatDistance } from 'date-fns';

import useDataApi from '../lib/useDataApi';
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
    //todo improve in next PR
    const {
        data: { talks },
        isLoading: isLoadingTalks,
        isError: isErrorTalks,
    } = useDataApi('/api/talks', {
        talks: [],
    });

    const {
        data: { tweets },
        isLoading: isLoadingTweets,
        isError: isErrorTweets,
    } = useDataApi('/api/tweets', {
        tweets: [],
    });

    const isLoadingTalksElement = isLoadingTalks || isErrorTalks || !talks.length;
    const isLoadingTweetsElement = isLoadingTweets || isErrorTweets || !tweets.length;

    let nextTalk = {};
    if (!isLoadingTalksElement) {
        nextTalk = talks.find(talk => new Date(talk.date) > new Date());
    }
    let nextTweet = {};
    if (!isLoadingTweetsElement) {
        nextTweet = tweets.find(tweet => new Date(tweet.date) > new Date());
    }

    const nextTalkCard = isLoadingTalksElement ? (
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

    const plannedTalksCard = isLoadingTalksElement ? (
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

    const nextEmptyMonthCard = isLoadingTalksElement ? (
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

    const nextTweetCard = isLoadingTweetsElement ? (
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
