import { useMemo, useState } from "react"
import { chunkArray } from "../utils/paginate"

export default function TopicPager({
  title,
  items = [],
  pageSize = 8,
  renderItem,
}) {
  const pages = useMemo(() => chunkArray(items, pageSize), [items, pageSize])
  const [page, setPage] = useState(0)

  const totalPages = pages.length
  const currentItems = pages[page] || []

  const goPrev = () => {
    setPage((p) => Math.max(p - 1, 0))
  }

  const goNext = () => {
    setPage((p) => Math.min(p + 1, totalPages - 1))
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h2>{title}</h2>

      <div
        style={{
          marginBottom: 12,
          padding: 10,
          border: "1px solid #ddd",
          borderRadius: 10,
          background: "#fafafa",
        }}
      >
        <div style={{ marginBottom: 8 }}>
          Trang {totalPages === 0 ? 0 : page + 1}/{totalPages}
        </div>

        <div
          style={{
            width: "100%",
            height: 10,
            background: "#e5e7eb",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width:
                totalPages === 0 ? "0%" : `${((page + 1) / totalPages) * 100}%`,
              height: "100%",
              background: "#2563eb",
            }}
          />
        </div>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {currentItems.map((item, index) => (
          <div
            key={item.id ?? `${page}-${index}`}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 12,
              background: "#fff",
            }}
          >
            {renderItem ? renderItem(item, index) : <pre>{JSON.stringify(item, null, 2)}</pre>}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          marginTop: 16,
          flexWrap: "wrap",
        }}
      >
        <button onClick={goPrev} disabled={page === 0}>
          Trước
        </button>
        <button onClick={goNext} disabled={page >= totalPages - 1}>
          Tiếp
        </button>
      </div>
    </div>
  )
}