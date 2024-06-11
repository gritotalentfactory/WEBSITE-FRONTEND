"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("clientName", {
    header: "Client Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("country", {
    header: "Country",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("skillSet", {
    header: "Skill set",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("clientEmail", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("clientWnum", {
    header: "Whatsapp Number",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("level", {
    header: "Level",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("requestedAt", {
    header: "Date Requested",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
];

export function ClientTable({ data }) {
  const [tableData, setTableData] = useState(data);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  const deleteItem = async (data) => {
    try {
      const response = await axios.delete(`https://website-backend-ot9lnm91k-grito-talent-agency.vercel.app/admin/talent-request/${data.id}`);
      if (response.status === 200) {
        toast.success("Talent request deleted successfully.");
        setTableData((prevData) => prevData.filter((item) => item.id !== data.id));
      }
    } catch (error) {
      toast.error("Failed to delete talent request.");
    }
  };

  const options = [
    { value: "delete", label: "Delete" },
  ];

  const handleSelect = (row, selectedOption) => {
    if (selectedOption.value === "delete") {
      deleteItem(row.original);
    }
  };

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <div style={{ margin: "20px", width: "96%" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "left",
                  }}
                  {...{
                    className: header.column.getCanSort()
                      ? "cursor-pointer select-none"
                      : "",
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Action
              </th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                  width: 140,
                }}
              >
                <Select
                  options={options}
                  isSearchable={false}
                  placeholder={""}
                  components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => <BsThreeDotsVertical />,
                  }}
                  onChange={(change) => handleSelect(row, change)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
