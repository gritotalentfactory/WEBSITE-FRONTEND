"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TableData } from "./tableData";
import { view } from "../modal";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuLink,
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("Name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Country", {
    header: "Country",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("skill", {
    header: "Skill",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("dateCreated", {
    // New "Date Created" column
    header: "Date Created",
    cell: (info) => new Date().toLocaleDateString(), // Assuming dateCreated is a valid date
  }),
  // columnHelper.accessor("view more", {
  //   cell: (info) => view.icon,
  // }),
];

export function Table() {
  const [data, setData] = useState(TableData);

  const OpenModal = (row) => {
    console.log(row);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ margin: "20px" }}>
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
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
                  textAlign: "left",
                }}
              >
                <Menu>
                  <MenuButton
                    style={{
                      background: "transparent",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    <BsThreeDotsVertical />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onSelect={() => OpenModal(row.original)}>
                      View More
                    </MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                  </MenuList>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
