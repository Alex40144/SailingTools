import React, { ChangeEvent, useState } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import Select from 'react-select';
import { PY_List_2023 } from './PY';




const Text = ({ ...props }) => {
    const initialValue = props.getValue()
    const [value, setValue] = React.useState(initialValue)

    const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const original = props.row.original
        original[props.column.id] = e.target.value
        props.updateEntrant(original)
    }

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])
    return (
        <>
            <input type="text"
                id=''
                className=" text-center"
                defaultValue={value}
                key={value}
                onBlur={(e) => onBlur(e)}
            />
        </>
    );
};

const Number = ({ ...props }: any) => {
    const initialValue = props.getValue()
    const [value, setValue] = React.useState(initialValue)

    const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
        let original = props.row.original
        original[props.column.id] = parseInt(e.target.value)
        props.updateEntrant(original)
    }

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])
    return (
        <>
            <input type="number"
                id=''
                className="p-2 m-2 text-center w-full"
                defaultValue={Math.round(value)}
                key={value}
                onBlur={(e) => onBlur(e)}
            />
        </>
    );
};

const Time = ({ ...props }: any) => {
    const initialValue = props.getValue()
    const [value, setValue] = React.useState(initialValue)

    const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
        let original = props.row.original
        original[props.column.id] = e.target.value
        props.updateEntrant(original)
    }

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])
    return (
        <>
            <input type="time"
                id=''
                className="p-2 m-2 text-center w-full"
                defaultValue={value}
                key={value}
                step={"1"}
                onBlur={(e) => onBlur(e)}
            />
        </>
    );
};

const Class = ({ ...props }: any) => {
    const initialValue = props.getValue()
    const [value, setValue] = React.useState(initialValue)

    let options: any = []

    PY_List_2023.forEach(boat => {
        options.push({ value: boat, label: boat.name })
    })


    const onBlur = (newValue: any) => {
        let original = props.row.original
        original[props.column.id] = newValue
        props.updateEntrant(original)
    }

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])
    return (
        <>
            <Select
                className='w-max min-w-full'
                defaultValue={{ value: value, label: value.name }}
                key={value}
                onChange={(e) => { setValue(e?.value); onBlur(e?.value) }}
                options={options}
            />

        </>
    );
};

const Remove = ({ ...props }: any) => {
    const onClick = () => {
        console.log(props.id)
        props.removeEntrant(props.id)
    }
    return (
        <>
            <p className="cursor-pointer text-white bg-blue-600 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                onClick={onClick} >
                Remove
            </p>
        </>
    );
};


const columnHelper = createColumnHelper<ResultsDataType>()

const RaceResultsTable = (props: any) => {
    let [data, setData] = useState(props.data)
    const removeEntrant = (id: any) => {
        props.removeEntrant(id)
    }

    const updateEntrant = (Entrant: ResultsDataType) => {
        props.updateEntrant(Entrant)
    }

    let table = useReactTable({
        data,
        columns: [
            columnHelper.accessor('Helm', {
                header: "Helm",
                cell: props => <Text {...props} updateEntrant={updateEntrant} />
            }),
            columnHelper.accessor('Crew', {
                header: "Crew",
                cell: props => <Text {...props} updateEntrant={updateEntrant} />
            }),
            columnHelper.accessor('Class', {
                header: "Class",
                size: 300,
                cell: props => <Class {...props} updateEntrant={updateEntrant} />
            }),
            columnHelper.accessor('BoatNumber', {
                header: "Sail Number",
                cell: props => <Number {...props} updateEntrant={updateEntrant} />
            }),
            columnHelper.accessor('Time', {
                header: "Time",
                cell: props => <Time {...props} updateEntrant={updateEntrant} />
            }),
            columnHelper.accessor('Laps', {
                header: "Laps",
                cell: props => <Number {...props} updateEntrant={updateEntrant} />
            }),
            columnHelper.accessor('CorrectedTime', {
                header: "Corrected Time",
                cell: props => <Number {...props} updateEntrant={updateEntrant} />
            }),
            columnHelper.accessor('Position', {
                header: "Position",
                cell: props => <Number {...props} updateEntrant={updateEntrant} />
            }),
            columnHelper.display({
                id: "Remove",
                cell: props => <Remove {...props} id={props.row.original.id} removeEntrant={removeEntrant} />
            }),
        ],
        getCoreRowModel: getCoreRowModel()
    })

    console.log(data)
    return (
        <div key={props.data} className='block max-w-full'>
            <table className='w-full border-spacing-0'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className='border-4 p-2' style={{ width: header.getSize() }}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className='border-4 p-2 w-1'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RaceResultsTable