import { DateTime } from 'luxon';

import { getTalks } from '../../lib/airtable';

const currentDate = DateTime.local();

const isTalkPassed = talk => new Date(talk.date) > new Date();

const createTalkOnMonth = month => ({
    date: currentDate.set({ month }).toISO(),
});

const completeNextYearTalks = sizeCurrentMonth =>
    Array.from(
        {
            length: 12 - sizeCurrentMonth,
        },
        (_, i) => createTalkOnMonth((i + new Date().getMonth() + 1 + sizeCurrentMonth) % 12),
    );

export default async (req, res) => {
    try {
        const talks = await getTalks();

        const futureTalks = talks.filter(isTalkPassed);
        const calendar = [...futureTalks, ...completeNextYearTalks(futureTalks.length)];
        const notPlanned = talks.filter(talk => !talk.date);

        return res.status(200).json({ calendar, notPlanned });
    } catch (error) {
        return res.status(500).json({ error });
    }
};
