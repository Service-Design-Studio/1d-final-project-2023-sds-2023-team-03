import { DataTable } from 'mantine-datatable';
import { Flex, MultiSelect, TextInput } from '@mantine/core';
import { useState, useEffect, useMemo } from 'react'

function CompetitorsTable({ data, pageSize, apiLoad }) {
    const [fetching, setFetching] = useState(true)
    const [savedData, setSavedData] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState(data.length ? data.slice(0, pageSize) : []);

    const keywords = useMemo(() => {
        var keywords = [];
        if (data.length) keywords = new Set(data.map((e) => e.keyword));
        return [...keywords];
    });
    const [selectedKeywords, setSelectedKeywords] = useState(keywords);

    const competitors = useMemo(() => {
        var competitors = [];
        if (data.length) competitors = new Set(data.map((e) => e.competitor_name));
        return [...competitors];
    });
    const [selectedCompetitors, setSelectedCompetitors] = useState(competitors);

    const [sortStatus, setSortStatus] = useState({ columnAccessor: 'sales', direction: 'desc'});

    const isOverallPage = useMemo(() => {
        return window.location.pathname.endsWith('/Overall');
    }, [window.location.pathname]);

    useEffect(() => {
        setFetching(true);

        if (data.length) setSavedData(data);
    }, [data, apiLoad]);


    useEffect(() => {
        if (savedData.length == 0) {
            setFetching(false);
            return;
        }

        const first = (page - 1) * pageSize;
        const last = first + pageSize;

        const dataToLoad = savedData.sort((a, b) => {
            let keyA, keyB;

            switch(sortStatus.columnAccessor) {
                case 'sales':
                    keyA = a.sales;
                    keyB = b.sales;
                    break;
                case 'initial_price':
                    keyA = a.initial_price;
                    keyB = b.initial_price;
                    break;
                case 'final_price':
                    keyA = a.final_price;
                    keyB = b.final_price;
                    break;
                case 'discount':
                    keyA = a.discount;
                    keyB = b.discount;
                    break;
                case 'date_scraped':
                    keyA = a.date_scraped;
                    keyB = b.date_scraped;
                    break;
                default:
                    keyA = a[sortStatus.columnAccessor];
                    keyB = b[sortStatus.columnAccessor];
                    break;
            }

            if (keyA < keyB) return (sortStatus.direction === 'desc' ? 1 : -1);
            if (keyA > keyB) return (sortStatus.direction === 'desc' ? -1 : 1);
            return 0;
        })
        .filter((item) => {
            if (selectedCompetitors.length && !selectedCompetitors.some((c) => c === item.competitor_name)) {
                return false;
            }

            if (selectedKeywords.length && !selectedKeywords.some((c) => c === item.keyword)) {
                return false;
            }

            if (nameFilter !== '' && !item.product_name.toLowerCase().includes(nameFilter.toLowerCase())) {
                return false;
            }
            return true;
        })

        .slice(first, last)
        setPageData(dataToLoad);
        setFetching(false);
    }, [sortStatus, page, savedData, nameFilter, selectedKeywords, selectedCompetitors]);

    const handleRowClick = (row) => {
        const url = row.product_link
        window.open(url, '_blank');
    }

    let columns = [
        {
            accessor: 'index',
            textAlignment: 'center',
            width: 70,
            render: (record, rowIndex) => (
                <Flex justify="center" align="center" direction="row" style={{ fontWeight: 'bold' }}>
                {/* Calculate the static index value based on the current page and page size */}
                {((page - 1) * pageSize) + rowIndex + 1}
                </Flex>
            ),
        }
    ];

    // Conditionally add competitor_name column if on Overall page
    if (isOverallPage) {
        // Insert competitor_name column at index 1 without removing existing columns
        columns.splice(1, 0, {
            accessor: 'competitor_name',
            textAlignment: 'left',
            width: 80,
            // sortable: true
            filter: (
                <MultiSelect
                    label="Competitors"
                    description="Show only products from the following competitors:"
                    data={competitors}
                    value={selectedCompetitors}
                    placeholder="Search keywords..."
                    onChange={setSelectedCompetitors}
                    clearable
                    searchable
                />
            ),
            filtering: selectedCompetitors.length > 0
        });
    }

    // Continue adding the rest of columns
    columns.push(
        {
            accessor: 'product_name',
            textAlignment: 'left',
            width: 200,
            render: (record) => (
                <Flex
                    gap="md"
                    justify="flex-start"
                    align ="flex-start"
                    direction="row"
                    wrap="wrap"
                >
                    {record.product_name}
                </Flex>
            ),
            filter: (
                <TextInput
                    label="Product name"
                    description="Filter products whose names include the inputted text"
                    placeholder="Search product name..."
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.currentTarget.value)}
                />
            ),
            filtering: nameFilter !== ''
        },
        {
            accessor: 'keyword',
            textAlignment: 'center',
            width: 100,
            filter: (
                <MultiSelect
                    label="Keywords"
                    description="Show only products with the following keywords:"
                    data={keywords}
                    value={selectedKeywords}
                    placeholder="Search keywords..."
                    onChange={setSelectedKeywords}
                    clearable
                    searchable
                />
            ),
            filtering: selectedKeywords.length > 0
        },
        {
            accessor: 'sales',
            textAlignment: 'center',
            width: 80,
            sortable: true
        },
        {
            accessor: 'initial_price',
            textAlignment: 'center',
            width: 100,
            render: (record) => (
                "S$" + record.initial_price.toFixed(2)
            ),
            sortable: true
        },
        {
            accessor: 'final_price',
            textAlignment: 'center',
            width: 100,
            render: (record) => (
                "S$" + record.final_price.toFixed(2)
            ),
            sortable: true
        },
        {
            accessor: 'discount',
            textAlignment: 'center',
            width: 80,
            render: (record) => (
                record.discount.toFixed() + "%"
            ),
            sortable: true
        },
        {
            accessor: 'date_scraped',
            textAlignment: 'center',
            width: 100,
            sortable: true
        }
    )

    return (
        <DataTable
            onRowClick={handleRowClick}
            className="table"
            height={'79vh'}
            withBorder
            striped
            highlightOnHover
            columns={columns}
            totalRecords={data.length}
            records={pageData}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={(p) => setPage(p)}
            fetching={fetching}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
        />
    )
}

export default CompetitorsTable;
