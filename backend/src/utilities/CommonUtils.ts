export function isValidId(id: any) {
  return id && Number.isInteger(Number(id)) && Number(id) > 0;
}
