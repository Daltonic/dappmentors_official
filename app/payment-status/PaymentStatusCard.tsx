import { FaCheckCircle, FaTimesCircle, FaRedo } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface PaymentStatusCardProps {
  status: "success" | "failure";
  transactionId?: string;
  amount?: string;
  service?: string;
}

const PaymentStatusCard = ({
  status,
  transactionId,
  amount,
  service,
}: PaymentStatusCardProps) => {
  const isSuccess = status === "success";
  const router = useRouter();

  const handleRetryPayment = () => {
    // You can implement retry logic here
    window.history.back();
  };

  // Generate gradient based on status
  const statusGradient = isSuccess
    ? "from-emerald-500 to-green-600"
    : "from-red-500 to-rose-600";

  const backgroundGradient = isSuccess
    ? "from-emerald-500/20 to-green-600/20"
    : "from-red-500/20 to-rose-600/20";

  return (
    <div className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent w-full max-w-[420px] mx-auto">
      {/* Background gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${backgroundGradient} opacity-30 group-hover:opacity-40 transition-opacity duration-500`}
      />

      <div className="relative z-10 p-6">
        {/* Header with Icon and Status inline */}
        <div className="flex items-center justify-center mb-4">
          <div
            className={`w-16 h-16 bg-gradient-to-br ${statusGradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 mr-4`}
          >
            {isSuccess ? (
              <FaCheckCircle className="w-8 h-8 text-white" />
            ) : (
              <FaTimesCircle className="w-8 h-8 text-white" />
            )}
          </div>

          <div className="text-left">
            <h1
              className={`text-2xl font-bold bg-gradient-to-r ${statusGradient} bg-clip-text text-transparent leading-tight`}
            >
              {isSuccess ? "Payment Successful!" : "Payment Failed"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              {isSuccess ? "Transaction completed" : "Please try again"}
            </p>
          </div>
        </div>

        {/* Transaction Details - Compact Version */}
        {(transactionId || amount || service) && (
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 mb-4 border border-gray-200/50 dark:border-gray-700/50">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {service && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block">
                    Service
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {service}
                  </span>
                </div>
              )}
              {amount && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block">
                    Amount
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white text-lg">
                    {parseFloat(amount).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
              )}
              {transactionId && (
                <div className="col-span-2">
                  <span className="text-gray-500 dark:text-gray-400 block">
                    Transaction ID
                  </span>
                  <span className="font-mono text-xs text-gray-900 dark:text-white">
                    {transactionId}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mb-4">
          {!isSuccess ? (
            <button
              onClick={handleRetryPayment}
              className="w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center"
            >
              <FaRedo className="mr-2" />
              Try Again
            </button>
          ) : (
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Continue to Dashboard
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {isSuccess
            ? "Questions? Contact our support team."
            : "Need help? Contact support with transaction details."}
        </p>
      </div>
    </div>
  );
};

export default PaymentStatusCard;
