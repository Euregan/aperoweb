import { advanceTo, clear } from 'jest-date-mock';
import { format } from 'date-fns';

import { fillYearEvents } from './calendar';

describe('calendar', () => {
    beforeEach(() => {
        advanceTo(new Date(2019, 12, 20));
    });

    describe('fillYearEvents', () => {
        it('should return an array with twelve months', () => {
            const talks = fillYearEvents([{ date: '2019-12-20' }]);

            expect(talks).toHaveLength(12);
            expect(talks.map(t => format(new Date(t.date), 'yyyy-M-dd'))).toEqual([
                '2019-12-20',
                ...Array.from({ length: 11 }, (_, i) => `2020-${i + 1}-20`),
            ]);
        });

        it('should return an array with fill months', () => {
            const talks = fillYearEvents([{ date: '2019-12-20' }, { date: '2020-02-20' }]);

            expect(talks.map(t => format(new Date(t.date), 'yyyy-M-dd'))).toEqual([
                '2019-12-20',
                '2020-1-20',
                '2020-2-20',
                ...Array.from({ length: 9 }, (_, i) => `2020-${i + 3}-20`),
            ]);
        });
    });

    afterEach(() => {
        clear();
    });
});
