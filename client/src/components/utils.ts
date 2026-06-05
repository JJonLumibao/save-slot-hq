export const capitalize = (val: string) => {
  return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
};

export function isEmailValid(emailAddress: string) {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}