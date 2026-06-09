export const ErrorMessage = ({
  message,
  show,
}: {
  message: string;
  show: boolean;
}) => {
  return <div className={`invalid-message ${show ? "visible" : ""}`}>{message}</div>
}