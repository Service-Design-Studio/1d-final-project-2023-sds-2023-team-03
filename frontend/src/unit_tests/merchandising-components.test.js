/**
 * @jest-environment jsdom
 */

import MerchandisingTable from '../components/merchandising_components/MerchandisingTable.jsx';
import "@testing-library/jest-dom/extend-expect";
import React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import mockTableData from './merchandising-table-stub.json';

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

describe('MerchandisingTable.jsx', () => {
    const dataTarget = <MerchandisingTable data={mockTableData} pageSize={50} apiLoad={false} tagFilterConfigs={{priorities: [], hideOthers: false}}/>
    const customTarget = (params) => {
        return <MerchandisingTable data={params.data} pageSize={params.pageSize} apiLoad={params.apiLoad} tagFilterConfigs={params.tagFilterConfigs}/>
    }

    test('Renders without errors', () => {
        render(<MockContainer component={dataTarget}/>);
    })

    test('Renders 50 points per page by default', () => {
        const {container} = render(<MockContainer component={dataTarget}/>);
        const rows = container.getElementsByClassName("mantine-1mj2j8y");
        expect(rows).toHaveLength(50);
    })

    test('Row expands when clicked', async () => {
        const {container} = render(<MockContainer component={dataTarget}/>);
        const rows = container.getElementsByClassName("mantine-1mj2j8y");
        expect(rows).toHaveLength(50);
        await userEvent.click(rows[0]);
        const expandedRows = container.getElementsByClassName("mantine-73o2bz");
        expect(expandedRows).toHaveLength(1);
    })

    test('Sorted by stock by default (ASC)', () => {
        const {container} = render(<MockContainer component={dataTarget}/>);
        const rows = container.getElementsByClassName("mantine-bdz581");
        expect(rows).toHaveLength(12);
        const row1 = rows[0];
        const row2 = rows[4];
        expect(parseInt(row1.textContent) < parseInt(row2.textContent)).toBeTruthy();
    })

    test('Sorts correctly by stock (DESC)', async () => {
        const {container} = render(<MockContainer component={dataTarget}/>);
        const btns = container.getElementsByClassName("mantine-t91jkm");
        expect(btns).toHaveLength(5);
        await userEvent.click(btns[1]);
        const rows = container.getElementsByClassName("mantine-1xwwtxe");
        expect(rows).toHaveLength(200);
        const row1 = rows[0];
        const row2 = rows[20];
        expect(parseInt(row1.textContent) > parseInt(row2.textContent)).toBeTruthy();
    })

    test('Filters by badge correctly', async () => {
        const settings={
            data: mockTableData,
            pageSize: 50,
            apiLoad: false,
            tagFilterConfigs: {
                priorities: ["restock"],
                hideOthers: true
            }
        }

        const newTarget = <MockContainer component={customTarget(settings)}/>
        const {container} = render(newTarget);
        const badges = container.getElementsByClassName("mantine-Badge-inner");
        expect(badges.length).toBeTruthy();
        var counter = 0;
        for (let i=0; i<badges.length; i++) {
            if (badges[i].textContent === "Restock?") {
                counter += 1
            }
        }

        expect(counter).toEqual(3);
    })

    test('Filters by units sold correctly (DESC)', async () => {
        const {container} = render(<MockContainer component={dataTarget}/>);
        const btns = container.getElementsByClassName("mantine-t91jkm");
        expect(btns).toHaveLength(5);
        await userEvent.click(btns[2]);
        const rows = container.getElementsByClassName("mantine-1xwwtxe");
        expect(rows).toHaveLength(200);
        const row1 = rows[0];
        const row2 = rows[20];
        expect(parseInt(row1.textContent) > parseInt(row2.textContent)).toBeTruthy();
    })

    test('Filters by category correctly', async () => {
        const {container} = render(<MockContainer component={dataTarget}/>);
        const btns = container.getElementsByClassName("mantine-ActionIcon-root");
        expect(btns).toBeTruthy();
        await userEvent.click(btns[1]);
        const searchInputs = container.getElementsByClassName("mantine-Input-rightSection");
        expect(searchInputs).toBeTruthy();
        await userEvent.click(searchInputs[0]);
        const options = container.getElementsByClassName("mantine-MultiSelect-item");
        expect(options).toBeTruthy();
        await userEvent.click(options[0]);
        const allRows = container.getElementsByClassName("mantine-1xwwtxe");
        expect(allRows).toBeTruthy();

        for (let i=0; i<allRows.length; i=i+4) {
            expect(allRows[i].textContent === "Comfortwear"); 
        }
    })
})