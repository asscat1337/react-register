import React from "react";
import {Modal} from "../../component/Modal/Modal";
import {CreateData} from "../../component/Table/Data/Data";
import {AppDispatch, RootState} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {getData, getStatus, getUsers, searchData} from "../../store/asyncAction/AsyncDashboard";
import {Loader} from "../../component/Loader/Loader";
import {Columns} from '../../component/Table/Columns/Columns'
import {ColumnsError} from "../../component/Table/Columns/ColumnsError";
import {useDebounce} from "../../hooks/useDebounce";
import {Navbar} from "../../component/Navbar/Navbar";
import {createTheme, ThemeProvider,Tab,Tabs,Box} from "@mui/material";
import {TabPanel,a11yProps} from "../../component/TabPanel/TabPanel";
import {getError, searchError} from "../../store/asyncAction/AsyncError";
import {openSecondTable} from "../../store/slices/errorSlice";

const TableMain = React.lazy(()=>import('../../component/Table/Table'))


const Dashboard: React.FC = () => {
    const [value,setValueIndex] = React.useState<number>(0)
    const [themeStorage,setThemeStorage] = React.useState<any>(localStorage.getItem('theme'))

    const theme = createTheme({
        palette:{
            mode:themeStorage ?? "light"
        }
    })
    const dispatch: AppDispatch = useDispatch()
    const {data, loading, page, pageSize, count} = useSelector((state: RootState) => state.dashboard)
    const {errorData,pageSizeError,countError,pageError,isOpen} = useSelector((state:RootState)=>state.error)
    const fetchIdRef = React.useRef<number>(0)
    const [searchValue,setSearchValue] = React.useState<string>("")
    const search = useDebounce(searchValue)

    React.useEffect(() => {
        const start = async () => {
              await dispatch(getStatus())
              await dispatch(getUsers())
        }
        start()
    }, [])



    React.useEffect(()=>{
        if(!localStorage.getItem('theme')){
            localStorage.setItem('theme','light')
        }
    },[])

    React.useEffect(() => {
        async function searchRequest() {
            isOpen ? await dispatch(searchError(search)) :await dispatch(searchData(search!))
            // await dispatch(searchData(search!))
        }

        if (search !== "") {
            searchRequest()
        }
    }, [search])

    const changeTheme=()=>{
        setThemeStorage((prev:string)=>prev === "light" ? "dark":"light")
        localStorage.setItem('theme',themeStorage)
    }

    React.useEffect(()=>{
        if(search === "" && searchValue === ""){
             dispatch(isOpen ?
                 getError({page:pageError,limit:pageSizeError})
                 :
                 getData({page,pageSize})
             )
        }
    },[search])

    const tableData = CreateData(data)

    const fetchData=React.useCallback(({pageIndex,pageSize}:any)=>{
        const fetchId = ++fetchIdRef.current

         if(fetchId === fetchIdRef.current) {
             console.log(pageIndex,pageSize)
             // dispatch(getData({page:pageIndex, pageSize}))
         }

    },[])

    const handleChange=(event:React.SyntheticEvent,newValue:number)=>{
        setValueIndex(newValue)
    }

    const onFetchDataError=async ()=>{
        await dispatch(getError({page:pageError,limit:pageSizeError}))
        dispatch(openSecondTable(true))
    }
    const onOpenFirstTable=()=>{
        dispatch(openSecondTable(false))
    }

    return (
        <React.Suspense fallback={<Loader/>}>
        <ThemeProvider theme={theme}>
            <Modal/>
            <Box sx={{width:'100%'}}>
                <Navbar
                    darkTheme={themeStorage}
                    onChange={changeTheme}
                />
                <Box sx={{borderBottom:1,borderColor:'divider'}}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Регистр заявок" {...a11yProps(0)} onClick={onOpenFirstTable} />
                        <Tab label="Ошибки" {...a11yProps(1)} onClick={onFetchDataError}/>
                    </Tabs>
                </Box>
                {/*{loading && <Loader/>}*/}
                <TabPanel value={value} index={0}>
                    <TableMain
                        loading={loading}
                        data={tableData}
                        columns={Columns()}
                        count={count}
                        fetchData={fetchData}
                        page={page}
                        pageRowSize={pageSize}
                        setSearchValue={setSearchValue}
                        searchValue={searchValue}
                        search={search}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TableMain
                        loading={loading}
                        data={errorData}
                        columns={ColumnsError()}
                        page={pageError}
                        pageRowSize={pageSizeError}
                        count={countError}
                        setSearchValue={setSearchValue}
                        searchValue={searchValue}
                        search={search}
                    />
                </TabPanel>

            </Box>
        </ThemeProvider>
        </React.Suspense>
    )
}
export default Dashboard