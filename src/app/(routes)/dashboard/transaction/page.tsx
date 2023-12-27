"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { Transaction } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

interface FormTransaction {
  type: "INCOME" | "EXPENSE" | string;
  date: string;
  amount: number;
  description: string;
}

const initialData: FormTransaction = {
  type: "INCOME",
  date: "",
  amount: 0,
  description: ""
};

const Transaction: React.FC = () => {
  const [data, setData] = useState<Transaction[]>();
  const [open, setOpen] = useState<boolean>(false);

  const [form, setForm] = useState<FormTransaction>(initialData);

  const getTransactionData = async () => {
    await fetch("/api/transaction", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }).then(async (res) => {
      const transactions = (await res.json()) as Transaction[];

      setData(transactions);
    });
  };

  const addTransactionData = async () => {
    await fetch("/api/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).then(async (res) => {
      setForm(initialData);
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
        <Button
          onClick={() => setOpen(true)}
          className='w-fit flex items-center gap-2'
        >
          <IoMdAddCircle className='text-2xl' />
          New Transaction
        </Button>

        {open && (
          <Modal onClose={() => setOpen(false)} header={"Add Transaction"}>
            <div className='space-y-4 mt-5'>
              <div className='flex gap-2 items-center w-full'>
                <div className='flex flex-col gap-2 basis-1/2'>
                  <label>Type</label>

                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className='w-full border border-gray-400 p-3 rounded-md appearance-none'
                  >
                    <option value={"INCOME"}>Income</option>
                    <option value={"EXPENSE"}>Expense</option>
                  </select>
                </div>

                <div className='flex flex-col gap-2 basis-1/2'>
                  <label>Transaction Date</label>
                  <Input
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className='border border-gray-400'
                    type={"date"}
                  />
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <label>Amount</label>
                <Input
                  value={form.amount}
                  onChange={(e) =>
                    setForm({ ...form, amount: Number(e.target.value) })
                  }
                  className='border border-gray-400'
                  type={"text"}
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label>Description</label>
                <Input
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className='border border-gray-400'
                  type={"text"}
                />
              </div>

              <Button onClick={() => addTransactionData()}>Submit</Button>
            </div>
          </Modal>
        )}
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
