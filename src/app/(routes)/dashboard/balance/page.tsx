"use client";

import Card from "@/components/Card";
import Table from "@/components/Table";
import { formatPrice, useSessionStore } from "@/store";
import { Balance, Transaction } from "@prisma/client";
import React, { useEffect, useState } from "react";

const BalancePage: React.FC = () => {
  const [data, setData] = useState<Balance[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const userId = useSessionStore((state) => state.userId);

  const getBalanceData = async () => {
    await fetch("/api/all-balance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId })
    }).then(async (res) => {
      const balance = (await res.json()) as Balance[];

      if (balance.length !== 0) {
        setData(balance);
      }
    });
  };

  useEffect(() => {
    getBalanceData();
  }, []);

  return (
    <section className='flex flex-col gap-10 justify-center h-full'>
      <h1 className='font-bold text-white text-end text-2xl lg:text-5xl tracking-tight'>
        Balance History
      </h1>

      <Card>
        {data && (
          <Table
            header={
              <tr>
                <th className='p-3'>Date</th>
                <th className='text-left'>Amount</th>
              </tr>
            }
          >
            {data.length !== 0 &&
              data.map((row, i) => (
                <tr className='text-center border-b-2 border-gray-400' key={i}>
                  <td className='py-4'>
                    {new Date(row.created_at).toDateString()}
                  </td>
                  <td className='items-center text-left'>
                    Rp {formatPrice(Number(row.amount))}
                  </td>
                </tr>
              ))}
          </Table>
        )}
      </Card>
    </section>
  );
};

export default BalancePage;
