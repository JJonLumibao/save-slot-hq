import { ErrorMessage } from "./ErrorMessage";

type TextInputProps = {
  label: string,
  type: string,
  placeholder: string,
  value: string,
  errorMessage?: string,
  showError?: boolean,
  maxLength?: number,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
}

export const TextInput = ({
  label, type, placeholder, maxLength, value, errorMessage, showError, onChange
}: TextInputProps) => {
  return (
    <>
      <div className="input-wrap">
        <p className="input-header">{label}</p>
        {maxLength !== undefined 
          ? <div className="remaining-counter">{maxLength - value.length}</div>
          : <></>
        }
        <input 
          className={`input-wrap-input ${showError ? "invalid-input" : ""}`}
          type={type}
          maxLength={maxLength}
          spellCheck={false}
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