"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Table from "@/components/Table";
import { Transaction } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

const Transaction: React.FC = () => {
  const [data, setData] = useState<Transaction[]>();

  const getTransactionData = async () => {
    await fetch("/api/transaction", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }).then(async (res) => {
      const transactions = (await res.json()) as Transaction[];

      setData(transactions);
    });
  };

  useEffect(() => {
    getTransactionData();
  }, []);

  return (
    <section className='space-y-10'>
      <h1 className='font-bold text-white text-end text-2xl lg:text-5xl tracking-tight'>
        Transaction Menu
      </h1>

      <div className='relative flex justify-end'>
        <Button className='w-fit flex items-center gap-2'>
          <IoMdAddCircle className='text-2xl' />
          New Transaction
        </Button>
      </div>

      <Card>
        <Table
          header={
            <tr>
              <th>No.</th>
              <th className='p-3'>Transaction Id</th>
              <th>Description</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          }
        >
          {data &&
            data.map((row, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{row.id}</td>
                <td>{row.desc}</td>
                <td>{row.type}</td>
                <td>{String(row.amount)}</td>
              </tr>
            ))}
        </Table>
      </Card>
    </section>
  );
};

export default Transaction;
