import Button from "../common/Button";
import Pen from "../common/Pen";
import Text from "../common/Text";

export default function JobCard({ data, handleEdit }) {
  const image =
    "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456";
  return (
    <div className="p-4 flex gap-[8px] bg-white rounded-md">
      <div>
        <img className="w-[48px] h-[48px] rounded-md" src={image} />
      </div>
      <div className="w-[100%]">
        <div className="flex justify-between center w-[100%]">
          <Text className="text-[24px]" text={data.jobName} />
          <div className="cursor-pointer" onClick={() => handleEdit(data)}>
            <Pen />
          </div>
        </div>
        <Text className="text-[16px]" text={data.companyName} />
        <Text className="text-[16px] text-[#4D4D4D] " text={data.location} />
        <Text
          className="mt-[24px]"
          text={"Full time (9.00 am - 5.00 pm IST)"}
        />
        <Text
          className="mt-[8px]"
          text={`Experience (${data.minExperience} - ${data.maxExperience} years)`}
        />
        <Text
          className="mt-[8px]"
          text={`INR (₹) ${data.minSalary} - ${data.maxSalary} / Month`}
        />
        <Text className="mt-[8px]" text={`${data.totalEmployees} employees`} />
        <div className="mt-[24px]">
          {data.applyType !== "external-apply" ? (
            <Button text="Apply Now" />
          ) : (
            <Button text=" External Apply" variant="sdfd" />
          )}
        </div>
      </div>
    </div>
  );
}
