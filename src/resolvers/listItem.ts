export const __resolveType = ({ object }: { object: string }) => {
  if (object === `card`) return `Card`
  if (object === `set`) return `Set`
}
