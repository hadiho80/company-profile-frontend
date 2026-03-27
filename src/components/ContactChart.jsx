import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ContactChart({ contacts }) {
  // Hitung pesan per bulan
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const dataPerBulan = monthNames.map((bulan, i) => {
    const count = contacts.filter((c) => {
      const date = new Date(c.created_at);
      return (
        date.getMonth() === i && date.getFullYear() === new Date().getFullYear()
      );
    }).length;
    return { bulan, pesan: count };
  });

  // Filter hanya bulan yang ada datanya atau 6 bulan terakhir
  const currentMonth = new Date().getMonth();
  const last6Months = dataPerBulan.slice(
    Math.max(0, currentMonth - 5),
    currentMonth + 1,
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-100 border border-gray-700 rounded-lg px-4 py-2 text-sm">
          <p className="text-gray-400">{label}</p>
          <p className="text-primary font-bold">{payload[0].value} pesan</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-dark-100 rounded-xl p-6 border border-gray-800 mb-6">
      <h3 className="text-white font-bold text-lg mb-6">
        📊 Pesan Masuk 6 Bulan Terakhir
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={last6Months}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
          <XAxis
            dataKey="bulan"
            tick={{ fill: "#a8a8b3", fontSize: 13 }}
            axisLine={{ stroke: "#2a2a4a" }}
          />
          <YAxis
            tick={{ fill: "#a8a8b3", fontSize: 13 }}
            axisLine={{ stroke: "#2a2a4a" }}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="pesan"
            fill="#e94560"
            radius={[6, 6, 0, 0]}
            maxBarSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ContactChart;
