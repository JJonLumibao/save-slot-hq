export const ErrorMessage = ({
  message,
  show,
}: {
  message: string;
  show: boolean;
}) => {
  return show ? <div className="invalid-message">{message}</div> : <div></div>
}