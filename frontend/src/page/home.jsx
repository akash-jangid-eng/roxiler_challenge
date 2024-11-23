import React from "react";
import CombinedDashboard from "../Components/CombinedDashboard";
import TransactionTable from "../Components/TransactionTable";

const Home = () => {
  return (
    <div>
      <CombinedDashboard />
      <TransactionTable />
    </div>
  );
};

export default Home;
