"use client";
import React from "react";
import axios from "axios";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  PaginationState,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
// import { TableData } from "./tableData";
import MyModal, { view } from "../modal";
import EditFormModal from "../modal/editModal";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetAdminTalent,
  useGetLandingTalent,
  useDeleteTalent,
} from "@/services/talentAdmin/adminApi";

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("user.name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("user.country", {
    header: "Country",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("skill_set", {
    header: "Skill",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("user.email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("skill_level", {
    header: "Level",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("user.gender", {
    header: "Gender",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("dateCreated", {
    header: "Date Created",
    cell: () => new Date().toLocaleDateString(),
  }),
];

export function ClientTable() {
  const getTalentMutation = useGetLandingTalent();
  const deleteTalentMutation = useDeleteTalent();
  const talentDetails = getTalentMutation.data;
  let [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] = useState({});
  const [sorting, setSorting] = useState([]);
  const [isEditModal, setEditModal] = useState(false);
  const [singleData, setSingleData] = useState();

  useEffect(() => {
    getTalentMutation.refetch();
    if (talentDetails) {
      setTableData(talentDetails);
    }
  }, [talentDetails]);

  const deletItem = async (data) => {
    console.log("my id is ", data?.user?.id);
    alert("You sure you wana delete");
    try {
      const response = await deleteTalentMutation.mutateAsync(data?.user?.id);
      if (response) {
        // window.location.reload();
        toast.success("Talent Deleted successfully");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }

    // const updatedData = data.filter((item) => item.id !== id);
    // setData(updatedData);
  };

  function closeModal(id) {
    setIsOpen(false);
    window.location.reload();
  }
  function closeEditModal() {
    setEditModal(false);
  }
  const openEditModal = (data) => {
    setSingleData(data);
    setEditModal(true);
  };

  const openModal = (talentDetails) => {
    setIsOpen(!isOpen);
    setTableData(talentDetails);
  };

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    debugTable: true,
  });
  const sortByName = () => {
    table.sortBy("Name");
  };
  const options = [
    { value: "viewMore", label: "View More" },
    { value: "edit", label: "Edit" },
    { value: "delete", label: "Delete" },
  ];
  const handleSelect = (row, selectedOption) => {
    switch (selectedOption.value) {
      case "viewMore":
        openModal(row.original);
        break;
      case "edit":
        openEditModal(row.original);
        break;
      case "delete":
        deletItem(row.original);
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ margin: "20px", width: "96%" }}>
      <>
        <button onClick={sortByName}>Sort by Name</button>
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

        <div className="flex justify-between pt-9">
          <div>
            <button onClick={() => table.setPageIndex(0)}>⏪</button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {" "}
              ◀️
            </button>

            <button onClick={table.nextPage} disabled={!table.getCanNextPage()}>
              ▶️
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              ⏩
            </button>
          </div>
          <div className="flex gap-6">
            <p>
              You are on page: {table.options.state.pagination?.pageIndex} of :{" "}
              {table.getPageCount() - 1}{" "}
            </p>
            <div className="flex gap-6">
              <p>
                {" "}
                Show:{" "}
                <select
                  value={table.options.state.pagination?.pageSize}
                  onChange={(e) => table.setPageSize(e.target.value)}
                >
                  {[2, 4, 5, 10, 20, 50].map((pageSizeEl) => {
                    return (
                      <option key={pageSizeEl} value={pageSizeEl}>
                        {pageSizeEl}
                      </option>
                    );
                  })}
                </select>{" "}
                per Page
              </p>
              <h4>
                Current page size: {table.options.state.pagination?.pageSize}
              </h4>
            </div>
          </div>
        </div>
      </>
      {/* VIEW MORE MODAL */}
      {/*  */}
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
              Hello
              <p>
                <span>Name: {tableData?.user?.name} </span>
              </p>
              <p>
                <span>Email: {tableData?.user?.email} </span>
              </p>
              <p>
                <span>Skill Set: {tableData.skill_set}</span>
              </p>
              <p>
                <span>Name: {tableData.skill_level} </span>
              </p>{" "}
              <p>
                <span>Country: {tableData?.user?.country} </span>
              </p>
              {/* <div>
                <span>Image: </span>
                <Image
                  src={tableData?.user?.image_url} 
                  width={200}
                  height={200}
                  alt="Profile Image"
                />
              </div> */}
            </div>
          </section>
        }
      />

      {/* EDIT MODAL */}
      {isEditModal && (
        <EditFormModal
          openModal={openEditModal}
          closeModal={closeEditModal}
          singleData={singleData}
        />
      )}
    </div>
  );
}
