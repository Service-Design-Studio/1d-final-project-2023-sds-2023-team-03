import { DataTable } from 'mantine-datatable';
import { createStyles, MultiSelect } from '@mantine/core';
import { useState, useEffect, useMemo } from 'react'
import dayjs from 'dayjs'

const useStyles = createStyles((theme) => ({
    belowFifty: {
        color: "#d0342c",
        fontWeight: "bold"
    }
}));

function MerchandisingTable({ data, threshold, pageSize, fetching }) {
    const { classes, cx } = useStyles();
    const [savedData, setSavedData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState(data.slice(0, pageSize));
    const categories = useMemo(() => {
        const categories = new Set(data.map((e) => e.product_category));
        return [...categories]
    });
    const [selectedCategories, setSelectedCategories] = useState(categories);
    

    const [sortStatus, setSortStatus] = useState({ columnAccessor: 'stock', direction: 'asc'});

    useEffect(() => {
        setSavedData(data)
    }, [data]);

    useEffect(() => {
        const first = (page - 1) * pageSize;
        const last = first + pageSize;
        const dataToLoad = savedData.slice(first, last)
        .filter(( item ) => {
            if (selectedCategories.length && !selectedCategories.some((c) => c === item.product_category)) {
                return false;
            }
            return true;
        })
        .sort((a, b) => {
            var keyA = a.stock;
            var keyB = b.stock;

            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        setPageData(sortStatus.direction === 'asc' ? dataToLoad : dataToLoad.reverse())
    }, [selectedCategories, sortStatus, page, data]);

    return (
        <div className='table'>
            <DataTable    // low products
              height={'79vh'}
              withBorder
              shadow="sm"
              withColumnBorders
              striped
              highlightOnHover
              verticalAlignment='center'
              columns={[
                { 
                    accessor: 'product_name', 
                    textAlignment: 'center',
                    cellsClassName: ({ stock }) => cx({ [classes.belowFifty]: stock < threshold}),
                },
                { 
                    accessor: 'stock',
                    textAlignment: 'center',
                    width: 100,
                    cellsClassName: ({ stock }) => cx({ [classes.belowFifty]: stock < threshold}),
                    sortable: true
                },
                { 
                    accessor: 'product_category',
                    title: 'Category',
                    textAlignment: 'center',
                    width: 100,
                    cellsClassName: ({ stock }) => cx({ [classes.belowFifty]: stock < threshold}),
                    filter: (
                        <MultiSelect
                            label="Categories"
                            description="Show only products in the following categories:"
                            data={categories}
                            value={selectedCategories}
                            placeholder="Search categories..."
                            onChange={setSelectedCategories}
                            clearable
                            searchable
                        />
                    ),
                },
                { 
                    accessor: 'updated_at' ,
                    textAlignment: 'center',
                    width: 100,
                    cellsClassName: ({ stock }) => cx({ [classes.belowFifty]: stock < threshold}),
                    render: ( { updated_at } ) => dayjs(updated_at).format('DD/MM/YYYY')
                }
              ]}
              totalRecords={data.length}
              records={pageData}
              recordsPerPage={pageSize}
              page={page}
              onPageChange={(p) => setPage(p)}
              fetching={fetching}
              sortStatus={sortStatus}
              onSortStatusChange={setSortStatus}
            />
        </div>
    )
}

export default MerchandisingTable;