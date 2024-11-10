
export default function FormInput({ label, name, type, placeholder, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-lg font-bold text-black mb-2" htmlFor={name}>{label}</label>
      <input
        className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-greenLight"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}