import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  TooltipProps, 
  XAxis, 
  YAxis 
} from "recharts";
import { useEffect, useState } from "react";

type DataPoint = {
  date: string;
  value: number;
};

interface PerformanceChartProps {
  height?: number;
  showGrid?: boolean;
  timeRange?: '1M' | '3M' | '1Y' | 'All';
}

export function PerformanceChart({ 
  height = 160, 
  showGrid = true,
  timeRange = '1M' 
}: PerformanceChartProps) {
  // Generate random data that shows a generally positive trend
  const [data, setData] = useState<DataPoint[]>([]);
  
  useEffect(() => {
    // Generate data based on the selected time range
    const generateData = () => {
      let days: number;
      let startValue: number;
      
      switch(timeRange) {
        case '1M':
          days = 30;
          startValue = 40; // Starting value for 1 month view
          break;
        case '3M':
          days = 90;
          startValue = 38; // Starting value for 3 month view
          break;
        case '1Y':
          days = 365;
          startValue = 35; // Starting value for 1 year view
          break;
        case 'All':
          days = 730; // 2 years
          startValue = 30; // Starting value for all time view
          break;
      }
      
      const newData: DataPoint[] = [];
      let currentValue = startValue;
      
      // We'll use a range of dates based on the timeRange
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - days);
      
      // Create a date for each point, simulating daily data
      for (let i = 0; i <= days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        // Add some volatility but with an overall uptrend
        const change = (Math.random() - 0.4) * 1.2; // Biased toward positive
        currentValue = Math.max(currentValue + change, 20); // Never go below 20
        
        newData.push({
          date: currentDate.toLocaleDateString('en-US', {
            month: 'short', 
            day: 'numeric'
          }),
          value: parseFloat(currentValue.toFixed(2))
        });
      }
      
      return newData;
    };
    
    setData(generateData());
  }, [timeRange]);
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border p-2 text-sm shadow-sm rounded-md">
          <p className="mb-1 font-medium">{label}</p>
          <p className="text-primary">
            {payload[0].value?.toFixed(2)} USDC
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9e9e9" />
        )}
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }} 
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
          minTickGap={30}
        />
        <YAxis 
          tick={{ fontSize: 12 }} 
          tickLine={false}
          axisLine={false}
          width={30}
          domain={['dataMin - 1', 'dataMax + 1']}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1b4d3e" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#1b4d3e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="#1b4d3e" 
          fillOpacity={1} 
          fill="url(#colorValue)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}