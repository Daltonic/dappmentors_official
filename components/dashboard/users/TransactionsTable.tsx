"use client";

import {
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaSearch,
  FaSort,
  FaSortDown,
  FaSortUp,
  FaUserPlus,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Transaction } from "@/utils/interfaces";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import EmptyState from "@/components/dashboard/EmptyState";

// SortIcon Component
const SortIcon: React.FC<{
  column: keyof Transaction;
  sortConfig: { key: keyof Transaction; direction: "asc" | "desc" } | null;
}> = ({ column, sortConfig }) => {
  if (!sortConfig || sortConfig.key !== column) {
    return <FaSort className="w-4 h-4 opacity-30" />;
  }
  return sortConfig.direction === "asc" ? (
    <FaSortUp className="w-4 h-4 text-[#D2145A]" />
  ) : (
    <FaSortDown className="w-4 h-4 text-[#D2145A]" />
  );
};

// PaginationFooter Component (reused)
const PaginationFooter: React.FC<{
  currentPage: number;
  itemsPerPage: number;
  total: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, itemsPerPage, total, onPageChange }) => {
  const from = (currentPage - 1) * itemsPerPage + 1;
  const to = Math.min(currentPage * itemsPerPage, total);
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 dark:text-gray-300 gap-4 sm:gap-0">
        <span>
          Showing {from}-{to} of {total} transactions
        </span>
        <div className="flex items-center gap-4">
          <span>Rows per page: {itemsPerPage}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// TransactionTable Component
const TransactionTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/transactions?limit=100", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setTransactions(
          data.transactions.map((t: Transaction) => ({
            ...t,
            createdAt: new Date(t.createdAt),
            totalAmount: t.totalAmount ?? 0,
          })),
        );
      } else {
        throw new Error("Failed to fetch transactions");
      }
    } catch (error) {
      setError("Error fetching transactions. Please try again.");
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const filteredTransactions = useMemo(() => {
    if (!searchTerm) return transactions;

    const lowerSearch = searchTerm.toLowerCase();
    return transactions.filter((tx) => {
      const details =
        tx.type === "subscription"
          ? `Subscription ${tx.subscriptionId || "N/A"}`
          : tx.lineItems
              ?.map((item) => `${item.quantity}x ${item.name}`)
              .join(", ") || "N/A";
      const amountStr =
        tx.totalAmount !== undefined ? `$${tx.totalAmount}` : "N/A";

      return (
        tx.transactionId?.toLowerCase().includes(lowerSearch) ||
        tx.createdAt.toLocaleDateString().toLowerCase().includes(lowerSearch) ||
        tx.type?.toLowerCase().includes(lowerSearch) ||
        tx.email?.toLowerCase().includes(lowerSearch) ||
        details.toLowerCase().includes(lowerSearch) ||
        amountStr.toLowerCase().includes(lowerSearch) ||
        tx.status?.toLowerCase().includes(lowerSearch)
      );
    });
  }, [transactions, searchTerm]);

  const sortedTransactions = useMemo(() => {
    if (!sortConfig) return filteredTransactions;

    return [...filteredTransactions].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      let comparison = 0;

      if (aValue == null) aValue = sortConfig.key === "totalAmount" ? 0 : "";
      if (bValue == null) bValue = sortConfig.key === "totalAmount" ? 0 : "";

      if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [filteredTransactions, sortConfig]);

  const currentTransactions = useMemo(() => {
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    return sortedTransactions.slice(indexOfFirst, indexOfLast);
  }, [sortedTransactions, currentPage, itemsPerPage]);

  const handleSort = (key: keyof Transaction) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig?.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <div className="text-gray-600 dark:text-gray-300">
          Loading transactions...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-600 dark:text-red-400 text-lg">{error}</div>
      </div>
    );
  }

  if (sortedTransactions.length === 0) {
    return (
      <EmptyState
        searchTerm={searchTerm}
        title="No transactions found"
        subtitle={(term) =>
          term
            ? `No transactions match "${term}".`
            : "No transactions have taken place on the platform yet."
        }
        icon={<FaUserPlus className="w-8 h-8 text-gray-400" />}
      />
    );
  }

  return (
    <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden">
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D2145A] transition-all"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors w-[180px]"
                onClick={() => handleSort("transactionId")}
              >
                <div className="flex items-center gap-2">
                  Transaction ID
                  <SortIcon column="transactionId" sortConfig={sortConfig} />
                </div>
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors w-[120px]"
                onClick={() => handleSort("createdAt")}
              >
                <div className="flex items-center gap-2">
                  Date
                  <SortIcon column="createdAt" sortConfig={sortConfig} />
                </div>
              </th>
              <th className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 w-[100px]">
                Type
              </th>
              <th className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 w-[200px]">
                Email
              </th>
              <th className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 w-[280px]">
                Details
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors w-[120px]"
                onClick={() => handleSort("totalAmount")}
              >
                <div className="flex items-center gap-2">
                  Amount
                  <SortIcon column="totalAmount" sortConfig={sortConfig} />
                </div>
              </th>
              <th className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 w-[120px]">
                Status
              </th>
              <th className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 w-[80px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((tx, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-200/30 dark:border-gray-700/30 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-300 group h-16"
              >
                <td className="px-4 py-4 text-gray-900 dark:text-white text-sm">
                  <div className="truncate" title={tx.transactionId}>
                    {tx.transactionId}
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-900 dark:text-white text-sm">
                  <div className="whitespace-nowrap">
                    {tx.createdAt.toLocaleDateString()}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 capitalize">
                    {tx.type}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-900 dark:text-white text-sm">
                  <div className="truncate" title={tx.email}>
                    {tx.email}
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-900 dark:text-white text-sm">
                  <div
                    className="truncate"
                    title={
                      tx.type === "subscription"
                        ? `Subscription ${tx.subscriptionId || "N/A"}`
                        : tx.lineItems
                            ?.map((item) => `${item.quantity}x ${item.name}`)
                            .join(", ") || "N/A"
                    }
                  >
                    {tx.type === "subscription"
                      ? `Subscription ${tx.subscriptionId || "N/A"}`
                      : tx.lineItems
                          ?.map((item) => `${item.quantity}x ${item.name}`)
                          .join(", ") || "N/A"}
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-900 dark:text-white text-sm">
                  <div className="font-medium">
                    {tx.totalAmount !== undefined
                      ? `$${tx.totalAmount}`
                      : "N/A"}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      tx.status === "completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center">
                    <button
                      className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-300 hover:scale-110"
                      title="View details"
                    >
                      <FaEye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedTransactions.length > 0 && (
        <PaginationFooter
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          total={sortedTransactions.length}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default TransactionTable;
