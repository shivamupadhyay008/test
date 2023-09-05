"use client";
import { useEffect, useState } from "react";
import Card from "../cards/Jobcard";
import { axiosInstance } from "@/utils/axiosInstance";

export default function JobListing({ handleEdit,refresh }) {
  const [jobs, setJobs] = useState([]);
  const getData = async () => {
    const jobsRes = await axiosInstance.get('jobs');
    setJobs(jobsRes?.data);
  };
  useEffect(() => {
    getData();
  }, [refresh]);
  return (
    <div className="flex flex-wrap gap-3 p-8 justify-between">
    {jobs?.map(item=>(
      <div key={item.id} className="w-[48%]">
        <Card handleEdit={handleEdit}  className="flex-1" data={item} />
      </div>))}   
    </div>
  );
}
