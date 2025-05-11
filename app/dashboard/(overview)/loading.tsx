import DashboardSkeleton from "@/app/ui/skeletons";

// Since this is in a Route group it will only show when suspending the /dashboard page.
const loading = () => {
  return <DashboardSkeleton />;
};

export default loading;
