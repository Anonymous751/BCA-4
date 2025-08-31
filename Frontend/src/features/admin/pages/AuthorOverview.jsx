import { Card, CardContent } from "../../../sharedComponents/Card.component";
import { motion } from "framer-motion";
import { FaBlog, FaEye, FaHeart } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", views: 400 },
  { name: "Tue", views: 300 },
  { name: "Wed", views: 500 },
  { name: "Thu", views: 800 },
  { name: "Fri", views: 650 },
];

export default function AuthorOverview() {
  const stats = [
    { title: "Blogs", value: "58", icon: <FaBlog />, color: "from-purple-500 to-purple-700" },
    { title: "Views", value: "12.4K", icon: <FaEye />, color: "from-indigo-500 to-indigo-700" },
    { title: "Likes", value: "8.1K", icon: <FaHeart />, color: "from-pink-500 to-pink-700" },
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
          <h3 className="text-xl font-semibold mb-4">Views This Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={3} dot />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
