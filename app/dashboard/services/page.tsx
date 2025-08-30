"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Service } from "@/utils/interfaces";
import Controls from "@/components/dashboard/services/Controls";
import ServiceCard from "@/components/dashboard/services/ServiceCard";
import ServiceTable from "@/components/dashboard/services/ServiceTable";
import EmptyState from "@/components/dashboard/EmptyState";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
  FaBriefcase,
  FaTools,
  FaCheckCircle,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";

// Mock data
const mockServices: Service[] = [
  {
    id: "1",
    title: "Smart Contract Development",
    description:
      "Custom smart contract development using Solidity, Rust, and Vyper for multiple blockchains",
    type: "Development",
    category: "Blockchain Development",
    price: "Custom Quote",
    status: "active",
    duration: "4-8 weeks",
    clients: 45,
    rating: 4.9,
    totalReviews: 23,
    lead: "Darlington Gospel",
    createdAt: "2024-01-15",
    updatedAt: "2024-08-20",
    featured: true,
    thumbnail:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=240&fit=crop",
    tags: ["Solidity", "Rust", "Security", "Multi-chain"],
    deliverables: [
      "Smart Contracts",
      "Documentation",
      "Testing Suite",
      "Deployment",
    ],
  },
  {
    id: "2",
    title: "One-on-One Mentorship",
    description:
      "Personal blockchain development mentorship with industry experts",
    type: "Mentorship",
    category: "Personal Development",
    price: 150,
    status: "active",
    duration: "1 hour sessions",
    clients: 120,
    rating: 4.8,
    totalReviews: 67,
    lead: "Darlington Gospel",
    createdAt: "2024-02-01",
    updatedAt: "2024-08-18",
    featured: true,
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=240&fit=crop",
    tags: ["1-on-1", "Career Guidance", "Code Review", "Project Support"],
    deliverables: [
      "Session Recording",
      "Action Plan",
      "Resources",
      "Follow-up",
    ],
  },
  {
    id: "3",
    title: "Dapp Mentors Academy",
    description:
      "Premium membership platform with exclusive courses and content",
    type: "Education",
    category: "Online Learning",
    price: 99,
    status: "active",
    duration: "Monthly subscription",
    clients: 850,
    rating: 4.7,
    totalReviews: 156,
    lead: "Team",
    createdAt: "2024-01-01",
    updatedAt: "2024-08-15",
    featured: true,
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=240&fit=crop",
    tags: ["Premium Content", "Video Tutorials", "Books", "Community"],
    deliverables: [
      "Course Access",
      "eBooks",
      "Video Content",
      "Community Access",
    ],
  },
  {
    id: "4",
    title: "Full-Stack dApp Development",
    description:
      "End-to-end decentralized application development with modern frameworks",
    type: "Development",
    category: "Web Development",
    price: "Custom Quote",
    status: "active",
    duration: "8-16 weeks",
    clients: 28,
    rating: 4.9,
    totalReviews: 15,
    lead: "Development Team",
    createdAt: "2024-03-10",
    updatedAt: "2024-08-12",
    featured: false,
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop",
    tags: ["React", "Next.js", "Web3", "Full-stack"],
    deliverables: [
      "Frontend App",
      "Smart Contracts",
      "Documentation",
      "Deployment",
    ],
  },
  {
    id: "5",
    title: "Technical Writing & Documentation",
    description:
      "Professional technical content creation for Web3 projects and companies",
    type: "Writing",
    category: "Content Creation",
    price: 250,
    status: "active",
    duration: "1-4 weeks",
    clients: 67,
    rating: 4.6,
    totalReviews: 34,
    lead: "Content Team",
    createdAt: "2024-04-05",
    updatedAt: "2024-08-08",
    featured: false,
    thumbnail:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=240&fit=crop",
    tags: ["Technical Writing", "Documentation", "Whitepapers", "Blogs"],
    deliverables: [
      "Written Content",
      "Documentation",
      "SEO Optimization",
      "Revisions",
    ],
  },
  {
    id: "6",
    title: "Developer Hiring & Recruitment",
    description:
      "Connect with skilled Web3 developers from our community network",
    type: "Hiring",
    category: "Recruitment",
    price: "Custom Quote",
    status: "active",
    duration: "2-6 weeks",
    clients: 35,
    rating: 4.5,
    totalReviews: 18,
    lead: "HR Team",
    createdAt: "2024-05-15",
    updatedAt: "2024-07-30",
    featured: false,
    thumbnail:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=240&fit=crop",
    tags: ["Recruitment", "Web3 Talent", "Screening", "Placement"],
    deliverables: [
      "Candidate Pool",
      "Interview Process",
      "Background Check",
      "Placement",
    ],
  },
  {
    id: "7",
    title: "Live Workshops & Hackathons",
    description:
      "Interactive virtual workshops and hackathon events for Web3 learning",
    type: "Education",
    category: "Events",
    price: 50,
    status: "coming-soon",
    duration: "1-3 days",
    clients: 0,
    rating: 0,
    totalReviews: 0,
    lead: "Events Team",
    createdAt: "2024-06-20",
    updatedAt: "2024-08-01",
    featured: false,
    thumbnail:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=240&fit=crop",
    tags: ["Workshops", "Hackathons", "Virtual Events", "Collaboration"],
    deliverables: ["Workshop Access", "Materials", "Certificate", "Networking"],
  },
  {
    id: "8",
    title: "Discord Community Access",
    description:
      "Join our exclusive Discord community with 5,000+ Web3 developers",
    type: "Community",
    category: "Networking",
    price: 0,
    status: "active",
    duration: "Ongoing",
    clients: 5200,
    rating: 4.4,
    totalReviews: 89,
    lead: "Community Team",
    createdAt: "2024-01-01",
    updatedAt: "2024-08-25",
    featured: false,
    thumbnail:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=240&fit=crop",
    tags: ["Discord", "Community", "Networking", "Support"],
    deliverables: [
      "Discord Access",
      "Community Events",
      "Q&A Sessions",
      "Networking",
    ],
  },
];

// StatsCards Component
const StatsCards: React.FC<{ services: Service[] }> = ({ services }) => {
  const stats = [
    {
      label: "Total Services",
      value: services.length,
      color: "from-blue-500 to-blue-600",
      icon: <FaTools className="text-white text-2xl" />,
    },
    {
      label: "Active",
      value: services.filter((s) => s.status === "active").length,
      color: "from-green-500 to-green-600",
      icon: <FaCheckCircle className="text-white text-2xl" />,
    },
    {
      label: "Total Clients",
      value: services.reduce((acc, s) => acc + s.clients, 0),
      color: "from-purple-500 to-purple-600",
      icon: <FaUsers className="text-white text-2xl" />,
    },
    {
      label: "Revenue",
      value: "$125,450",
      color: "from-orange-500 to-orange-600",
      icon: <FaDollarSign className="text-white text-2xl" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}
            >
              {stat.icon}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {typeof stat.value === "number"
                  ? stat.value.toLocaleString()
                  : stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Main ServicesManagement Component
const Page: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"all" | Service["type"]>(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<"all" | Service["status"]>(
    "all",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    new Set(),
  );
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Service;
    direction: "asc" | "desc";
  } | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

  // Filter services
  const filteredServices = useMemo(() => {
    return mockServices.filter((service) => {
      const matchesType = selectedTab === "all" || service.type === selectedTab;
      const matchesStatus =
        statusFilter === "all" || service.status === statusFilter;
      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.lead.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      return matchesType && matchesStatus && matchesSearch;
    });
  }, [selectedTab, statusFilter, searchTerm]);

  // Sort services
  const sortedServices = useMemo(() => {
    if (!sortConfig) return filteredServices;

    return [...filteredServices].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return sortConfig.direction === "asc" ? comparison : -comparison;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        const comparison = aValue - bValue;
        return sortConfig.direction === "asc" ? comparison : -comparison;
      }

      return 0;
    });
  }, [filteredServices, sortConfig]);

  const handleSort = (key: keyof Service) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig?.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const toggleServiceSelection = (serviceId: string) => {
    setSelectedServices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  };

  const toggleAllServices = () => {
    if (selectedServices.size === sortedServices.length) {
      setSelectedServices(new Set());
    } else {
      setSelectedServices(new Set(sortedServices.map((service) => service.id)));
    }
  };

  const getTypeColor = (type: Service["type"]) => {
    switch (type) {
      case "Education":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Mentorship":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "Development":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Writing":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "Hiring":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "Community":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: Service["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
      case "coming-soon":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          title="Services Management"
          subtitle="Manage your educational, mentorship, development, and community services"
          buttonText="Create Service"
          location="/dashboard/services/new"
          buttonIcon={<FaBriefcase size={18} />}
        />
        <StatsCards services={mockServices} />
        <Controls
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedServices={selectedServices}
        />
        {viewMode === "grid" ? (
          <div>
            {sortedServices.length === 0 ? (
              <EmptyState
                searchTerm={searchTerm}
                title="No services found"
                subtitle={(term) =>
                  term
                    ? `No services match "${term}". Try adjusting your search or filters.`
                    : "You have no services yet. Start by creating a new service."
                }
                location="/dashboard/services/new"
                buttonText="Create Service"
                icon={<FaBriefcase className="w-8 h-8 text-gray-400" />}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedServices.map((service, index) => (
                  <ServiceCard
                    key={index}
                    service={service}
                    selectedServices={selectedServices}
                    toggleServiceSelection={toggleServiceSelection}
                    getTypeColor={getTypeColor}
                    getStatusColor={getStatusColor}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <ServiceTable
            sortedServices={sortedServices}
            selectedServices={selectedServices}
            toggleServiceSelection={toggleServiceSelection}
            toggleAllServices={toggleAllServices}
            handleSort={handleSort}
            sortConfig={sortConfig}
            getTypeColor={getTypeColor}
            getStatusColor={getStatusColor}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
