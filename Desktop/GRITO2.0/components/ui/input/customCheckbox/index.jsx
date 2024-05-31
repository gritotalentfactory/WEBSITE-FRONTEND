const Checkbox = ({ label, value, name }) => {
  return (
    <div className="checkbox-wrapper">
      <label className="flex gap-2 items-center">
        <input type="checkbox" name={name} value={value} />
        <small>{label}</small>
      </label>
    </div>
  );
};
export default Checkbox;
