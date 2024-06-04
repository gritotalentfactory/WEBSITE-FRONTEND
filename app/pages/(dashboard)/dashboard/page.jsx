"use client";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { getCurrentDate } from "@/utils/dateFormat";
import Card from "@/components/card";
import Button from "@/components/ui/button";
import CreateTalentModal from "@/components/modal/CreateTalentModal";
import { PDFDownloader } from "@/components/pdfDownloader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "@/components/table";

// Helper function for decoding JWT
function parseJWT(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(atob(base64).split("").map((c) =>
      "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(""));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid JWT Token:", error);
    return null;
  }
}

const AdminDashboard = () => {
  const token = Cookies.get("adminData");
  let adminData = {};

  if (token) {
    adminData = parseJWT(token);
  }

  const time = getCurrentDate();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/talents`, {
          credentials: "include" // Include cookies in the request
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        toast.error("Failed to fetch talents");
      }
    };
    fetchData();
  }, []);

  const openCreateModal = () => {
    setIsCreateOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateOpen(false);
  };

  const handleCreate = (newTalent) => {
    setData((prevData) => [...prevData, newTalent.talent]);
    setIsCreateOpen(false);
  };

  // useEffect(() => {
  //   console.log("Data updated:", data);
  // }, [data]);

  const printPDF = () => {
    const header = ["Name", "Country", "Skill Set", "Gender", "Level"];
    const title = "Talent Request";

    // Call PDFDownloader function with table data, headers, and title
    PDFDownloader({ title, myData: data, header });
  };

  return (
    <div>
      <ToastContainer />
      <h1>{`Hello ${adminData.username}`}</h1>

      <Marquee speed={60}>
        <p>
          {adminData.username} {time}
        </p>
      </Marquee>

      <div className="flex justify-between mt-12 w-[80%]">
        <Card Text={"Total Talent"} Number={data.length} />
        <Card Text={"Deleted Talent"} Number={"0"} />
        <Card Text={"Active Talent"} Number={data.length} />
        <Card Text={"Inactive Talent"} Number={"0"} />
      </div>
      <div className="flex item-end justify-end gap-4 my-16">
        <Button
          size="md"
          variant="primary"
          text={"Download CSV"}
          disabled={false}
          fullWidth={false}
        />
        <Button
          size="md"
          variant="primary"
          text={"Download PDF"}
          disabled={false}
          fullWidth={false}
          onClick={printPDF}
        />
        <Button
          size="md"
          variant="primary"
          text={"+ Create Talent"}
          disabled={false}
          fullWidth={false}
          onClick={openCreateModal}
        />
      </div>
      <div>
        <h1 className="text-center pt-5">VIEW AVAILABLE TALENTS DETAILS</h1>
        <Table data={data} setData={setData} />
      </div>
      {/* CREATE MODAL */}
      {isCreateOpen && (
        <CreateTalentModal
          isOpen={isCreateOpen}
          closeCreateModal={closeCreateModal}
          handleCreate={handleCreate}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
