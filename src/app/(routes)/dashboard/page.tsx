"use client";

import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import { formatPrice, useSessionStore } from "@/store";
import { Balance, Transaction } from "@prisma/client";
import { useEffect, useState } from "react";
import ChartSection from "./_element/chart.section";

const Dashboard: React.FC = () => {
  const { userId, username } = useSessionStore();
  const [chartData, setChartData] = useState<
    { _sum: { amount: number }; type: string; month: string }[]
  >([]);
  const [balance, setBalance] = useState<number>(0);

  const [loadingBal, setLoadingBal] = useState<boolean>(true);
  const [loadingTrans, setLoadingTrans] = useState<boolean>(true);
  const [loadingChart, setLoadingChart] = useState<boolean>(true);

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
        setLoadingBal(false);
      } else {
        setLoadingBal(false);
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

    setLoadingTrans(false);
  };

  const getChartData = async () => {
    await fetch("/api/chart-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userId)
    }).then(async (data) => {
      const res = await data.json();
      setChartData(res);
    });
    setLoadingChart(false);
  };

  useEffect(() => {
    getBalance();
    getTodayTransaction();
    getChartData();
  }, []);

  return (
    <section className='flex flex-col gap-10 h-full justify-center overflow-hidden'>
      <h1 className='font-bold text-2xl lg:text-5xl text-end text-white tracking-tight'>
        {"Hello " + username}
      </h1>

      <div className='flex gap-4 w-full flex-col lg:flex-row'>
        <Card className='flex flex-col gap-2 basis-1/3'>
          <h1>Balance</h1>

          {loadingBal ? (
            <Skeleton className='w-full h-8' />
          ) : (
            <h1
              className={
                "font-extrabold text-xl " + (balance < 0 ? "text-red-500" : "")
              }
            >
              Rp {formatPrice(balance)}
            </h1>
          )}
        </Card>

        <Card className='flex flex-col gap-2 basis-1/3'>
          <h1>
            {new Date().toLocaleString("default", { month: "long" })} Income
          </h1>

          {loadingTrans ? (
            <Skeleton className='w-full h-8' />
          ) : (
            <h1 className='font-extrabold text-xl text-green-600'>
              Rp {formatPrice(today.income)}
            </h1>
          )}
        </Card>

        <Card className='flex flex-col gap-2 basis-1/3'>
          <h1>
            {new Date().toLocaleString("default", { month: "long" })} Expense
          </h1>

          {loadingTrans ? (
            <Skeleton className='w-full h-8' />
          ) : (
            <h1 className='font-extrabold text-xl text-red-600'>
              Rp {formatPrice(today.expense)}
            </h1>
          )}
        </Card>
      </div>

      {loadingChart ? (
        <Skeleton className='w-full h-72' />
      ) : (
        <ChartSection data={chartData} />
      )}
    </section>
  );
};

export default Dashboard;
