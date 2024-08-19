import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import {
  faCancel,
  faChevronLeft,
  faChevronRight,
  faSearch,
  faSort,
  faSortAmountAsc,
  faSortAmountDesc,
} from "@fortawesome/free-solid-svg-icons";
import { rankItem } from "@tanstack/match-sorter-utils";
import { useDispatch, useSelector } from "react-redux";
import { cancelTurnAction } from "../redux/slices/turnSlice";
import Sawl from 'sweetalert2';
import '../styles/sweetalert.scss';
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({ itemRank });
  return itemRank.passed;
};

// eslint-disable-next-line react/prop-types
const DebouncedInput = ({ value: keyWord, onChange, ...props }) => {
  const [value, setValue] = useState(keyWord);
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, 500);
    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};


const getStatusClass = (status) => {
  switch (status) {
    case 'cancelado':
      return 'text-white text-center p-2 rounded-lg bg-red-500';
    case 'pendiente':
      return 'text-white text-center p-2 rounded-lg bg-yellow-500';
    case 'Completado':
      return 'text-white text-center p-2 rounded-lg bg-green-500';
    default:
      return '';
  }
};
// eslint-disable-next-line react/prop-types
const DataTable = ({ data }) => {

  
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const handleCancel = (id) => {
    Sawl.fire({
      title: '¿Estas seguro de cancelar este turno?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Cancelar',
      allowEscapeKey: true,
      allowOutsideClick: true,
      allowEnterKey: true,
      stopKeydownPropagation: true
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cancelTurnAction(id, userId));
        Sawl.fire({
          background: '#a00404',
          color: '#fff',
          customClass:{
            timerProgressBar: 'timerProgressBar',
            icon: 'icon'
          },
          position: 'bottom-end', toast: true, icon: 'success', title: 'Turno cancelado', showConfirmButton: false, timer: 3000, timerProgressBar: true  })
      }
    })
    
};
  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Date", accessorKey: "date" },
    { header: "Hour", accessorKey: "time" },
    { header: "Description", accessorKey: "description" },
    { header: "Status", accessorKey: "status",
    cell: (info) => {
      const status = info.getValue();
      return <p className={getStatusClass(status)}>{status}</p>;
    }

    },
    {
      header: "Action",
      accessorKey: "action",
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row: { original } }) => (
        <button 
          className={`${original.status === 'cancelado' ? 'opacity-50 bg-blue-500 text-white p-2 rounded-lg ': ' bg-blue-500 text-white p-2 rounded-lg hover:bg-red-500 ' }`}  
          onClick={() => handleCancel(original.id)}
          disabled={original.status === 'cancelado'} 
        > 
          <FontAwesomeIcon className={` ${original.status === 'cancelado' && 'opacity-50'}`} icon={faCancel} />
         {" "} CANCELAR
        </button>
      ),
    },
  ];
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const getStateTable = () => {
    const totalRows = table.getFilteredRowModel().rows.length;
    const pageSize = table.getState().pagination.pageSize;
    const pageIndex = table.getState().pagination.pageIndex;
    const rowsPerPage = table.getRowModel().rows.length;

    const firstIndex = (pageIndex * pageSize) + 1;
    const lastIndex = (pageIndex * pageSize) + rowsPerPage;

    return {
      totalRows,
      firstIndex,
      lastIndex
    }
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    globalFilterFn: fuzzyFilter,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5
      }
    },
  });
  return (
    <>
      <div className="my-2 flex justify-end ">
        <div className="relative">
          <DebouncedInput
            type="text"
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="px-6 py-2 text-gray-600 border border-gray-300 rounded outline-indigo-700"
            placeholder="Buscar..."
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-3 text-gray-600"
          />
        </div>
      </div>
      <div className="overflow-x-auto ">
        <table className="w-full table-auto">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="py-2 px-4 text-left uppercase">
                    {header.isPlaceholder ? null : (
                      <div
                        className="flex items-center gap-2"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <FontAwesomeIcon
                              icon={faSortAmountAsc}
                              className="w-3 h-3"
                            />
                          ),
                          desc: (
                            <FontAwesomeIcon
                              icon={faSortAmountDesc}
                              className="w-3 h-3"
                            />
                          ),
                        }[header.column.getIsSorted()] ??
                          (header.column.getCanSort() ? (
                            <FontAwesomeIcon
                              icon={faSort}
                              className="w-3 h-3"
                            />
                          ) : null)}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr key={row.id}  className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2 px-4 text-left ">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 md:flex items-center justify-between text-center'>
        <div className='flex items-center gap-2 '>
          <button
            className='text-black py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-rose-500 disabled:hover:text-black'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
              <FontAwesomeIcon icon={faChevronLeft} className='w-5 h-5' />
          </button>
          <button
            className='text-black py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-rose-500 disabled:hover:text-black'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <FontAwesomeIcon icon={faChevronLeft} className='w-5 h-5' />
          </button>

          {table.getPageOptions().map((value, key) => (
            <button key={key}
              onClick={() => table.setPageIndex(value)}>
              {value + 1}
            </button>
          ))}

          <button
            className='text-black py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-rose-500 disabled:hover:text-black'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
             <FontAwesomeIcon icon={faChevronRight} className='w-5 h-5' />
          </button>
          <button
            className='text-black py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-rose-500 disabled:hover:text-black'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            <FontAwesomeIcon icon={faChevronRight} className='w-5 h-5' />
          </button>
        </div>
        <div className='flex items-center align-middle'>
         <p className="text-black font-semibold ">
         Mostrando de {getStateTable().firstIndex}&nbsp;
          a {getStateTable().lastIndex}&nbsp;
          del total de {getStateTable().totalRows} registros
          </p> 
        </div>
        <select
          className='flex items-center text-black border  rounded '
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}>
          <option value="5">5 pág.</option>
          <option value="10">10 pág.</option>
          <option value="15">15 pág.</option>
          <option value="20">20 pág.</option>
        </select>
      </div>
    </>
  );
};

export default DataTable;
