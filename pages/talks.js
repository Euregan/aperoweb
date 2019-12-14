import React from 'react';

import useDataApi from '../lib/useDataApi';
import Layout from '../components/Layout';
import Talk from '../components/Talk';
import { CardWithLoading, CardWithError } from '../components/Card';
import Grid from '../components/Grid';

const EmptyCalendar = ({ render }) =>
    [...Array(6).keys()]
        .map((_, index) => <React.Fragment key={index}>{render}</React.Fragment>)
        .concat(
            [...Array(6).keys()].map((_, index) => (
                <React.Fragment key={index}>{render}</React.Fragment>
            )),
        );

const NotPlanned = () => {
    const {
        data: { notPlanned },
        isLoading,
        isError,
        retry,
    } = useDataApi('/api/notPlanned', { notPlanned: null });

    if (isError) return <CardWithError onClick={retry} />;
    if (isLoading || !notPlanned) return <CardWithLoading />;

    return notPlanned.map((talk, index) => <Talk key={`notplanned-${index}`} {...talk} />);
};

const Calendar = () => {
    const {
        data: { calendar },
        isLoading,
        isError,
        retry,
    } = useDataApi('/api/calendar', { calendar: null });

    if (isError) return <EmptyCalendar render={<CardWithError onClick={retry} />} />;
    if (isLoading || !calendar) return <EmptyCalendar render={<CardWithLoading />} />;

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
