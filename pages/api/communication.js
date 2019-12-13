import { getTweets } from '../../lib/airtable';

export default async (req, res) => {
    try {
        const tweets = await getTweets();
        const nextTweet = tweets.find(tweet => new Date(tweet.date) > new Date()) || {};

        return res.status(200).json({ nextTweet });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
