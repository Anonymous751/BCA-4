import { Card, CardContent } from "../../../sharedComponents/Card.component";
import { motion } from "framer-motion";
import { FaBookOpen, FaBell, FaHeart } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Favorites", value: 40 },
  { name: "Subscribed", value: 30 },
  { name: "Notifications", value: 30 },
];

const COLORS = ["#10b981", "#3b82f6", "#f43f5e"];

export default function ReaderOverview() {
  const stats = [
    { title: "Favorites", value: "120", icon: <FaHeart />, color: "from-red-500 to-red-700" },
    { title: "Subscriptions", value: "35", icon: <FaBookOpen />, color: "from-green-500 to-green-700" },
    { title: "Notifications", value: "8", icon: <FaBell />, color: "from-blue-500 to-blue-700" },
  ];

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Card className={`bg-gradient-to-r ${stat.color} text-white shadow-lg rounded-2xl`}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg">{stat.title}</h3>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Your Engagement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
