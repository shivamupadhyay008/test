"use client";
import { useState } from "react";
import Button from "../components/common/Button";
import JobForm from "../components/forms/jobForm";
import JobListing from "../components/layouts/joblisting";
import { axiosInstance } from "@/utils/axiosInstance";

export default function Home() {
  const [open, setOpen] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [edit, setEdit] = useState({});
  const handleEdit = (data) => {
    setEdit(data);
    setOpen(true);
  };
  const handleClose = () => {
    setEdit(null);
    setOpen(false);
  };
  const handleDelete = async (data) => {
    const res = await axiosInstance.delete(`jobs/${data.id}`);
    alert("Job deleted successfully !");
    setRefresh((state) => !state);
  };
  return (
    <main className="">
      <div className="flex mt-3 px-8 justify-end">
        <Button text={"Post job"} onClick={() => setOpen(true)} />
      </div>
      <JobListing
        handleDelete={handleDelete}
        refresh={refresh}
        handleEdit={handleEdit}
      />
      {open && (
        <JobForm
          setRefresh={setRefresh}
          edit={edit}
          isOpen={open}
          onClose={handleClose}
        />
      )}
    </main>
  );
}
