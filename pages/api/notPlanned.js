import { getTalks } from '../../lib/airtable';

export default async (req, res) => {
    try {
        const talks = await getTalks();
        const notPlanned = talks.filter(talk => !talk.date);

        return res.status(200).json({ notPlanned });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
