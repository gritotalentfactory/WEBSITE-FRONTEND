"use client";
import Cookies from "js-cookie";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { getCurrentDate } from "@/utils/dateFormat";
import Card from "@/components/card";
import { Table } from "@/components/table";
import FormModal from "@/components/modal/formModal";
import Button from "@/components/ui/button";

const page = () => {
  const userData = JSON.parse(Cookies.get("userData"));
  const time = getCurrentDate();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const openCreateModal = () => {
    setIsCreateOpen(true);
  };
  const closeCreateModal = () => {
    setIsCreateOpen(false);
  };
  return (
    <div>
      <h1>{`Hello ${userData.name}`}</h1>

      <Marquee speed={60}>
        <p>
          {userData.name} {time}
        </p>
      </Marquee>

      <div className="flex justify-between mt-12 w-[80%]">
        <Card Text={"Total Talent"} Number={"20"} />
        <Card Text={"Deleted Talent"} Number={"20"} />
        <Card Text={"Active Talent"} Number={"20"} />
        <Card Text={"Inactive Talent"} Number={"20"} />
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
        <Table />
      </div>
      {/* CREATE MODAL */}
      {isCreateOpen && <FormModal closeModal={closeCreateModal} />}
    </div>
  );
};

export default page;
