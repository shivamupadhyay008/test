export default function Button({ text, variant = "primary", ...rest }) {
  return (
    <button
      {...rest}
      className={
        variant !== "primary"
          ? "border-solid border-2 border-[#00A1FF] rounded-md cursor-pointer text-[#00A1FF] px-[14px] font-medium py-[6px]"
          : "bg-[#00A1FF] border-2 border-[#00A1FF] rounded-md px-[14px] font-medium py-[6px] text-white cursor-pointer"
      }
    >
      {text}
    </button>
  );
}
