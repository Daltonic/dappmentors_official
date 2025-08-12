import StatsCards from "./components/dashboardhome/StatsCards";
import RecentDonations from "./components/dashboardhome/RecentDonations";
import RecentProjects from "./components/dashboardhome/RecentProjects";

export default function DashboardPage() {
  return (
    <div>
      <div className="space-y-6 p-6">
        {/* Dashboard Stats Cards */}
        <StatsCards />
        {/* Recent Projects & Donations */}{" "}
        <div className="grid grid-cols-1 gap-6">
          <RecentProjects />
          <RecentDonations />{" "}
        </div>
      </div>
    </div>
  );
}
