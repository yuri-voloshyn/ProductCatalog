import React from 'react';
import Table from 'react-bootstrap/Table';

export interface DTColumn {
    name: string;
    title?: string;
}

export interface DataTableProps {
    columns: DTColumn[];
    data?: any[];
    renderCell?: (rowData: any, cellName: string, cellData: any) => any;
}

export const DataTable: React.FC<DataTableProps> = (props) => {

    const renderHeader = () => {
        return props.columns.map(item => {
            return (
                <th
                    key={item.name}
                >{item.title}
                </th>
            );
        });
    }

    const renderDataRow = (row: any) => {
        return props.columns.map(item => {
            const data = row[item.name];
            return (
                <td key={item.name}>{props.renderCell ? props.renderCell(row, item.name, data) : data}</td>
            );
        });
    }

    const renderBody = () => {
        return props.data && props.data.map((item, index) => {
            return (
                <tr key={index}>{renderDataRow(item)}</tr>
            );
        });
    }

    return (
        <Table striped bordered size="sm">
            <thead>
                <tr>
                    {renderHeader()}
                </tr>
            </thead>
            <tbody>
                {renderBody()}
            </tbody>
        </Table>
    );
}