import React, {useCallback,useMemo,useState, useRef } from 'react';
import { getData } from './data';
import customerPopup from './customerPopup.js';
import vehiclePopup from './vehiclePopup.js';
import StatusTooltip from './tooltipStatus.js';
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-alpine.css"; // Theme
import './style.css';
import { AgGridReact } from '@ag-grid-community/react'; // React Grid Logic
import { ModuleRegistry} from "@ag-grid-community/core";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { MenuModule } from "@ag-grid-enterprise/menu";

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { GridChartsModule } from "@ag-grid-enterprise/charts-enterprise"
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import {SideBarModule} from "@ag-grid-enterprise/side-bar";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
  RangeSelectionModule,
  GridChartsModule,
  SideBarModule,
  MasterDetailModule,
  SetFilterModule,
  MenuModule,
]);


const toolTipValueGetter = (params) => ({ value: params.value });

const DataGrid = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const data = useMemo(() => getData(), []);
    const [rowData] = useState(data, []);
    const paginationPageSize = 20; // Set this to a value in the paginationPageSizeSelector array
    const paginationPageSizeSelector = [5, 10, 20]; // Define the page size options
    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        filter: false,
        resizable: true,
        sortable: true,
        enableValue: false,
        enableRowGroup: true,
        enablePivot: true
    };

    let columnApi;

    const onGridReady = (params) => {
      columnApi = params.columnApi;
      gridRef.current.api.expandAll();
    };

    const gridOptions = {
        //columnDefs: columnDefs,
        defaultColDef: defaultColDef,
        animateRows: true,
        autoGroupColumnDef: {
            cellRendererParams: {
                suppressCount: true,
            }
        },
    };

    const PullUpRO = () => {
        let overlayRO = document.querySelector('.overlay');
        overlayRO.classList.toggle("show");
    }

    const modalPop = (props) => {
        let modal = document.querySelector('.modal');
        //var str = props.replace(/\s+/g, '-').toLowerCase();
        modal.classList.remove('edit-customer', 'edit-vehicle');
    }

    function ROLink(params) {
        return (
            <span className="ROLink" onClick={PullUpRO}> 
                {params.value}
            </span>
        );
    }

    function AllStatus(params) {
        return (
            <span className= {'badge ' + params.value.split(" ").join("")}>
                {params.value}
            </span>
        );
    }

    function TimeRenderer(params) {
        return (
            <span className= "ApptTime">
                {params.value}
            </span>
        );
    }

    const createROColDefs = () => {
        return [
            { field: 'RONumber', 
                cellStyle: { color: '#2B6BDD' },
                headerName: 'RO',
                pinned: 'left',
                maxWidth: 100,
                minWidth: 100, 
                lockPinned: true,
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab'],
                cellRenderer: ROLink,
                
            },
            { field: 'ROStatus', 
                headerName: 'Status', 
                filter: 'agSetColumnFilter',
                menuTabs: ['filterMenuTab'],
                valueParser: 'ROStatus',
                cellRenderer: AllStatus, 
                tooltipComponent: StatusTooltip,
                tooltipValueGetter: toolTipValueGetter,
            },
            { field: 'CustomerName', 
                headerName: 'Customer', 
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab'],
                cellRenderer: customerPopup,
                editable: false,
                colId: 'customer',
                onCellClicked: (params) => {
                    if (
                    params.event.target.dataset.action == 'toggle' &&
                    params.column.getColId() == 'customer'
                    ) {
                    const cellRendererInstances = params.api.getCellRendererInstances({
                        rowNodes: [params.node],
                        columns: [params.column],
                    });
                    if (cellRendererInstances.length > 0) {
                        const instance = cellRendererInstances[0];
                        instance.togglePopup();
                    }
                    }
                },
                
            },
            { field: 'Advisor', 
                filter: 'agSetColumnFilter', 
                menuTabs: ['filterMenuTab'],
                chartDataType: "catagory",
                hide: true,
            },
            { field: 'PromisedTime', 
                headerName: 'Promised',
                maxWidth: 130, 
                minWidth: 130,
                suppressHeaderFilterButton: true 
            },
            { field: 'Vehicle',
                valueGetter: p => {
                    return p.data.Year + ' ' + p.data.Make + ' ' + p.data.Model ;
                },
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab'],
                cellRenderer: vehiclePopup,
                editable: false,
                colId: 'vehicle',
                onCellClicked: (params) => {
                    if (
                    params.event.target.dataset.action == 'toggle' &&
                    params.column.getColId() == 'vehicle'
                    ) {
                    const cellRendererInstances = params.api.getCellRendererInstances({
                        rowNodes: [params.node],
                        columns: [params.column],
                    });
                    if (cellRendererInstances.length > 0) {
                        const instance = cellRendererInstances[0];
                        instance.togglePopup();
                    }
                    }
                },
            },
            { field: 'ShortVIN',
                headerName: 'VIN', 
                tooltipField: 'VIN',
                maxWidth: 100, 
                minWidth: 100,
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab'] 
            },
            { field: 'Model', 
                hide:true 
            },
            { field: 'Make', 
                hide:true 
            },
            { field: 'HangTag', 
                headerName: 'Tag',
                resizable: false,
                maxWidth: 80, 
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab'] 
            },
            { field: 'PayType', 
                headerName: 'Pay',
                resizable: false, 
                maxWidth: 80, 
                cellStyle: { 
                    align: 'center' 
                }, 
                filter: 'agSetColumnFilter',
                menuTabs: ['filterMenuTab'],
                chartDataType: 'series'
            },  
            { field: 'Service Type', 
                headerName: 'Type',
                maxWidth: 200, 
                cellStyle: { 
                    align: 'center' 
                }, 
                filter: 'agSetColumnFilter',
                menuTabs: ['filterMenuTab'],
                chartDataType: 'series'
            },  
          
            { field: 'Tech', 
                hide:true 
            },
            { field: 'TechStatus', 
                hide:true,
                cellRenderer: AllStatus, 
            },
            { field: 'PartsPerson', 
                hide:true 
            },
            { field: 'PartsStatus', 
                hide:true,
                cellRenderer: AllStatus, 
            },
            { field: 'TransportationType', 
                hide:true 
            },
            { field: 'AppointmentID', 
                hide:true 
            },
            { field: 'AppointmentDate', 
                hide:true 
            },
            { field: 'ApppointmentStatus', 
                hide:true,
                cellRenderer: AllStatus, 
            },
            { field: 'PaymentStatus', 
                hide:true,
                cellRenderer: AllStatus, 
            },
            { field: 'WarrantyStatusDealer', 
                hide:true,
                cellRenderer: AllStatus, 
                filter: 'agSetColumnFilter',
                menuTabs: ['filterMenuTab']
             }

      
    ];};

    const createCPColDefs = () => {
        return [
            { field: 'RONumber', 
                cellStyle: { color: '#2B6BDD' },
                headerName: 'RO',
                pinned: 'left',
                maxWidth: 100,
                minWidth: 100, 
                lockPinned: true,
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab'],
                cellRenderer: ROLink,
                
            },
            
            { field: 'PartsStatus', 
                hide:false,
                cellRenderer: AllStatus, 
                rowGroup: true, 
                hide: true,
                sort: 'desc',
            },
            { field: 'PartsPerson',
             hide:false, 
            },
            { field: 'ROStatus', 
            hide:true,
                headerName: 'RO Status', 
                filter: 'agSetColumnFilter',
                menuTabs: ['filterMenuTab'],
                valueParser: 'ROStatus',
                cellRenderer: AllStatus, 
                tooltipComponent: StatusTooltip,
                tooltipValueGetter: toolTipValueGetter,
            },
            { field: 'CustomerName', 
                headerName: 'Customer', 
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab'],
                cellRenderer: customerPopup,
                editable: false,
                colId: 'customer',
                onCellClicked: (params) => {
                    if (
                    params.event.target.dataset.action == 'toggle' &&
                    params.column.getColId() == 'customer'
                    ) {
                    const cellRendererInstances = params.api.getCellRendererInstances({
                        rowNodes: [params.node],
                        columns: [params.column],
                    });
                    if (cellRendererInstances.length > 0) {
                        const instance = cellRendererInstances[0];
                        instance.togglePopup();
                    }
                    }
                },
                
            },

            { field: 'PromisedTime', 
                hide: true,
                headerName: 'Promised',
                maxWidth: 130, 
                minWidth: 130,
                suppressHeaderFilterButton: true 
            },
            { field: 'Vehicle',
                valueGetter: p => {
                    return p.data.Year + ' ' + p.data.Make + ' ' + p.data.Model ;
                },
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab'],
                cellRenderer: vehiclePopup,
                editable: false,
                colId: 'vehicle',
                onCellClicked: (params) => {
                    if (
                    params.event.target.dataset.action == 'toggle' &&
                    params.column.getColId() == 'vehicle'
                    ) {
                    const cellRendererInstances = params.api.getCellRendererInstances({
                        rowNodes: [params.node],
                        columns: [params.column],
                    });
                    if (cellRendererInstances.length > 0) {
                        const instance = cellRendererInstances[0];
                        instance.togglePopup();
                    }
                    }
                },
            },
            { field: 'ShortVIN',
                headerName: 'VIN', 
                tooltipField: 'VIN',
                maxWidth: 100, 
                minWidth: 100,
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab'] 
            },
            { field: 'Model', 
                hide:true 
            },
            { field: 'HangTag', 
                headerName: 'Tag',
                resizable: false,
                maxWidth: 80, 
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab'],
                hide: true
            },
            { field: 'PayType', 
                headerName: 'Pay',
                hide:true,
                resizable: false, 
                maxWidth: 60, 
                cellStyle: { 
                    align: 'center' 
                }, 
                filter: 'agSetColumnFilter',
                menuTabs: ['filterMenuTab'],
                chartDataType: 'series'
            },    
         
            { field: 'Tech', 
                hide:false 
            },
            { field: 'TechStatus', 
                hide:false,
                cellRenderer: AllStatus, 
            },
            { field: 'Advisor', 
            filter: 'agSetColumnFilter', 
            menuTabs: ['filterMenuTab'],
            chartDataType: "catagory",
            hide: false,
            },

            { field: 'TransportationType', 
                hide:false 
            },
            { field: 'AppointmentID', 
                hide:true 
            },
            { field: 'AppointmentDate', 
                hide:true 
            },
            { field: 'ApppointmentStatus', 
                hide:true,
                cellRenderer: AllStatus, 
            },
            { field: 'PaymentStatus', 
                hide:true,
                cellRenderer: AllStatus, 
            }
           
    ];};

    const AppointmentsView = () => {
        return [
            { field: 'CustomerName', hide:false,
                cellStyle: { color: '#2B6BDD' },
                maxWidth: 200,
                minWidth: 200, 
                lockPinned: true,
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab']
            },
            { field: 'Vehicle',
                valueGetter: p => {
                return p.data.Year + ' ' + p.data.Make + ' ' + p.data.Model ;
                },
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab'] 
            },
            
            { field: 'AppointmentTime',
                cellStyle: { color: '#2B6BDD' },
                rowGroup: true, 
                hide: true,
                sortable: true, 
                sort: 'asc',
                cellRenderer: TimeRenderer,
                },
            { field: 'AppointmentDate', 
                hide:false,
                headerName: 'Date',
            },
            { field: 'TransportationType', 
                hide:false,
                headerName: 'Transportation', 
            },
            { field: 'ApppointmentStatus', 
                hide:false,
                headerName: 'Status',
                cellRenderer: AllStatus,
                filter: 'agSetColumnFilter',
                menuTabs: ['filterMenuTab'], 
            },
            { field: 'Advisor', 
                filter: 'agSetColumnFilter', 
                menuTabs: ['filterMenuTab'],
        }
         
        ];
        
    };

    const createCashierColDefs= () => {
        return [
            { field: 'RONumber', 
                hide:false,
                cellStyle: { color: '#2B6BDD' },
                pinned: 'left',
                maxWidth: 120,
                minWidth: 100, 
                lockPinned: true,
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab']
            },
            { field: 'PaymentStatus', 
                hide:false,
                cellRenderer: AllStatus 
            },
            { field: 'AppointmentTime', hide:false  },
            { field: 'AppointmentDate', hide:false },
            { field: 'TransportationType', hide:false },
            { field: 'ApppointmentStatus', hide:false }
            
           
        ];
    };

    const onApptView = useCallback(() => {
        //gridRef.current.api.setColumnDefs(AppointmentsView());
        //gridRef.current.api.setColumnDefs(AppointmentsView())
        gridRef.current.api.updateGridOptions({'columnDefs' : AppointmentsView()});

        gridRef.current.api.expandAll();
    }, []);

    const onROView = useCallback(() => {
       // gridRef.current.api.setColumnDefs(createROColDefs())
        gridRef.current.api.updateGridOptions({'columnDefs' : createROColDefs()});
        gridRef.current.api.expandAll();;
    }, []);

    const onCashierView = useCallback(() => {
       // gridRef.current.api.setColumnDefs(createCashierColDefs());
        gridRef.current.api.updateGridOptions({'columnDefs' : createCashierColDefs()});

    }, []);

    const onCounterView = useCallback(() => {
       //gridRef.current.api.setColumnDefs(createPCColDefs());
        gridRef.current.api.updateGridOptions({'columnDefs' : createPCColDefs()});

        gridRef.current.api.expandAll();
    }, []);

    const [columnDefs, setColumnDefs] = useState(createROColDefs());

    // --- Quick Filter 

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setQuickFilter(
        document.getElementById('filter-text-box').value
        );
    }, []);


    const icons = {
        sortAscending: '<i class="fa fa-sort-asc"/>',
        sortDescending: '<i class="fa fa-sort-desc"/>',
        filter: '<i class="fa fa-filter"/>'
      };
    // SIDE BAR -----------------
   
    
     
    const sideBar = useMemo(() => {
      return {
        toolPanels: [
          {   id: 'customStats',
              labelDefault: 'My Day',
              labelKey: 'customStats',
              iconKey: 'chart',
              toolPanel: 'agColumnsToolPanel',
              minWidth: 180,
              maxWidth: 400,
              width: 250
          },
          {   id: 'columns',
              labelDefault: 'Columns',
              labelKey: 'columns',
              iconKey: 'columns',
              toolPanel: 'agColumnsToolPanel',
              toolPanelParams: {
                  //suppressRowGroups: true,
                  suppressValues: true,
                  suppressPivots: true,
                  suppressPivotMode: true,
                  suppressColumnFilter: true,
                  suppressColumnSelectAll: true,
                  suppressColumnExpandAll: true,
              },
              minWidth: 180,
              maxWidth: 400,
              width: 250
          },
          {
              id: 'filters',
              labelDefault: 'Filters',
              labelKey: 'filters',
              iconKey: 'filter',
              toolPanel: 'agFiltersToolPanel',
              minWidth: 180,
              maxWidth: 400,
              width: 250
          }],
          position: 'left',
          defaultToolPanel: '[]'
          //defaultToolPanel: 'customStats',
      };
    }, []);

   

    const CustomStatsToolPanel = useCallback(() => {
      return (
        <div className="my-stats">
            <h3>My day</h3>
            <h1></h1>
            <div className="chart">
            </div>
            
            <h1>5 Closed ROs</h1>
            <p> Customer Pay Total <b>$1,289.00</b></p>
            <h1>2 Warranty ROs to be closed</h1>
            <p> Comission Pay Total <b>$793.00</b></p>
            <button onClick={restoreFromHardCodedW}>
                Warranty Lines
            </button>
        </div>
    );
    }, []);

// --- Filter Buttons Consts ------


    const changeView = useCallback((myValue) => {

        if (myValue.includes('Not Dispatched')) {
            var hardcodedFilter = {
                ROStatus: {
                    type: 'set',
                    values: ['Not Dispatched'],
                    }
                };
            gridRef.current.api.setFilterModel(hardcodedFilter);
        }

        if (myValue.includes('My Customer Pay ROs')) {
            var hardcodedFilter = {
                Advisor: {
                    type: 'set',
                    values: ['Eric Sanders'],
                    },
                PayType: {
                    type: 'set',
                    values: ['C'],
                }
            };
            gridRef.current.api.setFilterModel(hardcodedFilter);
        
        }

        if (myValue.includes('Cashier View')) {
           //gridRef.current.api.setColumnDefs(createCashierColDefs());
            gridRef.current.api.updateGridOptions({'columnDefs' : createCashierColDefs()});
        }

        if (myValue.includes('Appt View')) {
           // gridRef.current.api.setColumnDefs(AppointmentsView());
            gridRef.current.api.updateGridOptions({'columnDefs' : AppointmentsView()});
            gridRef.current.api.expandAll();
        }

        if (myValue.includes('Repair Orders')) {
           // gridRef.current.api.setColumnDefs(createROColDefs());
            gridRef.current.api.updateGridOptions({'columnDefs' : createROColDefs()});
        }

        if (myValue.includes('Counter Person  View')) {
            //gridRef.current.api.setColumnDefs(createCPColDefs());
            gridRef.current.api.updateGridOptions({'columnDefs' : createCPColDefs()});

            gridRef.current.api.expandAll();
        }

        if (myValue.includes('All ROs')) {
            gridRef.current.api.setFilterModel(null);
        }

    }, []);

    const clearFilters = useCallback(() => {
        gridRef.current.api.setFilterModel(null);
    }, []);

    const restoreFromHardCodedND = useCallback(() => {
        var hardcodedFilter = {
            ROStatus: {
                type: 'set',
                values: ['Not Dispatched'],
            }
        };
        gridRef.current.api.setFilterModel(hardcodedFilter);
    }, []);

    const restoreFromHardCodedW = useCallback(() => {
            var hardcodedFilter = {
                PayType: {
                type: 'set',
                values: ['W'],
            }
        };
        gridRef.current.api.setFilterModel(hardcodedFilter);
    }, []);

    const restoreFromHardCodedMyROs = useCallback(() => {
        var hardcodedFilter = {
            Advisor: {
                type: 'set',
                values: ['Eric Sanders'],
            },
        PayType: {
            type: 'set',
            values: ['C'],
            }
        };
        gridRef.current.api.setFilterModel(hardcodedFilter);
    }, []);


return (
  <div style={containerStyle}>
      <div className="example-wrapper">
          <div>
              <div className="button-group">
                  <select  onChange={e=>changeView(e.target.value)}> 
                    <option value="Repair Orders">Repair Orders</option>
                    <option value="Counter Person  View">Parts Counter</option>
                    <option value="Cashier View">Cashier View</option>
                    <option value="Appt View">Appointment View</option>
                  </select>

                  <select  onChange={e=>changeView(e.target.value)}> 
                  <option value="All ROs">All Repair Orders</option>
                    <option value="Not Dispatched">Not Dispatched</option>
                    <option value="My Customer Pay ROs">My Customer Pay ROs</option>
                  </select>
              
                  <button onClick={clearFilters}>Reset Filters</button>
                  <input
                      type="text"
                      id="filter-text-box"
                      placeholder="Search"
                      onInput={onFilterTextBoxChanged}
                  />
              
              </div>
          </div>
      
          <div className="ag-theme-alpine" style={{ height: 800 }}>
          <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          gridOptions={gridOptions}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          rowSelection={'multiple'}
          sideBar={sideBar}
          icons={icons}
          rowHeight={40}
          groupDisplayType={'groupRows'}
          enableCharts={true}
          tooltipShowDelay={0}
          tooltipHideDelay={2000}
          groupRowsSticky={true}
          onGridReady={onGridReady}
          masterDetail={true}
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
     
          >
          </AgGridReact>
          </div>
      </div>
      <div className="overlay" onClick={PullUpRO}>
     
      </div>
      <div className="modal" onClick={modalPop}></div>
  </div>
);

};

export default DataGrid;
