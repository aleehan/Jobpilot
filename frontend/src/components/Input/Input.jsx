import "./Input.css";

function Input({
  label = "",
  name = "",
  type = "text",
  value = "",
  onChange = () => {},
  placeholder = "",
  error = "",
  options = [],
  required = false,
}) {
  const id = "input-" + name;
  const fieldClass = error ? "input__field input__field--error" : "input__field";

  let field;
  if (type === "textarea") {
    field = (
      <textarea
        id={id}
        name={name}
        className={fieldClass + " input__field--textarea"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    );
  } else if (type === "select") {
    field = (
      <select
        id={id}
        name={name}
        className={fieldClass}
        value={value}
        onChange={onChange}
        required={required}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else {
    field = (
      <input
        id={id}
        name={name}
        type={type}
        className={fieldClass}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    );
  }

  return (
    <div className="input">
      {label && (
        <label htmlFor={id} className="input__label">
          {label}
        </label>
      )}
      {field}
      {error && <p className="input__error">{error}</p>}
    </div>
  );
}

export default Input;
