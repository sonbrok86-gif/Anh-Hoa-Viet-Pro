export function chunkArray(items, pageSize = 8) {
  if (!Array.isArray(items)) return []
  const result = []

  for (let i = 0; i < items.length; i += pageSize) {
    result.push(items.slice(i, i + pageSize))
  }

  return result
}