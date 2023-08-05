import { DataTable } from 'mantine-datatable';
import { createStyles, MultiSelect, Badge, Flex, Image, Title, Text, Divider, rem } from '@mantine/core';
import { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import {SalesText, DeclineText, SellingFastText, RestockSellingFastText, BadSalesText, LiquidateText} from './MerchandisingInsights';

const useStyles = createStyles((theme) => ({
    belowFifty: {
        color: "#d0342c",
        fontWeight: "bold"
    }
}));

function MerchandisingTable({ data, threshold, pageSize, apiLoad }) {
    const { classes, cx } = useStyles();
    const [fetching, setFetching] = useState(true)
    const [savedData, setSavedData] = useState([]);
    const [pageLength, setPageLength] = useState(0);
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState(data.length ? data.slice(0, pageSize) : []);
    const categories = useMemo(() => {
        var categories = [];
        if (data.length) categories = new Set(data.map((e) => e.product_category));
        return [...categories];
    });
    const [selectedCategories, setSelectedCategories] = useState(categories);
    

    const [sortStatus, setSortStatus] = useState({ columnAccessor: 'stock', direction: 'asc'});

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
        setFetching(false);
    }, [selectedCategories, sortStatus, page, data, savedData]);

    // TODO: need to modify inputs
    const percent = 11;
    const above_100_or_more = 123;
    const decline_days = 7;
    const current_stock = 10;
    const stock_last_month = 67;
    const bad_sales = 3;
    const remaining_stock = 88;
    const sold_per_day = 6;
    const currentStock = 40;

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
                            <Image src={record.image_link} width={150} height={150} radius="lg"/>
                            <div className="rowExpansionDesc">
                                <Text>
                                    {record.description}
                                </Text>
                                <br />
                                <SalesText percent={percent} />
                                <DeclineText decline_days={decline_days} />
                                <SellingFastText above_100_or_more={above_100_or_more} />
                                <RestockSellingFastText above_100_or_more={above_100_or_more} current_stock={current_stock} stock_last_month={stock_last_month} />
                                <BadSalesText bad_sales={bad_sales} remaining_stock={remaining_stock} />
                                <LiquidateText sold_per_day={sold_per_day} currentStock={currentStock} />
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