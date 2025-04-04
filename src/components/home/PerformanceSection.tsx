
import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';

// Sample data for revenue growth
const revenueData = [
  { name: '2018', revenue: 800 },
  { name: '2019', revenue: 1200 },
  { name: '2020', revenue: 950 },
  { name: '2021', revenue: 1500 },
  { name: '2022', revenue: 1800 },
  { name: '2023', revenue: 2200 },
];

// Sample data for business areas performance
const businessAreasData = [
  { name: 'XNK', value: 30 },
  { name: 'Vật tư', value: 25 },
  { name: 'VLNCN', value: 15 },
  { name: 'Đào tạo', value: 10 },
  { name: 'Quốc phòng', value: 20 },
];

// Sample data for subsidiary performance
const subsidiaryData = [
  { name: 'Q1', company1: 120, company2: 110, company3: 130, company4: 100, company5: 80 },
  { name: 'Q2', company1: 150, company2: 130, company3: 110, company4: 140, company5: 100 },
  { name: 'Q3', company1: 180, company2: 170, company3: 160, company4: 120, company5: 110 },
  { name: 'Q4', company1: 210, company2: 190, company3: 200, company4: 180, company5: 130 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-md">
        <p className="font-medium text-sm text-gray-900">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PerformanceSection: React.FC = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-gaet-600 uppercase tracking-wider">
            Kết quả kinh doanh
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
            Hiệu suất và tăng trưởng
          </h2>
          <p className="text-gray-600">
            GAET đạt được những kết quả kinh doanh ấn tượng qua từng năm, thể hiện sự phát triển bền vững và vững mạnh của tổng công ty và các đơn vị thành viên.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="glass-card p-6 opacity-0 animate-fade-in">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Tăng trưởng doanh thu</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0073be" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0073be" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#0073be" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    name="Doanh thu (tỷ VNĐ)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="glass-card p-6 opacity-0 animate-fade-in animate-delay-200">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Tỷ trọng theo lĩnh vực (2023)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={businessAreasData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" tickLine={false} />
                  <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    fill="#0073be" 
                    radius={[0, 4, 4, 0]} 
                    name="Tỷ lệ (%)"
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6 opacity-0 animate-fade-in animate-delay-400">
          <h3 className="text-xl font-semibold mb-6 text-gray-900">Hiệu suất các công ty thành viên (2023)</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={subsidiaryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="company1" name="Công ty A" stroke="#0073be" strokeWidth={2} />
                <Line type="monotone" dataKey="company2" name="Công ty B" stroke="#00a0e9" strokeWidth={2} />
                <Line type="monotone" dataKey="company3" name="Công ty C" stroke="#0d90e0" strokeWidth={2} />
                <Line type="monotone" dataKey="company4" name="Công ty D" stroke="#064b80" strokeWidth={2} />
                <Line type="monotone" dataKey="company5" name="Công ty E" stroke="#06294a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;
