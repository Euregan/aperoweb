import React from 'react';

import useDataApi from '../lib/useDataApi';
import provideAuthentication from '../lib/provideAuthentication';
import Layout from '../components/Layout';
import Talk from '../components/Talk';
import { CardWithLoading, CardWithError } from '../components/Card';
import Grid from '../components/Grid';

const EmptyCalendar = ({ component }) =>
    [...Array(6).keys()]
        .map((_, index) => <React.Fragment key={index}>{component}</React.Fragment>)
        .concat(
            [...Array(6).keys()].map((_, index) => (
                <React.Fragment key={index}>{component}</React.Fragment>
            )),
        );

const NotPlanned = () => {
    const {
        data: { notPlanned },
        isLoading,
        isError,
        retry,
    } = useDataApi('/api/notPlanned', { notPlanned: null });

    if (isError) return <CardWithError onFailureRetry={retry} />;
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

    if (isError) return <EmptyCalendar component={<CardWithError onFailureRetry={retry} />} />;
    if (isLoading || !calendar) return <EmptyCalendar component={<CardWithLoading />} />;

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

Talks.getInitialProps = async ({ req, res }) => {
    const securitySettings = provideAuthentication(req, res);
    return securitySettings;
};

export default Talks;
