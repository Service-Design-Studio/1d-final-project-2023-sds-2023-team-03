/**
 * @jest-environment jsdom
 */

import getString from './merch_table_fuzzer.js'
import MerchandisingTable from '../components/merchandising_components/MerchandisingTable.jsx';
import "@testing-library/jest-dom/extend-expect";
import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import fs from 'fs';

import mockTableData from '../unit_tests/merchandising-table-stub.json';

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

describe('test', () => {
    const timeMs = 15000;
    const target = <MerchandisingTable data={mockTableData} apiLoad={false} pageSize={50} tagFilterConfigs={{ priorities: [], hideOthers: false }}/>
    test('ROBUSTNESS TEST: SEARCH BAR', async () => {
        const success = [];
        const error = [];
        const start = Date.now();
        var timer = Date.now() - start;
        while (timer < timeMs) {
            const s = getString();
            for (const string of s.strings) {
                if (timer > timeMs) break;
                const {container} = render(<MockContainer component={target}/>)
                const searchButtons = container.getElementsByClassName("mantine-ActionIcon-root");
                expect(searchButtons).toHaveLength(2);
                await userEvent.click(searchButtons[0]);

                const textBox = await screen.findByPlaceholderText("Search product name...")
                expect(textBox).toBeTruthy;

                try {
                    fireEvent.change(textBox, {target: {value: string}});
                    expect(textBox.getAttribute('value')).toBeTruthy();
                    timer = Date.now() - start;
                    success.push({input: string, time: timer});
                } catch (e) {
                    error.push({input: string, time: timer});
                    console.log(e);
                    continue;
                }
            }
        } 

        const errorJSON = JSON.stringify(error, null, 2);
        const successJSON = JSON.stringify(success, null, 2);

        fs.writeFile(`./src/robustness_tests/error.json`, errorJSON, (e) => {if (e) console.log(e)});
        fs.writeFile(`./src/robustness_tests/success.json`, successJSON, (e) => {if (e) console.log(e)});
    }, timeMs + 5000)
})