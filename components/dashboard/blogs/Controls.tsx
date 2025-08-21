import { BlogPost } from "@/utils/interfaces";
import { FaSearch, FaTh, FaListUl } from "react-icons/fa";

// Controls Component
const Controls: React.FC<{
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  statusFilter: "all" | BlogPost["status"];
  setStatusFilter: (filter: "all" | BlogPost["status"]) => void;
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  selectedPosts: Set<string>;
  uniqueCategories: string[];
}> = ({
  searchTerm,
  setSearchTerm,
  selectedTab,
  setSelectedTab,
  statusFilter,
  setStatusFilter,
  viewMode,
  setViewMode,
  selectedPosts,
  uniqueCategories,
}) => (
  <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 mb-8 shadow-lg">
    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-md w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {/* Category Filter */}
        <div className="flex gap-2">
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedTab(cat)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 capitalize text-sm ${
                selectedTab === cat
                  ? "bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#D2145A]/10 hover:to-[#FF4081]/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | BlogPost["status"])
          }
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-sm"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>

        {/* View Mode Toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-white dark:bg-gray-700 shadow-sm"
                : "hover:bg-white/50 dark:hover:bg-gray-700/50"
            }`}
          >
            <FaTh className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === "table"
                ? "bg-white dark:bg-gray-700 shadow-sm"
                : "hover:bg-white/50 dark:hover:bg-gray-700/50"
            }`}
          >
            <FaListUl className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedPosts.size > 0 && (
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
            Publish Selected ({selectedPosts.size})
          </button>
          <button className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-xl text-sm font-medium hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors">
            Archive Selected
          </button>
          <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
            Delete Selected
          </button>
        </div>
      )}
    </div>
  </div>
);

export default Controls;
