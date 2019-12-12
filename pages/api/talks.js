import { getTalks } from '../../lib/airtable';

export default async (req, res) => {
    try {
        const talks = await getTalks();

        return res.status(200).json({ talks });
    } catch (error) {
        return res.status(500).json({ error });
    }
};
