import { DataTable } from 'mantine-datatable';
import { createStyles, MultiSelect, Badge, Flex, Image, Title, Text, Divider } from '@mantine/core';
import { useState, useEffect, useMemo } from 'react'
import dayjs from 'dayjs'

const useStyles = createStyles((theme) => ({
    belowFifty: {
        color: "#d0342c",
        fontWeight: "bold"
    }
}));

function MerchandisingTable({ data, threshold, pageSize, apiLoad }) {
    const placeholderImg = "data:image/jpeg;base64,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"

    const { classes, cx } = useStyles();
    const [fetching, setFetching] = useState(true)
    const [savedData, setSavedData] = useState([]);
    const [pageLength, setPageLength] = useState(0);
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState(data.slice(0, pageSize));
    const categories = useMemo(() => {
        const categories = new Set(data.map((e) => e.product_category));
        return [...categories]
    });
    const [selectedCategories, setSelectedCategories] = useState(categories);
    

    const [sortStatus, setSortStatus] = useState({ columnAccessor: 'stock', direction: 'asc'});

    useEffect(() => {
        setFetching(true);
        if (data && apiLoad==false) {
            setFetching(false);
            setSavedData(data);
        } 
    }, [data, apiLoad]);

    useEffect(() => {
        const first = (page - 1) * pageSize;
        const last = first + pageSize;
        const filteredData = savedData.sort((a, b) => {
            if (sortStatus.columnAccessor === 'stock') {
                var keyA = a.stock;
                var keyB = b.stock;    
            } else {
                var keyA = a.units_sold;
                var keyB = b.units_sold;
            }

            if (keyA < keyB) return (sortStatus.direction === 'desc' ? 1 : -1);
            if (keyA > keyB) return (sortStatus.direction === 'desc' ? -1 : 1);
            return 0;
        })
        .filter(( item ) => {
            if (selectedCategories.length && !selectedCategories.some((c) => c === item.product_category)) {
                return false;
            }
            return true;
        });
        setPageLength(filteredData.length)

        const dataToLoad = filteredData.slice(first, last);
        setPageData(dataToLoad);
    }, [selectedCategories, sortStatus, page, data]);

    return (
        <div className='merch-table'>
            <DataTable    // low products
              height={'79vh'}
              withBorder
              // withColumnBorders
              striped
              highlightOnHover
              columns={[
                { 
                    accessor: 'product_name', 
                    textAlignment: 'left',
                    cellsClassName: ({ stock }) => cx({ [classes.belowFifty]: stock < threshold}),
                    render: (record) => (
                        <Flex
                          gap="md"
                          justify="flex-start"
                          align ="flex-start"
                          direction="row"
                          wrap="wrap"
                        >
                            {record.stock < 50 ? (<Badge color="red">Restock</Badge>) : null}
                            {record.product_name}
                        </Flex>
                    )
                },
                { 
                    accessor: 'stock',
                    textAlignment: 'center',
                    width: 100,
                    cellsClassName: ({ stock }) => cx({ [classes.belowFifty]: stock < threshold}),
                    sortable: true
                },
                {
                    accessor: 'units_sold',
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
                    title: "Last restocked",
                    width: 100,
                    cellsClassName: ({ stock }) => cx({ [classes.belowFifty]: stock < threshold}),
                    render: ( { updated_at } ) => dayjs(updated_at).format('DD/MM/YYYY')
                }
              ]}
              totalRecords={pageLength}
              records={pageData}
              recordsPerPage={pageSize}
              page={page}
              onPageChange={(p) => setPage(p)}
              fetching={fetching}
              sortStatus={sortStatus}
              onSortStatusChange={setSortStatus}

              rowExpansion={{
                content:({ record })=> (
                    <div className="rowExpansionText">
                        <Divider my="sm" variant="dashed"/>
                        <Flex align="top" gap="xs">
                            <Image src={placeholderImg} width={150} height={150} radius="lg"/>
                            <div className="rowExpansionDesc">
                                <Text>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Id semper risus in hendrerit gravida. 
                                    Tincidunt ornare massa eget egestas purus viverra accumsan in. 
                                    Consectetur adipiscing elit duis tristique sollicitudin. 
                                    Sem et tortor consequat id porta nibh venenatis cras sed.
                                </Text>
                            </div>
                        </Flex>
                        <Divider my="sm"/>
                    </div>
                )
              }}
            />
        </div>
    )
}

export default MerchandisingTable;