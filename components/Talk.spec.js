import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Talk from './Talk';

describe('<Talk />', () => {
    it('should display pending and month name when talk have no name', () => {
        const { getByText, getByLabelText } = render(<Talk date="2019-12-20" />);
        expect(getByText('Pending')).toBeInTheDocument();
        expect(getByText('December')).toBeInTheDocument();
        expect(getByLabelText('icon: question-circle')).toBeInTheDocument();
    });

    it('should display date, name and speakers name when talk have date', () => {
        const talk = {
            date: '2019-12-20',
            name: 'My talk',
            speakers: [{ name: 'you' }, { name: 'and I' }],
        };
        const { getByText, getByLabelText } = render(<Talk {...talk} />);

        expect(getByText('December')).toBeInTheDocument();
        expect(getByText('Friday 20')).toBeInTheDocument();
        expect(getByText('My talk')).toBeInTheDocument();
        expect(getByText('you')).toBeInTheDocument();
        expect(getByText('and I')).toBeInTheDocument();
        expect(getByLabelText('icon: check-circle')).toBeInTheDocument();
    });

    it('should display name and speakers name when talk have name', () => {
        const talk = {
            name: 'My talk',
            speakers: [{ name: 'you' }, { name: 'and I' }],
        };
        const { getByText, getByLabelText } = render(<Talk {...talk} />);

        expect(getByText('My talk')).toBeInTheDocument();
        expect(getByText('you')).toBeInTheDocument();
        expect(getByText('and I')).toBeInTheDocument();
        expect(getByLabelText('icon: question-circle')).toBeInTheDocument();
    });
});
