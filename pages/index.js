import { useState } from 'react';
import { DateTime } from 'luxon';
import fetch from '../frontside/fetch';
import Layout from '../components/layout';
import Talk from '../components/talk';
import Card from '../components/card';
import Grid from '../components/grid';
import LoadingCard from '../components/loadingCard';
import months from '../utilities/months';

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
            <LoadingCard title="Next talk" lines={3} />
        ) : (
            <Card id="nextTalk" title="Next talk">
                <div>{DateTime.fromISO(nextTalk.date).toRelative()}</div>
                <div>{nextTalk.name}</div>
                <ul>
                    {nextTalk.speakers.map(speaker => (
                        <li>{speaker.name}</li>
                    ))}
                </ul>
            </Card>
        );

    const plannedTalksCard =
        talks === 'loading' ? (
            <LoadingCard title="Planned talks" lines={5} />
        ) : (
            <Card id="plannedTalks" title="Planned talks">
                {talks
                    .filter(talk => talk && talk.date)
                    .map(talk => (
                        <div>{talk.name}</div>
                    ))}
            </Card>
        );

    const nextEmptyMonthCard =
        talks === 'loading' ? (
            <LoadingCard title="Next empty month" lines={2} />
        ) : (
            <Card id="nextEmptyMonth" title="Next empty month">
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
            <LoadingCard title="Next tweet" lines={3} />
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
