"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { useSessionStore } from "@/store";
import { Transaction } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

interface FormTransaction {
  type: "INCOME" | "EXPENSE" | string;
  date: string;
  amount: number;
  desc: string;
  user_id: string;
}

const Transaction: React.FC = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const userId = useSessionStore((state) => state.userId);

  const initialData: FormTransaction = {
    type: "INCOME",
    date: "",
    amount: 0,
    desc: "",
    user_id: userId
  };

  const [form, setForm] = useState<FormTransaction>(initialData);

  const getTransactionData = async () => {
    await fetch("/api/transaction", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }).then(async (res) => {
      const transactions = (await res.json()) as Transaction[];

      if (transactions.length !== 0) {
        setData(transactions);
      }
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
    <section className='flex flex-col gap-10 justify-center h-full'>
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
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
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
        {data && (
          <Table
            header={
              <tr>
                <th>No.</th>
                <th className='p-3'>Description</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            }
          >
            {data.length !== 0 &&
              data.map((row, i) => (
                <tr className='text-center border-b-2 border-gray-400' key={i}>
                  <td>{i + 1}</td>
                  <td className='py-4'>{row.desc}</td>
                  <td>{row.type}</td>
                  <td>{String(row.amount)}</td>
                </tr>
              ))}
          </Table>
        )}
      </Card>
    </section>
  );
};

export default Transaction;
