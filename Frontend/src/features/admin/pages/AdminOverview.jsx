
import { motion } from "framer-motion";
import { FaUsers, FaDollarSign, FaChartLine } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "../../../sharedComponents/Card.component";

const data = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 800 },
  { name: "Mar", users: 600 },
  { name: "Apr", users: 1200 },
];

export default function AdminOverview() {
  const stats = [
    { title: "Total Users", value: "12,450", icon: <FaUsers />, color: "from-blue-500 to-blue-700" },
    { title: "Revenue", value: "$45,900", icon: <FaDollarSign />, color: "from-green-500 to-green-700" },
    { title: "Reports", value: "230", icon: <FaChartLine />, color: "from-purple-500 to-purple-700" },
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
          <h3 className="text-xl font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
