"use client";

// import AccountSummary from "@/components/Accounts/AccountSummary";
// import AccountList from "@/components/Accounts/AccountList";
// import AddAccountModal from "@/components/Accounts/AddAccountModal";
// import NetWorthChart from "@/components/Accounts/NetWorthChart";
// import { Account } from "@/types/account";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* <AccountSummary
        totalAssets={totalAssets}
        totalLiabilities={totalLiabilities}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <NetWorthChart />
        </div>
        <AccountList accounts={accounts} />
      </div>

      <AddAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAccount}
      /> */}
    </div>
  );
}
