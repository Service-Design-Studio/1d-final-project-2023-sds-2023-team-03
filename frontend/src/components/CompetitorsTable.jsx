import { DataTable } from 'mantine-datatable';
import { Flex } from '@mantine/core';
import { useState, useEffect } from 'react'

function CompetitorsTable({ data, pageSize, apiLoad }) {
    const [fetching, setFetching] = useState(true)
    const [savedData, setSavedData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState(data.slice(0, pageSize));

    const [sortStatus, setSortStatus] = useState({ columnAccessor: 'sales', direction: 'desc'});

    useEffect(() => {
        if (data && apiLoad==false) {
            setFetching(false);
            setSavedData(data);
        } else if (apiLoad) {
            setFetching(true)
        }
    }, [data, apiLoad]);


    useEffect(() => {
        const first = (page - 1) * pageSize;
        const last = first + pageSize;
        const dataToLoad = savedData.sort((a, b) => {
            var keyA = a.sales;
            var keyB = b.sales;

            if (sortStatus.columnAccessor === 'price') {
                keyA = a.price;
                keyB = b.price;
            }

            if (keyA < keyB) return (sortStatus.direction === 'desc' ? 1 : -1);
            if (keyA > keyB) return (sortStatus.direction === 'desc' ? -1 : 1);
            return 0;
        })
        .slice(first, last)
        setPageData(dataToLoad);
        setFetching(false);
    }, [sortStatus, page, data]);

    const handleRowClick = (row) => {
        // TODO: Replace with link
        const url = `https://sds-team3-backend-v4txkfic3a-as.a.run.app/api/v1/competitors/${row.competitorName}`
        window.open(url, '_blank');
    }

    const columns = [
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
        },
        {
            accessor: 'product_name',
            textAlignment: 'left',
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
            )
        },
        {
            accessor: 'sales',
            textAlignment: 'center',
            width: 100,
            sortable: true
        },
        {
            accessor: 'price',
            textAlignment: 'center',
            width: 100,
            render: (record) => (
                "S$" + record.price.toFixed(2)
            ),
            sortable: true
        }
    ]

    return (
        <DataTable
            onRowClick = {handleRowClick}
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
