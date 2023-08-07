import { DataTable } from 'mantine-datatable';
import { createStyles, MultiSelect, Badge, Flex, Image, Group, Text, Divider } from '@mantine/core';
import { useState, useEffect, useMemo } from 'react'
import dayjs from 'dayjs'
import ProductInsights from './ProductInsights.jsx'

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
    }, [selectedCategories, sortStatus, page, savedData]);

    function containsInsight(insights, label) {
        return insights.map((e) => {
            return e.name;
        }).includes(label)
    }

    const cellColorSetting = ({ insights }) => cx({ [classes.belowFifty]: containsInsight(insights, "popular_low_stock")})

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
                    cellsClassName: cellColorSetting,
                    render: (record) => (
                        <Flex
                          gap="sm"
                          justify="flex-start"
                          align ="flex-start"
                          direction="row"
                          wrap="wrap"
                        >
                            {record.product_name}
                            <Group spacing="0">
                                {containsInsight(record.insights, "popular") ? (<Badge color="green">Popular!</Badge>) : null}
                                {containsInsight(record.insights, "popular_low_stock") ? (<Badge color="red">Restock?</Badge>) : null}
                            </Group>
                        </Flex>
                    )
                },
                { 
                    accessor: 'stock',
                    textAlignment: 'center',
                    width: 100,
                    cellsClassName: cellColorSetting,
                    sortable: true
                },
                {
                    accessor: 'units_sold',
                    textAlignment: 'center',
                    width: 100,
                    cellsClassName: cellColorSetting,
                    sortable: true
                },
                { 
                    accessor: 'product_category',
                    title: 'Category',
                    textAlignment: 'center',
                    width: 100,
                    cellsClassName: cellColorSetting,
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
                    cellsClassName: cellColorSetting,
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
                        <Divider my="sm"/>
                            <Flex align="top" gap="xs">
                                <Image src={record.image_link} width={150} height={150} radius="lg"/>
                                <div className="rowExpansionDesc">
                                    <Text>
                                        {record.description}
                                    </Text>
                                </div>
                            </Flex>
                            <Divider my="sm" variant="dashed"/>
                            <div>
                                <ProductInsights insightData={record.insights}/>
                            </div>
                        <Divider my="sm"/>
                    </div>
                )
              }}
            />
        </div>
    )
}

export default MerchandisingTable;