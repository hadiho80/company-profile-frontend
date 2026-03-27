function SkeletonRow() {
  return (
    <tr className="border-t border-gray-800 animate-pulse">
      <td className="px-4 py-3">
        <div className="h-4 bg-gray-700 rounded w-6"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-4 bg-gray-700 rounded w-28"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-4 bg-gray-700 rounded w-36"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-4 bg-gray-700 rounded w-24"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-4 bg-gray-700 rounded w-48"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-4 bg-gray-700 rounded w-28"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-6 bg-gray-700 rounded w-16"></div>
      </td>
    </tr>
  );
}

function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-800 mb-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-dark-300">
            {["No", "Nama", "Email", "Telepon", "Pesan", "Tanggal", "Aksi"].map(
              (h) => (
                <th
                  key={h}
                  className="px-4 py-4 text-left text-primary font-bold whitespace-nowrap"
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableSkeleton;
