"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import MyModal from "../modal";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import Link from "next/link";
import EditModal from "../modal/EditModal";

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("country", {
    header: "Country",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("countryCode", {
    header: "Country code",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("skillSet", {
    header: "Skill set",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: "Date Created",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
];

export function Table({ data, setData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [tableData, setTableData] = useState({});
  const [editData, setEditData] = useState({});

  const deleteTalent = async (id) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/talents/${id}`, {
        method: 'DELETE',
      });
      const updatedData = data.filter((item) => item._id !== id);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting talent:", error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const openModal = (details) => {
    setIsOpen(true);
    setTableData(details);
  };
  
  const openEditModal = (details) => {
    setIsEditOpen(true);
    setEditData(details);
  };

  const onSave = (updatedTalent) => {
    const updatedData = data.map((item) => 
      item._id === updatedTalent.talent._id ? updatedTalent.talent : item 
    );
    setData(updatedData);
    setIsEditOpen(false); // Close the edit modal after saving
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
                    <MenuItem onSelect={() => openEditModal(row.original)}>
                      Edit
                    </MenuItem>
                    <MenuItem onSelect={() => deleteTalent(row.original._id)}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      VIEW MORE MODAL
      <br></br>
      <br></br>
      {isEditOpen && (
        <EditModal
          isEditOpen={isEditOpen}
          closeEditModal={closeEditModal}
          talentData={editData}
          onSave={onSave}
        />)
      }

      <MyModal
        closeModal={closeModal}
        openModal={openModal}
        title={"View More Information"}
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
                {tableData._id}
              </p>
              <p>
                <span>Name: </span>
                {tableData.name}
              </p>
              <p>
                {" "}
                <span>Country: </span>
                {tableData.country}
              </p>
              <p>
                {" "}
                <span>Country code: </span>
                {tableData.countryCode}
              </p>
              <p>
                <span>SkillSet: </span>
                {tableData.skillSet}
              </p>
              <p>
                <span>Level: </span>
                {tableData.level}
              </p>
              <p>
                <span>Gender: </span>
                {tableData.gender}
              </p>
              <Link href={tableData.portfolio}>
                <span>Portfolio: </span>
                {tableData.portfolio}
              </Link>
              <img src={tableData.image} alt="profile image" />
              {/* <p>
                <span>Profile Title: </span>
                {tableData.profileTitle}
              </p> */}
            </div>
          </section>
        }
      />
      
    </div>
    
  );
}
