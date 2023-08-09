import { DataTable } from 'mantine-datatable';
import { createStyles, MultiSelect, Badge, Flex, Image, Group, Text, TextInput, Divider } from '@mantine/core';
import { useState, useEffect, useMemo } from 'react'
import dayjs from 'dayjs'
import ProductInsights from './ProductInsights.jsx'

const useStyles = createStyles((theme) => ({
    belowFifty: {
        color: "#d0342c",
        fontWeight: "bold"
    }
}));

function MerchandisingTable({ data, anomalyData, threshold, pageSize, apiLoad, tagFilterConfigs }) {
    const { classes, cx } = useStyles();
    const [nameFilter, setNameFilter] = useState('');
    const [fetching, setFetching] = useState(true);
    const [savedData, setSavedData] = useState([]);
    const [tagFilterData, setTagFilterData] = useState({
        priorities: [],
        hideOthers: false
    });
    const [anomalies, setAnomalies] = useState([])
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
        setTagFilterData(tagFilterConfigs)
        if (data.length) setSavedData(data);
    }, [data, apiLoad, tagFilterConfigs]);

    useEffect(() => {
        if (savedData.length == 0 && !apiLoad) {
            setFetching(false);
            return;
        } else if (apiLoad) {
            return;
        } else if (apiLoad) {
            return;
        }

        var finalData = []
        var priorities = []

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

            if (nameFilter !== '' && !item.product_name.toLowerCase().includes(nameFilter.toLowerCase())) {
                return false
            }
            return true;
        })
        
        filteredData.forEach((r) => {
            if (tagFilterData.priorities.length == 0) return;
            var isPriority = false;
            for (const priority of tagFilterData.priorities) {
                if (containsInsight(r.insights, priority) || containsInsightSeverity(r.insights, priority)) {
                    priorities.push(r);
                    isPriority = true;
                    break;
                }
            }

            if (!isPriority && !tagFilterData.hideOthers) finalData.push(r);
        });

        if (priorities.length == 0) {
            finalData = filteredData;
        } else {
            priorities.forEach((p) => {
                finalData.unshift(p);
            });
        };

        setPageLength(finalData.length);
        const dataToLoad = finalData.slice(first, last);
        setPageData(dataToLoad);
        setFetching(false);
    }, [selectedCategories, sortStatus, page, savedData, tagFilterData.priorities, tagFilterData.hideOthers, nameFilter]);

    function containsInsight(insights, label) {
        return insights.map((e) => {
            return e.name;
        }).includes(label)
    }

    function containsInsightSeverity(insights, severity) {
        return insights.map((e) => {
            return e.severity.level
        }).includes(severity)
    }

    function checkAnomalous(pid) {
        if (!anomalies || !anomalies[pid] || !anomalies[pid]["is_anomaly"]) {
            return false;
        } else {
            return anomalies[pid]["anomaly_type"]
        }
    }

    const cellColorSetting = ({ insights }) => cx({ [classes.belowFifty]: containsInsightSeverity(insights, 3) || containsInsightSeverity(insights, 4)})

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
                                {containsInsightSeverity(record.insights, 4) ? (<Badge variant="gradient" gradient={{ from: 'red', to: 'red'}}>CRITICAL!</Badge>) : null}
                                {containsInsight(record.insights, "popular") ? (<Badge color="green">Popular!</Badge>) : null}
                                {containsInsight(record.insights, "popular_low_stock") ? (<Badge color="red">Restock?</Badge>) : null}
                                {checkAnomalous(record.product_id) ? <Badge variant="gradient" gradient={{from: 'green', to: 'green'}}>Anomalous: {checkAnomalous(record.product_id)}</Badge> : null}
                            </Group>
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
                    filtering: selectedCategories.length > 0
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