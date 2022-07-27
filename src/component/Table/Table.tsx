import React from "react";
import {
    CellProps,
    HeaderProps,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable,
    Hooks,
    useBlockLayout,
    useResizeColumns
} from 'react-table'
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    TableFooter, Typography, CssBaseline, styled
} from "@mui/material";
import {TableToolbar} from "./TableToolbar/TableToolbar";
import {ColumnCheckbox} from "./Checkbox/ColumnCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {deleteData, getData, searchData} from "../../store/asyncAction/AsyncDashboard";
import {AppDispatch, RootState} from "../../store";
import {setEditData} from "../../store/slices/dashboardSlice";
import {TablePaginationActions} from "./TablePagination/TablePagination";
import {GlobalFilter} from "./GlobalFilter/GlobalFilter";
import {Filter} from "./Filter/Filter";
import {deleteError} from "../../store/asyncAction/AsyncError";
import {setEditError} from "../../store/slices/errorSlice";

interface ITable {
    data: any,
    columns: any,
    loading?: boolean,
    count?: number,
    pageRowSize?: number,
    fetchData?: any,
    page?: number,
    setSearchValue: any,
    searchValue: string,
    search: string,
    notify:(message:string)=>void
}
const StyledTabled = styled(TableContainer)(({theme})=>`
          .resizer {
        display: inline-block;
        background: silver;
        width: 1px;
        height: 35px;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;
        &.isResizing {
          background: red;
        }
      }
`)

const TableMain: React.FC<ITable> = ({
                                         data,
                                         columns,
                                         count,
                                         pageRowSize,
                                         page,
                                         setSearchValue,
                                         searchValue,
                                         notify
                                     }) => {
    const dispatch: AppDispatch = useDispatch()

    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 45,
            width: 150,
            maxWidth: 400,
        }),
        []
    )


    const {isOpen} = useSelector((state:RootState)=>state.error)
    const tableInstance = useTable({
        columns,
        data,
        defaultColumn,
        initialState: {pageIndex: page, pageSize: pageRowSize},
        manualPagination: true,
        pageCount: count
    }, useGlobalFilter, useSortBy, usePagination, useRowSelect,useBlockLayout,useResizeColumns,(hooks: Hooks<any>) => {
        hooks.allColumns.push(columns => [
            {
                id: 'selection',
                Header: ({getToggleAllRowsSelectedProps}: HeaderProps<any>) => (
                    <ColumnCheckbox {...getToggleAllRowsSelectedProps()} />
                ),
                Cell: ({row}: CellProps<any>) => <ColumnCheckbox {...row.getToggleRowSelectedProps()}/>,
            },
            ...columns
        ])
    })
    const {
        getTableBodyProps,
        getTableProps,
        headerGroups,
        rows,
        setPageSize,
        prepareRow,
        selectedFlatRows,
        gotoPage,
        state: {pageIndex, pageSize, selectedRowIds},
        resetResizing
    } = tableInstance

    const deleteRow = async (data: any):Promise<void>=> {
        const mappedData = data.map((item: any) => isOpen ? item.original.error_id : item.original.request_id)
        if(isOpen){
            const {payload}:any = await dispatch(deleteError(mappedData))
            notify(payload.message)
            return
        }
        const {payload}:any =  await dispatch(deleteData(mappedData))
        notify(payload.message)
    }
    const editData = (data: any): void => {
        const editable = data[0].original
        dispatch(isOpen ? setEditError(editable) :setEditData(editable))
    }
    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        gotoPage(newPage)
    }
    const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value)
        await dispatch(getData({page:pageIndex,pageSize:+event.target.value}))
    }
    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }
    const onClearSearch=(event:React.MouseEvent<HTMLButtonElement>)=>{
        setSearchValue("")
    }


    return (
        <Box sx={{width: '100%'}}>
            <CssBaseline/>
            <Paper sx={{width: '100%', mb: 1}}>
                <TableToolbar
                    numSelected={Object.keys(selectedRowIds).length}
                    deleteData={() => deleteRow(selectedFlatRows)}
                    editData={() => editData(selectedFlatRows)}
                />
                <Box sx={{display:'flex',alignItems:'center'}}>
                    <GlobalFilter
                        onSearch={onSearch}
                        value={searchValue}
                        onClearSearch={onClearSearch}
                    />
                    <Filter
                        instance={tableInstance}
                    />
                </Box>
                <StyledTabled sx={{mt:3}}>
                    <Table {...getTableProps()}>
                        <TableHead>
                            {headerGroups.map((header: any) => (
                                <TableRow {...header.getHeaderGroupProps()}>
                                    {header.headers.map((column: any) => (
                                        <TableCell
                                            component="th"
                                            {...column.id === 'selection' ? (
                                                column.getHeaderProps()
                                            ) : column.getHeaderProps(column.getSortByToggleProps())}
                                        >
                                            {column.render("Header")}
                                            {column.id !== 'selection' ? (
                                                <TableSortLabel
                                                    active={column.isSorted}
                                                    direction={column.isSortedDesc ? "desc" : "asc"}
                                                />
                                            ) : null}
                                            <div
                                                {...column.getResizerProps()}
                                                className={`resizer ${
                                                    column.isResizing ? 'isResizing' : ''
                                                }`}
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody {...getTableBodyProps()}>
                            {data.length ?
                                (
                                    rows.map((row: any) => {
                                        prepareRow(row)

                                        return (
                                            <TableRow {...row.getRowProps()}>
                                                {row.cells.map((cell: any) => {
                                                    return (
                                                        <TableCell {...cell.getCellProps()}>
                                                            {
                                                                cell.render('Cell')
                                                            }
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        )
                                    })
                                )
                                :
                                (
                                    <TableRow>
                                        <TableCell colSpan={8} sx={{textAlign:'center'}}>
                                            <Typography variant="h5" component="h5">
                                                Нет данных 😔
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            }

                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={5}
                                    rowsPerPageOptions={[5, 10, 25, {label: "Все", value: -1}]}
                                    count={count!}
                                    page={pageIndex}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    rowsPerPage={pageSize}
                                    labelRowsPerPage={'Количество'}
                                    labelDisplayedRows={({from,to,count})=>(
                                        `${from}-${to} из ${count}`
                                    )}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </StyledTabled>
            </Paper>
        </Box>
    )
}
export default TableMain