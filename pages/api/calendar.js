import { addMonths, isSameMonth } from 'date-fns';

import { getTalks } from '../../lib/airtable';

const isTalkPassed = talk => new Date(talk.date) > new Date();

const fillYearEvents = existingTalk => {
    const [firstDate] = existingTalk.map(({ date }) => new Date(date)) || [new Date()];
    return Array.from({ length: 12 }, (_, i) => {
        const currentDate = addMonths(firstDate, i);
        const talk = existingTalk.find(({ date }) => isSameMonth(currentDate, new Date(date)));

        return talk || { date: currentDate };
    });
};

export default async (req, res) => {
    try {
        const talks = await getTalks();
        const calendar = fillYearEvents(talks.filter(isTalkPassed));

        return res.status(200).json({ calendar });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
