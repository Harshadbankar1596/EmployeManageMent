import { React, useCallback, useState } from 'react'
import { useGetallmembersnameQuery } from '../../../redux/adminapislice'
import { useGetemployeedailyreportMutation } from '../../../redux/adminapislice'
import Loader from '../../loader.jsx'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useParams } from 'react-router-dom';
ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from 'ag-grid-react';
import { useEffect } from 'react';
const Employeedailyreport = () => {
    const [getworks, { isLoading: workloading }] = useGetemployeedailyreportMutation()
    const [openworkmodal, setopenworkmodal] = useState(false)

    const { id } = useParams()
    useEffect(() => {
        if (id) {
            getwork(id)
        }
    }, [])

    const getwork = useCallback((userid) => {
        getworks(userid).then((data) => {
            const demoworks = data.data.work?.work?.map((works) => ({
                date: works.date,
                time: works.time,
                project: works.project || "others",
                work: works.work,
            })) || [];
            setrowdata(demoworks);
        });
    }, []);

    const { data: users, isLoading: loadingusernames } = useGetallmembersnameQuery()


    const [rowdata, setrowdata] = useState([])

    const [coldefs, setColdefs] = useState([
        { field: "date" },
        { field: "time" },
        { field: "work" },
        { field: "project" },
    ]);

    if (loadingusernames || workloading) {
        return (<Loader />)
    }

    return (
        <div className="p-4">


            <div className="flex flex-wrap gap-3 p-4 rounded-xl">
                {users?.usersname?.map((user) => (
                    <button
                        onClick={() => getwork(user.id)}
                        key={user.id}
                        className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
                    >
                        {user?.name}
                    </button>
                ))}
            </div>

            <div
                data-lenis-prevent
                className="ag-theme-alpine-dark shadow-xl"
                style={{
                    height: "500px",
                    width: "100%",
                }}
            >
                <AgGridReact
                    rowData={rowdata}
                    columnDefs={coldefs}
                    defaultColDef={{
                        sortable: true,
                        filter: true,
                        resizable: true,
                        flex: 1,
                        minWidth: 120,
                        wrapText: true,
                        autoHeight: true,
                        wrapHeaderText: true,
                        cellStyle: {
                            'white-space': 'normal',
                            'line-height': '1.8',
                            'text-align': 'left'
                        },
                        headerClass: 'font-bold text-blue-600',
                        cellClass: 'text-black'
                    }}
                    pagination={true}
                    paginationPageSize={10}
                    rowSelection="single"
                    ensureDomOrder={true}
                    suppressCellFocus={true}
                    onGridReady={(params) => params.api.sizeColumnsToFit()}
                />
            </div>
        </div>

    )
}

export default Employeedailyreport
