/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import CategorySelect from '../components/sales_components/CategorySelect.jsx';
import CategorySearch from '../components/sales_components/CategorySearch.jsx';
import SalesBar from '../components/sales_components/SalesBar.jsx';
import SalesSegment from  '../components/sales_components/SalesSegment.jsx';
import React from 'react';
import { render, waitFor, screen } from "@testing-library/react";
import { when } from 'jest-when'
import userEvent from '@testing-library/user-event'
import DateSegment from '../components/sales_components/DateSegment.jsx';

import mockSalesData from './sales-components-stub.json';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

/**
 * The following mock property settings are from:
 *  https://stackoverflow.com/questions/67209367/typeerror-r-node-getbbox-is-not-a-function-code-err-unhandled-rejection
 */

Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    value:
     window.ResizeObserver 
     || jest.fn().mockImplementation(() => ({
          observe: jest.fn(),
          unobserve: jest.fn(),
          disconnect: jest.fn()
     }))
  });
  
  Object.defineProperty(global.SVGElement.prototype, 'getScreenCTM', {
    writable: true,
    value: jest.fn(),
  });
  
  Object.defineProperty(global.SVGElement.prototype, 'getBBox', {
    writable: true,
    value: jest.fn().mockReturnValue({
      x: 0,
      y: 0,
    }),
  });
  
  Object.defineProperty(global.SVGElement.prototype, 'getComputedTextLength', {
    writable: true,
    value: jest.fn().mockReturnValue(0),
  });
  
  Object.defineProperty(global.SVGElement.prototype, 'createSVGMatrix', {
    writable: true,
    value: jest.fn().mockReturnValue({
      x: 10,
      y: 10,
      inverse: () => {},
      multiply: () => {},
    }),
  });

function MockContainer({ component }) {
    return (
        <div className="container">
            {component}
        </div>
    )
}

class TestUseState {
    constructor(d) {
        this._default = d;
        this._value = d;
    }

    get value() {
        const out = this._value;
        this._value = this._default;
        return out;
    }

    set value(v) {
        this._value = v;
    }

    get default() {
        return this._default;
    }
}

describe('CategorySelect.jsx', () => {
    const category = new TestUseState('');
    const setCategory = (v) => category.value = v;
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
        expect(category.value).toBe("comfortwear");
    })
});

describe('DateSegments.jsx', () => {
    const dateSegmentState = new TestUseState('');
    const setDateSegmentValue = (dsv) => dateSegmentState.value = dsv;
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
        expect(dateSegmentState.value).toBe('7d');
    })
})

describe('CategorySearch.jsx', () => {
    const mockSetSalesData = jest.fn(data => console.log(data));
    const target = <CategorySearch handleSalesData={mockSetSalesData} url="https://sds-team3-backend-v4txkfic3a-as.a.run.app/api/v1/insights/cool_testing"/>

    test('Renders without errors', () => {
        render(<MockContainer component={target}/>);
    })

    test('Switches to calendar input by button', async () => {
        const {container} = render(<MockContainer component={target}/>);
        const calendarButtons = container.getElementsByClassName('mantine-UnstyledButton-root');
        expect(calendarButtons).toHaveLength(1);

        await userEvent.click(calendarButtons[0]);
        const dateInputs = container.getElementsByClassName('mantine-DatePickerInput-root');
        expect(dateInputs).toHaveLength(1);
    })

    test('Calendar input tooltip appears', async () => {
        const {container} = render(<MockContainer component={target}/>);
        const calendarButtons = container.getElementsByClassName('mantine-UnstyledButton-root');
        expect(calendarButtons).toHaveLength(1);
        await userEvent.hover(calendarButtons[0]);

        expect(screen.findByRole('tooltip')).toBeTruthy();
    })

    test('Switches to date input by button', async () => {
        const {container} = render(<MockContainer component={target}/>);
        const calendarButtons = container.getElementsByClassName('mantine-UnstyledButton-root');
        expect(calendarButtons).toHaveLength(1);
        await userEvent.click(calendarButtons[0]);

        const dateButtons = container.getElementsByClassName('mantine-UnstyledButton-root');
        expect(dateButtons).toHaveLength(1);
        await userEvent.click(dateButtons[0]);
        
        const segments = container.getElementsByClassName('mantine-SegmentedControl-control');
        expect(segments).toBeTruthy();
    })

    test('Date input tooltip appears', async () => {
        const {container} = render(<MockContainer component={target}/>);
        const calendarButtons = container.getElementsByClassName('mantine-UnstyledButton-root');
        expect(calendarButtons).toHaveLength(1);
        await userEvent.click(calendarButtons[0]);

        const dateButtons = container.getElementsByClassName('mantine-UnstyledButton-root');
        expect(dateButtons).toHaveLength(1);
        await userEvent.hover(dateButtons[0]);

        expect(screen.findByRole('tooltip')).toBeTruthy();
    })

    test('Switches all segments', async () => {
        const {container} = render(<MockContainer component={target}/>);
        const segments = container.getElementsByClassName("mantine-SegmentedControl-label");
        for (let i=0; i<segments.length; i++) {
            await userEvent.click(segments[i]);
            expect(segments[i]).toHaveAttribute('data-active');
        }
    })
})

describe('SalesBar.jsx', () => {
    const getTarget = (inputs) => {
        return <SalesBar data={inputs.data} label={inputs.label} colour="#ffffff" enableCurrency={inputs.enableCurrency}/>
    }
    

    test('Renders without errors (no currency)', () => {
        const target = getTarget({
            data: mockSalesData.testThree,
            label: "test",
            enableCurrency: false
        })
        render(<MockContainer component={target}/>);
    })

    test('Displays data and label (no currency)', () => {
        const target = getTarget({
            data: mockSalesData.testThree,
            label: "test",
            enableCurrency: false
        })
        const {container} = render(<MockContainer component={target}/>);
        const series = container.getElementsByClassName("apexcharts-datalabels");
        expect(series).toHaveLength(1);
        const labels = container.getElementsByClassName("apexcharts-data-labels")
        expect(labels).toHaveLength(3);
        expect(labels[0].textContent).toBe("1")
        expect(screen.findByText("test")).toBeTruthy();
    })

    test('Renders without errors (currency)', () => {
        const target = getTarget({
            data: mockSalesData.testThree,
            label: "testCurrency",
            enableCurrency: true
        })
        render(<MockContainer component={target}/>);
    })

    test('Displays data and label (currency)', () => {
        const target = getTarget({
            data: mockSalesData.testThree,
            label: "test label",
            enableCurrency: true
        })
        const {container} = render(<MockContainer component={target}/>);
        const series = container.getElementsByClassName("apexcharts-datalabels");
        expect(series).toHaveLength(1);
        const labels = container.getElementsByClassName("apexcharts-data-labels")
        expect(labels).toHaveLength(3);
        expect(labels[0].textContent).toBe("$1.00")
        expect(screen.findByText("testCurrency")).toBeTruthy();
    })

    test('Displays 10+ data points', () => {
        const target = getTarget({
            data: mockSalesData.testTen,
            label: "testTen",
            enableCurrency: false
        })
        const {container} = render(<MockContainer component={target}/>);
        const labels = container.getElementsByClassName("apexcharts-data-labels");
        expect(labels).toHaveLength(10);
    })

    test('Displays 10+ data points (currency)', () => {
        const target = getTarget({
            data: mockSalesData.testTen,
            label: "testTenCurrency",
            enableCurrency: true
        })
        const {container} = render(<MockContainer component={target}/>);
        const labels = container.getElementsByClassName("apexcharts-data-labels");
        expect(labels).toHaveLength(10);
        expect(labels[0].textContent).toBe("$1.0");
    })

    test('Limits data to 20 points', () => {
        const {container} = render(<MockContainer component={targetTestFifty}/>);
        const labels = container.getElementsByClassName("apexcharts-data-labels")
        expect(labels).toHaveLength(20);
    })

    test('Limits data to 20 points (currency)', () => {
        const {container} = render(<MockContainer component={targetTestFifty}/>);
        const labels = container.getElementsByClassName("apexcharts-data-labels")
        expect(labels).toHaveLength(20);
    })

    test('Displays max(X, Y) data points when X points < Y points (1 < 3)', () => {
        const {container} = render(<MockContainer component={targetTestImbalancedX}/>);
        const labels = container.getElementsByClassName("apexcharts-data-labels")
        expect(labels).toHaveLength(3);
    })

    test('Displays max(X, Y) data points when Y points < X points (1 < 3)', () => {
        const {container} = render(<MockContainer component={targetTestImbalancedY}/>);
        const labels = container.getElementsByClassName("apexcharts-data-labels")
        expect(labels).toHaveLength(3);
    })
})