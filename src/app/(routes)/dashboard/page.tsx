"use client";

import Card from "@/components/Card";
import { formatPrice, useSessionStore } from "@/store";
import { Balance, Transaction } from "@prisma/client";
import { useEffect, useState } from "react";
import ChartSection from "./_element/chart.section";

const Dashboard: React.FC = () => {
  const { userId, username } = useSessionStore();

  const [balance, setBalance] = useState<number>(0);

  const [today, setToday] = useState<{ income: number; expense: number }>({
    income: 0,
    expense: 0
  });

  const getBalance = async () => {
    await fetch("/api/balance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userId)
    }).then(async (data) => {
      const res = await data.json();
      const temp = JSON.parse(res) as Balance;

      if (Number(temp.amount) !== 0) {
        setBalance(Number(temp.amount));
      }
    });
  };

  const getTodayTransaction = async () => {
    let income = 0;
    let expense = 0;

    await fetch("/api/monthly-income", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userId)
    }).then(async (data) => {
      const res = (await data.json()) as Transaction[];

      if (res.length !== 0) {
        res.map((inc, i) => {
          income += Number(inc.amount);
        });
      }
    });

    await fetch("/api/monthly-expense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userId)
    }).then(async (data) => {
      const res = (await data.json()) as Transaction[];

      if (res.length !== 0) {
        res.map((inc, i) => {
          expense += Number(inc.amount);
        });
      }
    });

    setToday({ income: income, expense: expense });
  };

  useEffect(() => {
    getBalance();
    getTodayTransaction();
  }, []);

  return (
    <section className='flex flex-col gap-10 h-full justify-center overflow-hidden'>
      <h1 className='font-bold text-2xl lg:text-5xl text-end text-white tracking-tight'>
        {"Hello " + username}
      </h1>

      <div className='flex gap-4 w-full flex-col lg:flex-row'>
        <Card className='flex flex-col gap-2 basis-1/3'>
          <h1>Balance</h1>

          <h1
            className={
              "font-extrabold text-xl " + (balance < 0 ? "text-red-500" : "")
            }
          >
            Rp {formatPrice(balance)}
          </h1>
        </Card>

        <Card className='flex flex-col gap-2 basis-1/3'>
          <h1>
            {new Date().toLocaleString("default", { month: "long" })} Income
          </h1>

          <h1 className='font-extrabold text-xl text-green-600'>
            Rp {formatPrice(today.income)}
          </h1>
        </Card>

        <Card className='flex flex-col gap-2 basis-1/3'>
          <h1>
            {new Date().toLocaleString("default", { month: "long" })} Expense
          </h1>

          <h1 className='font-extrabold text-xl text-red-500'>
            Rp {formatPrice(today.expense)}
          </h1>
        </Card>
      </div>

      <ChartSection />
    </section>
  );
};

export default Dashboard;
