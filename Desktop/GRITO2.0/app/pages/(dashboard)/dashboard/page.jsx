"use client";
// import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { getCurrentDate } from "@/utils/dateFormat";
import Card from "@/components/card";
import { Table } from "@/components/table";
import Button from "@/components/ui/button";
import CreateTalentModal from "@/components/modal/CreateTalentModal";

const Page = () => {
  // const userData = JSON.parse(Cookies.get("userData"));
  const time = getCurrentDate();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/talents");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  useEffect(() => {
    console.log("Data updated:", data);
  }, [data]);

  return (
    <div>
      {/* <h1>{`Hello ${userData.name}`}</h1> */}
      <h1>{`Hello Buzz brain`}</h1>

      <Marquee speed={60}>
        <p>
          {/* {userData.name} {time} */}
          {"Buzz brain"} {time}
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

export default Page;
