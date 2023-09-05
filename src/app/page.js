"use client";
import { useState } from "react";
import Button from "../components/common/Button";
import JobForm from "../components/forms/jobForm";
import JobListing from "../components/layouts/joblisting";

export default function Home() {
  const [open, setOpen] = useState(false);
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
  return (
    <main className="">
      <div className="flex mt-3 px-8 justify-end">
        <Button text={"Post job"} onClick={() => setOpen(true)} />
      </div>
      <JobListing refresh={refresh} handleEdit={handleEdit} />
      {open && <JobForm setRefresh={setRefresh} edit={edit} isOpen={open} onClose={handleClose} />}
    </main>
  );
}
