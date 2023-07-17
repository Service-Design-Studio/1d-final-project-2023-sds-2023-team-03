import { DataTable } from 'mantine-datatable';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    belowFifty: {
        color: "#d0342c",
        fontWeight: "bold"
    }
}));

function MerchandisingTable({ data, threshold }) {
    const { classes, cx } = useStyles();

    return (
        <div className='table'>
            <DataTable    // low products
              maxheight={'30vh'}
              withBorder
              shadow="sm"
              withColumnBorders
              striped
              highlightOnHover
              verticalAlignment='center'
              columns={[
                { accessor: 'product_name', 
                  textAlignment: 'center',
                  cellsClassName: ({ stock }) => cx({ [classes.belowFifty]: stock < threshold}),
                },
                { accessor: 'stock',
                  textAlignment: 'center',
                  cellsClassName: ({ stock }) => cx({ [classes.belowFifty]: stock < threshold}),
                },
                { accessor: 'last_resupplied' ,
                  textAlignment: 'center',
                  cellsClassName: ({ stock }) => cx({ [classes.belowFifty]: stock < threshold}),
                }
              ]}
              records={data}
            />
        </div>
    )
}

export default MerchandisingTable;