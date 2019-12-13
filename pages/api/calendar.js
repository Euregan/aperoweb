import { setMonth, getMonth } from 'date-fns';

import { getTalks } from '../../lib/airtable';

const currentDate = new Date();
const currentMonth = getMonth(currentDate);

const isTalkPassed = talk => new Date(talk.date) > new Date();

const createTalkOnMonth = month => ({
    date: setMonth(currentDate, month),
});

const completeNextYearTalks = sizeCurrentMonth =>
    Array.from(
        {
            length: 12 - sizeCurrentMonth,
        },
        (_, i) => createTalkOnMonth((i + currentMonth + sizeCurrentMonth) % 12),
    );

export default async (req, res) => {
    try {
        const talks = await getTalks();

        const futureTalks = talks.filter(isTalkPassed);
        const calendar = [...futureTalks, ...completeNextYearTalks(futureTalks.length)];
        const notPlanned = talks.filter(talk => !talk.date);

        return res.status(200).json({ calendar, notPlanned });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
