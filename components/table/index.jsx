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
import MyModal, { view } from "../modal";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuLink,
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import Link from "next/link";

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
    header: "Date Created",
    cell: (info) => new Date().toLocaleDateString(),
  }),
];

export function Table() {
  const [data, setData] = useState(TableData);
  const deletItem = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  let [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] = useState({});

  function closeModal(id) {
    setIsOpen(false);
  }

  const openModal = (details) => {
    setIsOpen(!isOpen);
    setTableData(details);
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
                    <MenuItem onSelect={() => openModal(row.original)}>
                      View More
                    </MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem onSelect={() => deletItem(row.original.id)}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <MyModal
        closeModal={closeModal}
        openModal={openModal}
        title={"View More Infomation "}
        isOpen={isOpen}
        content={
          <section>
            <p
              onClick={closeModal}
              className=" text-red-700 cursor-pointer flex justify-end"
            >
              X
            </p>
            <div className="flex flex-col gap-4">
              <p>
                {" "}
                <span>Id: </span>
                {tableData.id}
              </p>
              <p>
                <span>Name: </span>
                {tableData.Name}
              </p>
              <p>
                {" "}
                <span>Country: </span>
                {tableData.Country}
              </p>
              <p>
                <span>SkillSet: </span>
                {tableData.skill}
              </p>
              <p>
                <span>Level: </span>
                {tableData.leve}
              </p>
              <p>
                <span>Gender: </span>
                {tableData.gender}
              </p>
              <Link href={tableData.portfolio}>
                <span>Portfolio: </span>
                {tableData.portfolio}
              </Link>
              <img src={tableData.profileImage} alt="" />
              <p>
                <span>Profile Title: </span>
                {tableData.profileTitle}
              </p>
            </div>
          </section>
        }
      />
    </div>
  );
}
