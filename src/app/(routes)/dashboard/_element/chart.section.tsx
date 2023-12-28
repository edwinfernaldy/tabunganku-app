import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { placeholderData } from "./data";
import Card from "@/components/Card";
import { useEffect, useState } from "react";

interface ChartProps {
  data: {
    _sum: { amount: number };
    type: string;
    month: string;
  }[];
}

const ChartSection = (props: ChartProps) => {
  const { data } = props;

  const [chartData, setChartData] = useState<
    { month: string; income: number; expense: number }[]
  >([]);

  const dataPrep = () => {
    let tempArr = [];
    for (let i = 0; i < data.length; i++) {
      if (i === data.length - 1) {
        tempArr.push({
          month: data[i].month,
          income: data[i].type === "INCOME" ? data[i]._sum.amount : 0,
          expense: data[i].type === "EXPENSE" ? data[i]._sum.amount : 0
        });
      } else if (data[i].month === data[i + 1].month) {
        tempArr.push({
          month: data[i].month,
          income: data[i]._sum.amount,
          expense: data[i + 1]._sum.amount
        });
        i++;
      } else {
        tempArr.push({
          month: data[i].month,
          income: data[i].type === "INCOME" ? data[i]._sum.amount : 0,
          expense: data[i].type === "EXPENSE" ? data[i]._sum.amount : 0
        });
      }
    }

    console.log(tempArr);

    setChartData(tempArr);
  };

  useEffect(() => {
    dataPrep();
  }, [data]);

  return (
    <Card className='flex flex-col gap-5'>
      <h1>Overview</h1>

      <div className='w-full h-80'>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart data={chartData} className='w-full'>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis hide />
            <Tooltip />
            <Legend />
            <Bar
              dataKey='income'
              fill='#8884d8'
              activeBar={<Rectangle fill='pink' stroke='blue' />}
            />
            <Bar
              dataKey='expense'
              fill='#82ca9d'
              activeBar={<Rectangle fill='gold' stroke='purple' />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ChartSection;
