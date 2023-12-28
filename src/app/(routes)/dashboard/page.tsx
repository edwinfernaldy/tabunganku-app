"use client";

import Card from "@/components/Card";
import { formatPrice, useSessionStore } from "@/store";
import { useEffect, useState } from "react";
import ChartSection from "./_element/chart.section";

const Dashboard: React.FC = () => {
  const userId = useSessionStore((state) => state.userId);

  const [balance, setBalance] = useState<number>(0);

  const getBalance = async () => {
    await fetch("/api/balance", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userId)
    }).then(async (data) => {
      const res = (await data.json()) as { amount: number };

      setBalance(res.amount);
    });
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <section className='flex flex-col gap-10 h-full justify-center overflow-hidden'>
      <h1 className='font-bold text-2xl lg:text-5xl text-end text-white tracking-tight'>
        Tracker
      </h1>

      <div className='flex gap-4 w-full flex-col lg:flex-row'>
        <Card className='flex flex-col gap-2 basis-1/3'>
          <h1>Balance</h1>

          <h1 className='font-extrabold text-xl'>Rp {formatPrice(balance)}</h1>
        </Card>

        <Card className='flex flex-col gap-2 basis-1/3'>
          <h1>Today&lsquo;s Income</h1>

          <h1 className='font-extrabold text-xl text-green-600'>Rp 0,-</h1>
        </Card>

        <Card className='flex flex-col gap-2 basis-1/3'>
          <h1>Today&lsquo;s Expenses</h1>

          <h1 className='font-extrabold text-xl'>Rp 0,-</h1>
        </Card>
      </div>

      <ChartSection />
    </section>
  );
};

export default Dashboard;
