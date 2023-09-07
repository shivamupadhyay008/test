"use client";

import { Dialog } from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import Button from "../common/Button";
import { axiosInstance } from "@/utils/axiosInstance";
import InputLabel from "../common/InputLabel";
import { InputComponent } from "../common/Inputcomponent";
import Modal from "../common/Dialog";

const schema = yup.object().shape({
  jobName: yup.string().required("Job Title is required"),
  companyName: yup.string().required("Company Name is required"),
  industry: yup.string().required("Industry is required"),
  location: yup.string().required("Location is required"),
  remoteType: yup.string().required("Remote Type is required"),
});
const optionalSchema = yup.object().shape({
  minExperience: yup
    .number()
    .required("Minimum Experience is required")
    .min(0, "Minimum Experience must be a positive number"),
  maxExperience: yup
    .number()
    .required("Maximum Experience is required")
    .min(0, "Maximum Experience must be a positive number")
    .moreThan(
      yup.ref("minExperience"),
      "Maximum Experience must be greater than Minimum Experience"
    ),
  minSalary: yup
    .number()
    .required("Minimum Salary is required")
    .min(0, "Minimum Salary must be a positive number"),
  maxSalary: yup
    .number()
    .required("Maximum Salary is required")
    .min(0, "Maximum Salary must be a positive number")
    .moreThan(
      yup.ref("minSalary"),
      "Maximum Salary must be greater than Minimum Salary"
    ),
  totalEmployees: yup.string().required("Total Employees is required"),
  applyType: yup.string().required("Apply Type is required"),
});

export default function JobForm({ edit, isOpen, setRefresh, onClose }) {
  const [step, setStep] = useState(0);
  const formSchema = step === 1 ? schema.concat(optionalSchema) : schema;
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: edit,
  });

  const isFirstStepValid = !(
    errors.jobName ||
    errors.companyName ||
    errors.industry ||
    errors.location ||
    errors.remoteType
  );

  const onSubmit = async (data) => {
    if (isFirstStepValid && step == 0) {
      setStep(1);
    } else {
      if (data?.id) {
        const res = await axiosInstance.put(`/jobs/${data?.id}`, data);
        alert("Job updated successfully !");
      } else {
        const res = await axiosInstance.post("jobs", data);
        alert("Job posted successfully !");
      }
      setRefresh((state) => !state);
      onClose();
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen}>
        <div className="flex justify-between">
          <span className="text-[20px]">Create a Job</span>
          <span className="font-bold ">Step {step + 1}</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
          {step === 0 && (
            <div>
              <div className="mt-[24px] ">
                <InputLabel text={"Job title"} />

                <div className="space-y-2 mt-1">
                  <InputComponent
                    control={control}
                    placeholder="Job title"
                    error={errors.jobName?.message}
                    type="text"
                    name="jobName"
                  />
                </div>
              </div>
              <div className="mt-[24px] ">
                <InputLabel text={"Company Name"} />
                <div className="space-y-2 mt-1">
                  <InputComponent
                    control={control}
                    placeholder="ex. Google"
                    error={errors.companyName?.message}
                    type="text"
                    name="companyName"
                  />
                </div>
              </div>
              <div className="mt-[24px] ">
                <InputLabel text={"Industry"} />
                <div className="space-y-2 mt-1">
                  <InputComponent
                    control={control}
                    placeholder="Industry"
                    error={errors.industry?.message}
                    type="text"
                    name="industry"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-[24px] w-[50%]">
                  <InputLabel text={"Location"} />
                  <div className="space-y-2 mt-1">
                    <InputComponent
                      control={control}
                      placeholder="Location"
                      error={errors.location?.message}
                      type="text"
                      name="location"
                    />
                  </div>
                </div>
                <div className="mt-[24px] w-[50%]">
                  <InputLabel text={"Remote type"} />
                  <div className="space-y-2 mt-1">
                    <InputComponent
                      control={control}
                      placeholder="ex. In-office"
                      error={errors.remoteType?.message}
                      type="text"
                      name="remoteType"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="mb-4">
                <div className="mt-[24px] ">
                  <InputLabel text={"Experience"} />
                  <div className="flex gap-3 ">
                    <div className="space-y-2 mt-1 w-[50%]">
                      <InputComponent
                        control={control}
                        placeholder="Minimum"
                        defaultValue={0}
                        error={errors.minExperience?.message}
                        type="number"
                        name="minExperience"
                      />
                    </div>{" "}
                    <div className="space-y-2 mt-1 w-[50%]">
                      <InputComponent
                        control={control}
                        placeholder="Maximum"
                        defaultValue={1}
                        error={errors.maxExperience?.message}
                        type="number"
                        name="maxExperience"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="mt-[24px] ">
                  <InputLabel text={"Salary"} />
                  <div className="flex gap-3">
                    <div className="space-y-2 mt-1 w-[50%]">
                      <InputComponent
                        control={control}
                        placeholder="Min salary"
                        defaultValue={0}
                        error={errors.minSalary?.message}
                        type="number"
                        name="minSalary"
                      />
                    </div>{" "}
                    <div className="space-y-2 mt-1 w-[50%]">
                      <InputComponent
                        control={control}
                        placeholder="Max salary"
                        defaultValue={1}
                        error={errors.maxSalary?.message}
                        type="number"
                        name="maxSalary"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[24px] ">
                <InputLabel text={"Total employee"} />
                <div className="space-y-2 mt-1 ">
                  <InputComponent
                    control={control}
                    placeholder="ex. 100-200"
                    error={errors.totalEmployees?.message}
                    type="text"
                    name="totalEmployees"
                  />
                </div>
              </div>
              <div className="mt-[24px] ">
                <InputLabel text={"Apply type"} />
                <div className="flex space-x-4 mb-1 mt-1">
                  <label className="flex items-center">
                    <input
                      {...register("applyType")}
                      type="radio"
                      value="quick-apply"
                      className="form-radio text-blue-500 h-5 w-5"
                    />
                    <span className="ml-2">Quick apply</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      {...register("applyType")}
                      type="radio"
                      value="external-apply"
                      className="form-radio text-blue-500 h-5 w-5"
                    />
                    <span className="ml-2">External apply</span>
                  </label>
                  <div></div>
                </div>
                <p className="text-red-500">{errors.applyType?.message}</p>
              </div>
            </div>
          )}

          <div className="text-right mt-[96px]">
            <span className="mr-4">
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                variant="ut"
                text="cancel"
              />
            </span>
            <Button text={step == 1 ? "Save" : "Next"} type={"submit"} />
          </div>
        </form>
      </Modal>
    </div>
  );
}
