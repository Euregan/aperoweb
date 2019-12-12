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

const Talks = () => {
    const {
        data: { calendar, notPlanned },
        isLoading,
        isError,
    } = useDataApi('/api/calendar', {
        calendar: [],
        notPlanned: [],
    });

    const isLoadingElement = isLoading || isError;

    return (
        <div>
            <Layout>
                <h2>Calendar</h2>
                <Grid>
                    {isLoadingElement ? (
                        <LoadingCalendar />
                    ) : (
                        calendar.map((talk, index) => <Talk key={index} talk={talk} />)
                    )}
                </Grid>
                <h2>Not planned</h2>
                <Grid>
                    {isLoadingElement ? (
                        <CardWithLoading />
                    ) : (
                        notPlanned.map((talk, index) => (
                            <Talk key={`notplanned-${index}`} talk={talk} />
                        ))
                    )}
                </Grid>
            </Layout>
        </div>
    );
};

export default Talks;
