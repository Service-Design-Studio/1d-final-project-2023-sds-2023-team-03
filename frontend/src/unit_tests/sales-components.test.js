/**
 * @jest-environment jsdom
 */

import CategorySelect from '../components/sales_components/CategorySelect.jsx';
import CategorySearch from '../components/sales_components/CategorySearch.jsx';
import SalesBar from '../components/sales_components/SalesBar.jsx';
import SalesSegment from  '../components/sales_components/SalesSegment.jsx';
import { render, fireEvent, screen } from "@testing-library/react";



describe('CategorySelect.jsx', () => {
    test('Renders without errors', () => {
        render(<CategorySelect/>);
    });
});