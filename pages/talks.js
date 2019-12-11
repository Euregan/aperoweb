import React from 'react';

import fetch from '../lib/fetch';
import Layout from '../components/Layout';
import Talk from '../components/Talk';
import Card, { CardWithLoading } from '../components/Card';
import Grid from '../components/Grid';
import { Info } from 'luxon';

const Talks = () => {
    const [calendar, setCalendar] = React.useState(null);
    const [noDate, setNoDate] = React.useState(null);

    React.useEffect(() => {
        const fetchTalks = async () => {
            const { data: talks } = await fetch('/talks');

            const calendar = talks
                .filter(talk => new Date(talk.date) > new Date())
                .reduce(
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
                );

            setCalendar(calendar);
            setNoDate(talks.filter(talk => !talk.date));
        };

        fetchTalks();
    }, []);

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
                    {calendar === null
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
                    {noDate === null ? (
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
