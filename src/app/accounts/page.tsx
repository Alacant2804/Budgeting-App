import AccountList from "@/components/Accounts/AccountList";
// import AccountSummary from "@/components/accounts/AccountSummary";
import AddAccountButton from "@/components/Accounts/AddAccountButton";
// import NetWorthChart from "@/components/accounts/NetWorthChart";

export default async function AccountsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <AddAccountButton />
      </div>
      {/* <NetWorthChart /> */}
      <div className="w-[50vw]">
        <AccountList />
      </div>
      {/* <AccountSummary /> */}
    </div>
  );
}
