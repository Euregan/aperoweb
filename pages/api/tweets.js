import { getTweets } from '../../lib/airtable';

export default async (req, res) => {
    try {
        const tweets = await getTweets();

        return res.status(200).json({ tweets });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
