"use client"
import React, { useState } from "react";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import ContractList from "./ContractList";

const contracts = [
  {
    compname: "KnowIdea pvt. Limited",
    status: "Accepted",
    created: "01-09-2021",
  },
  {
    compname: "StatusCode pvt. Limited",
    status: "Pending",
    created: " ",
  },
  {
    compname: "Humour pvt. Limited",
    status: "Accepted",
    created: "01-09-2021",
  },
  {
    compname: "Ideate pvt. Limited",
    status: "Accepted",
    created: "01-09-2021",
  },
  {
    compname: "Rebase Corporation",
    status: "Requested",
    created: " ",
  },
  {
    compname: "Hack Corporation",
    status: "Rejected",
    created: " ",
  }
];

function Contract() {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredContracts =
    selectedStatus === "All"
      ? contracts
      : contracts.filter((contract) => contract.status === selectedStatus);

  const handleBadgeClick = (status) => {
    setSelectedStatus(status);
  };

  return (
    <div className="ml-24">
      <div className="flex my-8 gap-6">
        <Badge
          className={`px-6 py-4 ${
            selectedStatus === "All" ? "bg-lime-300 text-lime-900" : ""
          }`}
          onClick={() => handleBadgeClick("All")}
        >
          All
        </Badge>
        <Badge
          variant={"outline"}
          className={`px-6 py-4 border-lime-300 text-lime-600 hover:bg-lime-300 hover:text-lime-900 ${
            selectedStatus === "Accepted" ? "bg-lime-300 text-lime-900" : ""
          }`}
          onClick={() => handleBadgeClick("Accepted")}
        >
          Accepted
        </Badge>
        <Badge
          variant={"outline"}
          className={`px-6 py-4 border-amber-300 text-amber-600 hover:bg-amber-300 hover:text-amber-900 ${
            selectedStatus === "Requested" ? "bg-amber-300 text-amber-900" : ""
          }`}
          onClick={() => handleBadgeClick("Requested")}
        >
          Requested
        </Badge>
        <Badge
          variant={"outline"}
          className={`px-6 py-4 border-red-300 text-red-600 hover:bg-red-300 hover:text-red-900 ${
            selectedStatus === "Pending" ? "bg-red-300 text-red-900" : ""
          }`}
          onClick={() => handleBadgeClick("Pending")}
        >
          Pending
        </Badge>
        <Badge
          variant={"outline"}
          className={`px-6 py-4 border-gray-300 text-gray-600 hover:bg-gray-300 hover:text-gray-900 ${
            selectedStatus === "Rejected" ? "bg-gray-300 text-gray-900" : ""
          }`}
          onClick={() => handleBadgeClick("Rejected")}
        >
          Rejected
        </Badge>
      </div>
      <div>
        {filteredContracts.map((item, index) => (
          <div key={index} className="flex justify-between items-center my-4">
            <div className="flex gap-4">
              <ContractList item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contract;
