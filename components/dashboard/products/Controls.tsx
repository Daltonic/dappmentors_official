import { Product } from "@/utils/interfaces";

// Controls Component
const Controls: React.FC<{
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedTab: "all" | Product["type"];
  setSelectedTab: React.Dispatch<React.SetStateAction<"all" | Product["type"]>>;
  statusFilter: "all" | Product["status"];
  setStatusFilter: React.Dispatch<
    React.SetStateAction<"all" | Product["status"]>
  >;
  viewMode: "grid" | "table";
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "table">>;
  selectedProducts: Set<string>;
}> = ({
  searchTerm,
  setSearchTerm,
  selectedTab,
  setSelectedTab,
  statusFilter,
  setStatusFilter,
  viewMode,
  setViewMode,
  selectedProducts,
}) => (
  <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 mb-8 shadow-lg">
    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-md w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {/* Type Filter */}
        <div className="flex gap-2">
          {(["all", "Course", "Bootcamp", "eBook", "Codebase"] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 capitalize text-sm ${
                  selectedTab === tab
                    ? "bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#D2145A]/10 hover:to-[#FF4081]/10"
                }`}
              >
                {tab}
              </button>
            ),
          )}
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | Product["status"])
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
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === "table"
                ? "bg-white dark:bg-gray-700 shadow-sm"
                : "hover:bg-white/50 dark:hover:bg-gray-700/50"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedProducts.size > 0 && (
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
            Publish Selected ({selectedProducts.size})
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
