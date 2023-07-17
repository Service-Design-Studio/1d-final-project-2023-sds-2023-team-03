import { DataTable } from 'mantine-datatable';
import { createStyles } from '@mantine/core';
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

const useStyles = createStyles((theme) => ({
    belowFifty: {
        color: "#d0342c",
        fontWeight: "bold"
    }
}));

function MerchandisingTable({ data, threshold, pageSize, fetching }) {
    const { classes, cx } = useStyles();
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState(data.slice(0, pageSize))

    useEffect(() => {
        const first = (page - 1) * pageSize;
        const last = first + pageSize;
        setPageData(data.slice(first, last))
    })

    return (
        <div className='table'>
            <DataTable    // low products
              height={'70vh'}
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
                    width: 50,
                    cellsClassName: ({ stock }) => cx({ [classes.belowFifty]: stock < threshold}),
                },
                { 
                    accessor: 'product_category',
                    title: 'Category',
                    textAlignment: 'center',
                    width: 100,
                    cellsClassName: ({ stock }) => cx({ [classes.belowFifty]: stock < threshold}),
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
            />
        </div>
    )
}

export default MerchandisingTable;