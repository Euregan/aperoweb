import { isSameMonth, addMonths, subMonths } from 'date-fns';

import { getTalks } from '../../lib/airtable';

const getNextEmptyMonth = talks => {
    const lastTalkDate = talks
        .filter(talk => talk && talk.date)
        .reduce((lastMonth, talk) => {
            const nextMonth = addMonths(lastMonth, 1);
            return isSameMonth(new Date(talk.date), nextMonth) ? nextMonth : lastMonth;
        }, subMonths(new Date(), 1));

    return addMonths(lastTalkDate, 1);
};

export default async (req, res) => {
    try {
        const talks = await getTalks();

        const nextTalk = talks.find(talk => new Date(talk.date) > new Date());
        const plannedTalks = talks.filter(talk => talk && talk.date);
        const nextEmptyMonth = getNextEmptyMonth(talks);

        return res.status(200).json({ nextTalk, plannedTalks, nextEmptyMonth });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
