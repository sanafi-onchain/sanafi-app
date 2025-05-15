import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Define the data structure for the pie chart
type HoldingData = {
  name: string;
  value: number;
  color: string;
};

interface HoldingsPieChartProps {
  data?: HoldingData[];
  totalValue?: number;
}

export function HoldingsPieChart({ 
  data = [
    { name: 'Sukuk', value: 40, color: 'var(--primary)' },
    { name: 'Equities', value: 30, color: 'var(--secondary)' },
    { name: 'Mudarabah', value: 30, color: 'var(--accent)' }
  ],
  totalValue = 45
}: HoldingsPieChartProps) {
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border p-2 text-sm shadow-sm rounded-md">
          <p className="mb-1 font-medium">{payload[0].name}</p>
          <p className="text-primary">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="aspect-square relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-bold">{totalValue} USDC</div>
          <div className="text-xs text-muted-foreground">Total Value</div>
        </div>
      </div>
    </div>
  );
}