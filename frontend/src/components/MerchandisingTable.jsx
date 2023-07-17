import { DataTable } from 'mantine-datatable';

function MerchandisingTable({ data }) {
    return (
        <div className='table'>
            <DataTable    // low products
              height={'30vh'}
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
                },
                { accessor: 'stock',
                  textAlignment: 'center',
                },
                { accessor: 'last_resupplied' ,
                  textAlignment: 'center',
                }
              ]}
              records={data}
            />
        </div>
    )
}

export default MerchandisingTable;