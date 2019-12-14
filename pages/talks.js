import React from 'react';

import useDataApi from '../lib/useDataApi';
import Layout from '../components/Layout';
import Talk from '../components/Talk';
import { CardWithLoading } from '../components/Card';
import Grid from '../components/Grid';

const LoadingCalendar = () =>
    [...Array(6).keys()]
        .map((_, index) => <CardWithLoading key={`CardWithLoading${index}`} />)
        .concat(
            [...Array(6).keys()].map((_, index) => (
                <CardWithLoading key={`CardWithLoadingConcat${index}`} />
            )),
        );

const NotPlanned = () => {
    const {
        data: { notPlanned },
        isLoading,
        isError,
    } = useDataApi('/api/notPlanned', { notPlanned: null });

    if (isError) return <CardWithLoading />;
    if (isLoading || !notPlanned) return <CardWithLoading />;

    return notPlanned.map((talk, index) => <Talk key={`notplanned-${index}`} {...talk} />);
};

const Calendar = () => {
    const {
        data: { calendar },
        isLoading,
        isError,
    } = useDataApi('/api/calendar', { calendar: null });

    if (isError) return <LoadingCalendar />;
    if (isLoading || !calendar) return <LoadingCalendar />;

    return calendar.map((talk, index) => <Talk key={index} {...talk} />);
};

const Talks = () => (
    <Layout>
        <h2>Calendar</h2>
        <Grid>
            <Calendar />
        </Grid>
        <h2>Not planned</h2>
        <Grid>
            <NotPlanned />
        </Grid>
    </Layout>
);

export default Talks;
