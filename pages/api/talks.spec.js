import { advanceTo, clear } from 'jest-date-mock';
import { getMonth } from 'date-fns';

import { getNextEmptyMonth } from './talks';

describe('talks', () => {
    beforeEach(() => {
        advanceTo(new Date(2019, 12, 20));
    });

    describe('getNextEmptyMonth', () => {
        it.each`
            talks                                                                       | expected
            ${[{ date: '2019-11-20' }]}                                                 | ${1}
            ${[{ date: '2019-12-20' }, { date: '2020-01-20' }]}                         | ${2}
            ${[{ date: '2019-12-20' }, { date: '2020-01-20' }, { date: '2020-02-20' }]} | ${3}
            ${[{ date: '2019-12-20' }, { date: '2020-02-20' }]}                         | ${1}
            ${[{ date: '2020-02-20' }]}                                                 | ${1}
        `('should return the right month: $expected', ({ talks, expected }) => {
            expect(getMonth(getNextEmptyMonth(talks))).toBe(expected - 1);
        });
    });

    afterEach(() => {
        clear();
    });
});
