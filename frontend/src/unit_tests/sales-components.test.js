/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import CategorySelect from '../components/sales_components/CategorySelect.jsx';
import CategorySearch from '../components/sales_components/CategorySearch.jsx';
import SalesBar from '../components/sales_components/SalesBar.jsx';
import SalesSegment from  '../components/sales_components/SalesSegment.jsx';
import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import DateSegment from '../components/sales_components/DateSegment.jsx';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

function MockContainer({ component }) {
    return (
        <div className="container">
            {component}
        </div>
    )
}

describe('CategorySelect.jsx', () => {
    var category = '';
    const setCategory = (cat) => {
        category = cat;
    }

    const getCategory = () => {
        const out = category;
        category = '';
        return out;
    }

    const target = <CategorySelect setCategory={setCategory}/>

    test('Renders without errors', () => {
        render(<MockContainer component={target}/>);
    });

    test('Is on the "Running" category by default', async () => {
        render(<MockContainer component={target}/>);
        const selectorBox = await screen.findByDisplayValue("Running");
        expect(selectorBox).toBeTruthy();
    });

    test('Returns the right category value', async () => {
        const {container} = render(<MockContainer component={target}/>);
        const selectorBox = await screen.findByDisplayValue("Running");
        await userEvent.click(selectorBox);
        const options = container.getElementsByClassName("mantine-Select-item");
        expect(options).toHaveLength(2);

        await userEvent.click(options[0]);
        expect(category).toBe("comfortwear");
    })
});

describe('DateSegments.jsx', () => {
    var dateSegmentValue = ''
    const setDateSegmentValue = (dsv) => {
        dateSegmentValue = dsv;
    }

    const getDateSegmentValue = () => {
        const out = dateSegmentValue;
        dateSegmentValue = '';
        return out;
    }

    const target = <DateSegment handleDateSegment={setDateSegmentValue} savedPreset='30d'/>

    test('Renders without errors', () => {
        render(<MockContainer component={target}/>);
    });

    test('Is on "Last 30 days" by default', () => {
        const {container} = render(<MockContainer component={target}/>);
        const segments = container.getElementsByClassName("mantine-SegmentedControl-label");
        expect(segments).toHaveLength(4);
        expect(segments[1]).toHaveAttribute('data-active');
    })

    test('Returns the correct segment value', async () => {
        const {container} = render(<MockContainer component={target}/>);
        const segments = container.getElementsByClassName("mantine-SegmentedControl-label");
        await userEvent.click(segments[0]);
        expect(getDateSegmentValue()).toBe('7d');
    })
})

describe('CategorySearch.jsx', () => {
    
})