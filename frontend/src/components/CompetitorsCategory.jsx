import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex } from '@mantine/core';

function CategoryCell({ record }) {
    // const [prodCategory, setProdCategory] = useState(null);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     if (record === undefined) {
    //         setProdCategory("NIL");
    //         setLoading(false);
    //     } else {
    //         const ProdText = `Product Name: ${record.product_name} \nProduct Description: ${record.product_description}`;
    //         axios.post('http://127.0.0.1:3000/api/v1/classify-category', { text: ProdText })
    //             .then((response) => {
    //                 const data = response.data;
    //                 setProdCategory(data.category);
    //             })
    //             .catch((error) => {
    //                 console.error('Error occurred during category classification:', error);
    //             })
    //             .finally(() => {
    //                 setLoading(false);
    //             });
    //     }
    // }, [record]);

    // if (loading) {
    //     return <Flex gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">Loading...</Flex>;
    // }
    console.log("result: ", record)

    return (
        <Flex gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
            {record.category}
        </Flex>
    );
}

export default CategoryCell;
