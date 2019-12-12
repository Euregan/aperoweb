import React from 'react';

import fetch from '../lib/fetch';
import Layout from '../components/Layout';
import Talk from '../components/Talk';
import { CardWithLoading } from '../components/Card';
import Grid from '../components/Grid';

const Talks = () => {
    const [calendar, setCalendar] = React.useState(null);
    const [noDate, setNoDate] = React.useState(null);

    React.useEffect(() => {
        const fetchTalks = async () => {
            const { calendar, notPlanned } = await fetch('/calendar');

            setCalendar(calendar);
            setNoDate(notPlanned);
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
                        : calendar.map((talk, index) => <Talk key={index} talk={talk} />)}
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
