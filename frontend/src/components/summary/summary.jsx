import { useEffect, useState } from 'react';
import { useSummaryMutation } from '../../redux/apislice';
import { useSelector } from 'react-redux';
import { PieChart, BarChart, LineChart } from '@mui/x-charts';
import { 
  FaCalendarCheck, FaClock, FaChartBar, 
  FaCheckCircle, FaExclamationTriangle, FaTimesCircle,
  FaBusinessTime, FaRegClock
} from 'react-icons/fa';
import dayjs from 'dayjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const getTimeInSeconds = (timeStr) => {
  if (!timeStr) return 0;
  const [time, meridian] = timeStr.split(' ');
  let [h, m, s] = time.split(':').map(Number);
  if (meridian === 'PM' && h !== 12) h += 12;
  if (meridian === 'AM' && h === 12) h = 0;
  return h * 3600 + m * 60 + s;
};

const formatTimeLabel = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
};

const SummaryCharts = () => {
  const id = useSelector((state) => state.user.id);
  const [summaryAPI] = useSummaryMutation();
  const [monthlyData, setMonthlyData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [workTimeData, setWorkTimeData] = useState([]);
  const [dailyHours, setDailyHours] = useState([]);
  const [summary, setSummary] = useState({
    presentdays: 0,
    halfdays: 0,
    unactivedays: 0,
    totalHours: 0,
    avgHours: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await summaryAPI(id).unwrap();

        const monthWiseSeconds = {};
        let present = 0, half = 0, unactive = 0;
        let totalSeconds = 0;
        let totalDays = 0;
        const dailyHoursData = [];

        res.totalhours?.forEach((day) => {
          const { punchs, date, status } = day;
          
          if (status === 'present') present++;
          else if (status === 'halfday') half++;
          else unactive++;

          let totalDaySeconds = 0;
          const pairCount = Math.floor(punchs.length / 2);
          for (let i = 0; i < pairCount; i++) {
            const start = getTimeInSeconds(punchs[2 * i]);
            const end = getTimeInSeconds(punchs[2 * i + 1]);
            totalDaySeconds += end - start;
          }

          dailyHoursData.push({
            date: dayjs(date).format('MMM D'),
            hours: +(totalDaySeconds / 3600).toFixed(1)
          });

          if (['present', 'halfday'].includes(status)) {
            const monthKey = dayjs(date).format('MMM YYYY');
            monthWiseSeconds[monthKey] = (monthWiseSeconds[monthKey] || 0) + totalDaySeconds;
            totalSeconds += totalDaySeconds;
            totalDays++;
          }
        });

        const chartData = Object.entries(monthWiseSeconds).map(([month, seconds]) => ({
          month,
          hours: +(seconds / 3600).toFixed(1),
        }));

        setMonthlyData(chartData);
        setDailyHours(dailyHoursData.reverse().slice(-7));

        setAttendanceData([
          { id: 0, value: present, label: 'Present', color: '#10B981' },
          { id: 1, value: half, label: 'Half Day', color: '#F59E0B' },
          { id: 2, value: unactive, label: 'Unactive', color: '#EF4444' },
        ]);

        setWorkTimeData([
          { 
            id: 0, 
            value: Math.round(totalSeconds / 3600), 
            label: 'Total Hours', 
            color: '#3B82F6' 
          },
          { 
            id: 1, 
            value: Math.round((totalDays > 0 ? totalSeconds / totalDays : 0) / 3600), 
            label: 'Avg/Day', 
            color: '#8B5CF6' 
          },
        ]);

        setSummary({
          presentdays: present,
          halfdays: half,
          unactivedays: unactive,
          totalHours: totalSeconds,
          avgHours: totalDays > 0 ? Math.floor(totalSeconds / totalDays) : 0,
        });
      } catch (err) {
        console.error("Chart Error:", err);
      }
    };

    fetchSummary();
  }, [id, summaryAPI]);

  const summaryCards = [
    { 
      title: 'Present Days', 
      value: summary.presentdays, 
      icon: <FaCheckCircle className="text-green-500" />,
      color: 'bg-green-100'
    },
    { 
      title: 'Half Days', 
      value: summary.halfdays, 
      icon: <FaExclamationTriangle className="text-yellow-500" />,
      color: 'bg-yellow-100'
    },
    { 
      title: 'Unactive Days', 
      value: summary.unactivedays, 
      icon: <FaTimesCircle className="text-red-500" />,
      color: 'bg-red-100'
    },
    { 
      title: 'Total Hours', 
      value: formatTimeLabel(summary.totalHours), 
      icon: <FaClock className="text-blue-500" />,
      color: 'bg-blue-100'
    },
    { 
      title: 'Avg/Day', 
      value: formatTimeLabel(summary.avgHours), 
      icon: <FaChartBar className="text-purple-500" />,
      color: 'bg-purple-100'
    }
  ];

  // Responsive chart width
  const getChartWidth = () => {
    if (window.innerWidth < 640) return window.innerWidth - 48; // padding
    if (window.innerWidth < 900) return 350;
    return 400;
  };

  // Responsive grid columns for summary cards
  const getSummaryCardGridCols = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 900) return 2;
    if (window.innerWidth < 1200) return 3;
    if (window.innerWidth < 1536) return 4;
    return 5;
  };

  // Listen for resize to update chart width
  const [chartWidth, setChartWidth] = useState(getChartWidth());
  const [summaryCardCols, setSummaryCardCols] = useState(getSummaryCardGridCols());

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(getChartWidth());
      setSummaryCardCols(getSummaryCardGridCols());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="sm:p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-6">
        <FaCalendarCheck className="text-2xl text-indigo-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Attendance & Work Analytics</h2>
      </div>
      <div
        className={`grid gap-2 sm:gap-3 mb-6`}
        style={{
          gridTemplateColumns: `repeat(${summaryCardCols}, minmax(0, 1fr))`
        }}
      >
        {summaryCards.map((card, index) => (
          <Card 
            key={index} 
            className="shadow rounded-lg sm:rounded-xl p-0"
            sx={{
              minWidth: 0,
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              margin: 0,
            }}
          >
            <CardContent className="flex flex-col items-center p-2 sm:p-3">
              <div className={`p-2 sm:p-3 rounded-full mb-2 sm:mb-3 ${card.color}`}>
                {card.icon}
              </div>
              <Typography 
                variant="subtitle1" 
                className="font-semibold text-gray-700"
                sx={{ fontSize: { xs: '1rem', sm: '1.15rem' }, lineHeight: 1.1 }}
              >
                {card.value}
              </Typography>
              <Typography 
                variant="caption" 
                className="text-gray-500 mt-0.5 sm:mt-1"
                sx={{ fontSize: { xs: '0.75rem', sm: '0.9rem' } }}
              >
                {card.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
        <Card className="shadow-lg rounded-xl h-full">
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <FaBusinessTime className="text-indigo-500" />
              <Typography variant="h6" className="font-semibold">
                Attendance Distribution
              </Typography>
            </div>
            <div className="flex justify-center">
              <PieChart
                series={[
                  {
                    data: attendanceData,
                    innerRadius: 40,
                    outerRadius: 80,
                    paddingAngle: 2,
                    cornerRadius: 5,
                  },
                ]}
                height={Math.max(160, Math.min(220, chartWidth * 0.7))}
                width={Math.max(140, Math.min(220, chartWidth * 0.9))}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {attendanceData.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col items-center p-2 rounded-lg"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <span className="font-semibold">{item.value}</span>
                  <span className="text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-xl h-full">
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <FaRegClock className="text-indigo-500" />
              <Typography variant="h6" className="font-semibold">
                Work Time Analysis
              </Typography>
            </div>
            <div className="flex justify-center">
              <PieChart
                series={[
                  {
                    data: workTimeData,
                    innerRadius: 40,
                    outerRadius: 80,
                    paddingAngle: 2,
                    cornerRadius: 5,
                  },
                ]}
                height={Math.max(160, Math.min(220, chartWidth * 0.7))}
                width={Math.max(140, Math.min(220, chartWidth * 0.9))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {workTimeData.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col items-center p-2 rounded-lg"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <span className="font-semibold">{item.value} hours</span>
                  <span className="text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-xl h-full col-span-1 xl:col-span-1">
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <FaChartBar className="text-indigo-500" />
              <Typography variant="h6" className="font-semibold">
                Daily Hours (Last 7 Days)
              </Typography>
            </div>
            <div className="flex justify-center">
              <BarChart
                xAxis={[{ 
                  scaleType: 'band', 
                  data: dailyHours.map(d => d.date),
                  label: 'Date'
                }]}
                series={[{ 
                  data: dailyHours.map(d => d.hours),  
                  label: 'Hours Worked',
                  color: '#6366F1'
                }]}
                height={220}
                width={chartWidth < 350 ? chartWidth : 250}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4">
        <Card className="shadow-lg rounded-xl">
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <FaChartBar className="text-indigo-500" />
              <Typography variant="h6" className="font-semibold">
                Monthly Work Hours Trend
              </Typography>
            </div>
            <div className="flex justify-center">
              <LineChart
                xAxis={[{ 
                  data: monthlyData.map(d => d.month), 
                  scaleType: 'band',
                  label: 'Month'
                }]}
                series={[{ 
                  data: monthlyData.map(d => d.hours), 
                  label: 'Hours Worked',
                  curve: 'natural',
                  showMarkers: true,
                  color: '#8B5CF6'
                }]}
                height={chartWidth < 350 ? 220 : 200}
                width={chartWidth < 350 ? chartWidth : 200}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SummaryCharts;
