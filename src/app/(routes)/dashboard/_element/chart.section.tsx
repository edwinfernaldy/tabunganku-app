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

const ChartSection = () => {
  const [chartData, setChartData] = useState<
    { month: string; income: number; expense: number }[]
  >([]);

  useEffect(() => {
    setChartData(placeholderData);
  }, []);

  return (
    <Card className='flex flex-col gap-2'>
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
