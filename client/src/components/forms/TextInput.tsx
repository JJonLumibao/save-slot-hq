import { ErrorMessage } from "./ErrorMessage";

type TextInputProps = {
  label: string,
  type: string,
  placeholder: string,
  value: string,
  errorMessage: string,
  showError: boolean,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
}

export const TextInput = ({
  label, type, placeholder, value, errorMessage, showError, onChange
}: TextInputProps) => {
  return (
    <>
      <div className="input-wrap">
        <h2>{label}</h2>
        <input 
          className={`${showError ? "invalid-input" : ""}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      <ErrorMessage 
        message={errorMessage}
        show={showError}
      />
    </>
  );
}