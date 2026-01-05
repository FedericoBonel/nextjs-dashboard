export default function getOffsetFromPage(page: number, limit: number) {
  return (page - 1) * limit;
}
