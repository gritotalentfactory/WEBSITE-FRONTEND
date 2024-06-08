"use client";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { getCurrentDate } from "@/utils/dateFormat";
import Card from "@/components/card";
import Button from "@/components/ui/button";
import { PDFDownloader } from "@/components/pdfDownloader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ClientTable } from "@/components/table/clientTable";

// Helper function for decoding JWT
function base64Decode(str) {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

function parseJWT(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = base64Decode(base64);
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid JWT Token:", error);
    return null;
  }
}

const ClientDashBoard = () => {
  const [talentDetails, setTalentDetails] = useState([]);
  const [formSubmittedCount, setFormSubmittedCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Decode JWT from cookies
  const token = Cookies.get("adminData");
  let adminData = {};

  if (token) {
    try {
      adminData = parseJWT(token);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  useEffect(() => {
    const fetchTalentDetails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/talent-request`, {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setTalentDetails(response.data);
      } catch (error) {
        toast.error("Failed to fetch talent requests.");
      }
    };

    fetchTalentDetails();
  }, []);

  useEffect(() => {
    const formSubmitted = Cookies.get("formSubmitted");

    if (formSubmitted === "true") {
      setFormSubmittedCount((prevCount) => prevCount + 1);
      alert("A new talent request has been received!");
      setTimeout(() => {
        Cookies.remove("formSubmitted");
      }, 1000);
    }
  }, []);

  const openModal = () => {
    setIsCreateOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateOpen(false);
  };

  const printPDF = () => {
    const header = ["Name", "Country", "Skill Set", "Gender", "Level"];
    const title = "Talent Request";

    // Call PDFDownloader function with table data, headers, and title
    PDFDownloader({ title, myData: talentDetails, header });
  };

  return (
    <div className="z-[-12px] w-[97%] mr-7">
      <ToastContainer />
      <h1>{`Hello ${adminData.username}`}</h1>

      <Marquee speed={60}>
        <p>
          {adminData.username} {getCurrentDate()}
        </p>
      </Marquee>

      <div className="flex justify-between mt-12 w-[90%]">
        <Card Text={"Total Talent Requests"} Number={talentDetails.length} />
        <Card Text={"Deleted Talent Requests"} Number={deletedCount} />
        <Card Text={"Form Submitted"} Number={formSubmittedCount} />
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
          onClick={openModal}
        />
      </div>
      <div>
        <h1 className="text-center pt-5">VIEW REQUESTED TALENTS DETAILS</h1>
        <ClientTable data={talentDetails} />
      </div>
      {isCreateOpen && <AdminFormModal closeModal={closeCreateModal} />}
    </div>
  );
};

export default ClientDashBoard;
