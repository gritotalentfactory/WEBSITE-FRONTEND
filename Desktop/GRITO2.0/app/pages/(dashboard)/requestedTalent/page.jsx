"use client";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { getCurrentDate } from "@/utils/dateFormat";
import Card from "@/components/card";
import Button from "@/components/ui/button";
import AdminFormModal from "@/components/modal/adminModal";
import { PDFDownloader } from "@/components/pdfDownloader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ClientTable } from "@/components/table/clientTable";

const ClientDashBoard = () => {
  const [talentDetails, setTalentDetails] = useState([]);
  const userDataCookie = Cookies.get("userData");
  const [formSubmittedCount, setFormSubmittedCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    const fetchTalentDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/talent-request");
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
      <h1>{`Hello ${userData?.name}`}</h1>

      <Marquee speed={60}>
        <p>{userData?.name}</p>
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
