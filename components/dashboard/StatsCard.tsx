"use client";

import { DashboardStats } from "@/utils/interfaces";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from "recharts";

const StatsCards: React.FC<{ stats: DashboardStats[] }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        let strokeColor: string;
        let startColor: string;
        let endColor: string;

        if (stat.trend === "up") {
          strokeColor = "#10B981";
          startColor = "#10B981";
          endColor = "#059669";
        } else if (stat.trend === "down") {
          strokeColor = "#EF4444";
          startColor = "#EF4444";
          endColor = "#DC2626";
        } else {
          strokeColor = "#FF4081";
          startColor = "#FF4081";
          endColor = "#D2145A";
        }

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D2145A]/5 to-[#FF4081]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {stat.icon}
                </div>
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                    stat.trend === "up"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : stat.trend === "down"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  <span>
                    {stat.trend === "up"
                      ? "↗️"
                      : stat.trend === "down"
                        ? "↘️"
                        : "→"}
                  </span>
                  <span>{Math.abs(stat.change)}%</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {stat.label}
              </p>
              <div className="mt-4 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={stat.trendData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id={`gradient-${index}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={startColor}
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor={endColor}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" hide={true} />
                    <YAxis hide={true} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={strokeColor}
                      strokeWidth={2}
                      fillOpacity={1}
                      fill={`url(#gradient-${index})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;
