export default function InputLabel({ text, isRequired = true }) {
  return (
    <span className="text-[14px] font-bold mb-2 flex">
      {text}
      {isRequired && <p className="text-red-500 ml-1">*</p>}
    </span>
  );
}
