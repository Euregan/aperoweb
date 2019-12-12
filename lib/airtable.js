import unfetch from 'isomorphic-unfetch';

const fetch = async endpoint => {
    const response = await unfetch(`https://api.airtable.com/v0/appAcSNaTeutPmqP0${endpoint}`, {
        headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}` },
    });

    const { records } = await response.json();
    if (response.ok) {
        return records;
    }

    throw new Error(response.statusText);
};

const getTalks = async () => {
    const [talks, speakers] = await Promise.all([
        fetch(
            "/talk?filterByFormula=IF(date = BLANK(), 1, IS_AFTER(date, DATEADD(NOW(), -1, 'months')))&sort[0][field]=date",
        ),
        fetch('/speaker'),
    ]);

    return talks.map(talk => ({
        ...talk.fields,
        speakers: talk.fields.speakers.map(
            speakerId => speakers.find(speaker => speaker.id === speakerId).fields,
        ),
    }));
};

const getTweets = async () => {
    const [tweets, talks] = await Promise.all([fetch('/twitter'), fetch('/talk')]);
    return tweets.map(tweet => ({
        ...tweet.fields,
        talk: tweet.fields.talk.map(talkId => talks.find(talk => talk.id === talkId).fields)[0], // There can be only one talk
    }));
};

export { getTalks, getTweets };
