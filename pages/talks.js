import React, { useState } from 'react';

import fetch from '../lib/fetch';
import Layout from '../components/Layout';
import Talk from '../components/Talk';
import Card, { CardWithLoading } from '../components/Card';
import Grid from '../components/Grid';
import { Info } from 'luxon';

const Talks = () => {
    const [calendar, setCalendar] = useState('loading');
    const [noDate, setNoDate] = useState('loading');

    if (calendar === 'loading' && noDate === 'loading') {
        const talks = fetch('/talks').catch(error => console.error(error) || []);

        talks
            .then(talks => talks.filter(talk => new Date(talk.date) > new Date()))
            .then(talks =>
                talks.reduce(
                    (calendar, talk) => {
                        const talkMonth = new Date(talk.date).getMonth();
                        const currentMonth = new Date().getMonth();
                        const index =
                            talkMonth >= currentMonth
                                ? talkMonth - currentMonth
                                : 12 - currentMonth + talkMonth;
                        calendar[index] = talk;
                        return calendar;
                    },
                    [null, null, null, null, null, null, null, null, null, null, null, null],
                ),
            )
            .then(talks => setCalendar(talks));

        talks.then(talks => setNoDate(talks.filter(talk => !talk.date)));
    }

    const loadingCalendar = [...Array(6).keys()]
        .map((_, index) => <CardWithLoading key={`CardWithLoading${index}`} />)
        .concat(
            [...Array(6).keys()].map((_, index) => (
                <CardWithLoading key={`CardWithLoadingConcat${index}`} />
            )),
        );

    return (
        <div>
            <Layout>
                <h2>Calendar</h2>
                <Grid>
                    {calendar === 'loading'
                        ? loadingCalendar
                        : calendar.map((talk, index) =>
                              talk ? (
                                  <Talk key={index} talk={talk} />
                              ) : (
                                  <Card
                                      key={`calendar-Pending${index}`}
                                      title={Info.months()[(index + new Date().getMonth()) % 12]}
                                      state="pending"
                                  >
                                      Pending
                                  </Card>
                              ),
                          )}
                </Grid>
                <h2>Not planned</h2>
                <Grid>
                    {noDate === 'loading' ? (
                        <CardWithLoading />
                    ) : (
                        noDate.map((talk, index) => (
                            <Talk key={`notplanned-${index}`} talk={talk} />
                        ))
                    )}
                </Grid>
            </Layout>
        </div>
    );
};

export default Talks;
