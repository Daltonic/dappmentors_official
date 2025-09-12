const DevelopmentMode = () => {
  return (
    <>
      <div
        className="w-full bg-[#D2145A] dark:bg-[#D2145A] text-white text-center py-1 px-4
        shadow-md fixed top-[80px] lg:top-[90px] left-0 right-0 z-50 opacity-100"
      >
        <p className="text-sm md:text-base font-medium">
          🚧 Site Under Maintenance - Stay tuned for updates! 🚧
        </p>
      </div>
      <div className="h-10"></div> {/* Spacer to prevent content overlap */}
    </>
  );
};

export default DevelopmentMode;
