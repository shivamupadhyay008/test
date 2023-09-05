"use client";

import { Dialog } from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import Button from "../common/Button";
import axios from "axios";
import { axiosInstance } from "@/utils/axiosInstance";

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
    watch,
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
      <Dialog
        open={isOpen}
        onClose={() => {}}
        className="relative z-50"
        borderRadius={8}
      >
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000063]  p-4">
          <Dialog.Panel className={"bg-white p-8 rounded-lg shadow-lg z-10"}>
            <div className="flex justify-between">
              <span className="text-[20px] font-black">Create a Job</span>
              <span className="font-semibold ">Step {step + 1}</span>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md mx-auto"
            >
              {step === 0 && (
                <div>
                  <div className="mt-[24px] ">
                    <span className="text-[14px] font-semibold mb-2">
                      Job title
                    </span>
                    <div className="space-y-2 mt-1">
                      <Controller
                        name="jobName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full border rounded-md p-2"
                            placeholder="Job title"
                          />
                        )}
                      />
                      <p className="text-red-500">{errors.jobName?.message}</p>
                    </div>
                  </div>
                  <div className="mt-[24px] ">
                    <span className="text-[14px] font-semibold mb-2">
                      Company Name
                    </span>
                    <div className="space-y-2 mt-1">
                      <Controller
                        name="companyName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full border rounded-md p-2"
                            placeholder="ex. Google"
                          />
                        )}
                      />
                      <p className="text-red-500">
                        {errors.companyName?.message}
                      </p>
                    </div>
                  </div>
                  <div className="mt-[24px] ">
                    <span className="text-[14px] font-semibold mb-2">
                      Industry
                    </span>
                    <div className="space-y-2 mt-1">
                      <Controller
                        name="industry"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full border rounded-md p-2"
                            placeholder="Industry"
                          />
                        )}
                      />
                      <p className="text-red-500">{errors.industry?.message}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-[24px] ">
                      <span className="text-[14px] font-semibold mb-2">
                        Location
                      </span>
                      <div className="space-y-2 mt-1">
                        <Controller
                          name="location"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className="w-full border rounded-md p-2"
                              placeholder="Location"
                            />
                          )}
                        />
                        <p className="text-red-500">
                          {errors.location?.message}
                        </p>
                      </div>
                    </div>
                    <div className="mt-[24px] ">
                      <span className="text-[14px] font-semibold mb-2">
                        Remote type
                      </span>
                      <div className="space-y-2 mt-1">
                        <Controller
                          name="remoteType"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className="w-full border rounded-md p-2"
                              placeholder="ex. In-office"
                            />
                          )}
                        />
                        <p className="text-red-500">
                          {errors.remoteType?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <div className="mb-4">
                    <div className="mt-[24px] ">
                      <span className="text-[14px] font-semibold mb-2">
                        Experience
                      </span>
                      <div className="flex gap-3">
                        <div className="space-y-2 mt-1">
                          <Controller
                            name="minExperience"
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="number"
                                className="w-full border rounded-md p-2"
                                placeholder="Minimum"
                              />
                            )}
                          />
                          <p className="text-red-500">
                            {errors.minExperience?.message}
                          </p>
                        </div>{" "}
                        <div className="space-y-2 mt-1">
                          <Controller
                            name="maxExperience"
                            control={control}
                            defaultValue={1}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="number"
                                className="w-full border rounded-md p-2"
                                placeholder="Maximum"
                              />
                            )}
                          />
                          <p className="text-red-500">
                            {errors.maxExperience?.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="mt-[24px] ">
                      <span className="text-[14px] font-semibold mb-2">
                        Salary
                      </span>
                      <div className="flex gap-3">
                        <div className="space-y-2 mt-1">
                          <Controller
                            name="minSalary"
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="number"
                                className="w-full border rounded-md p-2"
                                placeholder="Minimum"
                              />
                            )}
                          />
                          <p className="text-red-500">
                            {errors.minSalary?.message}
                          </p>
                        </div>{" "}
                        <div className="space-y-2 mt-1">
                          <Controller
                            name="maxSalary"
                            control={control}
                            defaultValue={1}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="number"
                                className="w-full border rounded-md p-2"
                                placeholder="Maximum"
                              />
                            )}
                          />
                          <p className="text-red-500">
                            {errors.maxSalary?.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[24px] ">
                    <span className="text-[14px] font-semibold mb-2">
                      Total employee
                    </span>
                    <div className="space-y-2 mt-1">
                      <Controller
                        name="totalEmployees"
                        control={control}
                        defaultValue={1}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            className="w-full border rounded-md p-2"
                            placeholder="ex. 100"
                          />
                        )}
                      />
                      <p className="text-red-500">
                        {errors.totalEmployees?.message}
                      </p>
                    </div>
                  </div>
                  <div className="mt-[24px] ">
                    <span className="text-[14px] font-semibold mb-2">
                      Apply type
                    </span>
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
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
