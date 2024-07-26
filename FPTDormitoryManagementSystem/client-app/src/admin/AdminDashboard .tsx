import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CardHeader, Button, Box } from '@mui/material';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ServiceUsageData {
  serviceId: string;
  serviceName: string;
  usagePercentage: number;
}

const AdminStatistics: React.FC = () => {
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalBookingRequests, setTotalBookingRequests] = useState<number>(0);
  const [totalServiceRequests, setTotalServiceRequests] = useState<number>(0);
  const [totalMonthlyRevenue, setTotalMonthlyRevenue] = useState<number>(0);
  const [serviceUsageData, setServiceUsageData] = useState<{ labels: string[]; datasets: any[] }>({
    labels: [],
    datasets: []
  });
  const [monthlyRevenueData, setMonthlyRevenueData] = useState<{ labels: string[]; datasets: any[] }>({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    // Fetch total number of students with approved bookings
    axios.get('https://localhost:7777/api/Statistic/approved-bookings/count')
      .then(response => {
        setTotalStudents(response.data.totalApprovedBookings);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });

    // Fetch total number of booking requests
    axios.get('https://localhost:7777/api/Statistic/booking-requests/count')
      .then(response => {
        setTotalBookingRequests(response.data.totalBookingRequests);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });

    // Fetch total number of service requests
    axios.get('https://localhost:7777/api/Statistic/service-request/count')
      .then(response => {
        setTotalServiceRequests(response.data.totalServiceRequests);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });

    // Fetch service usage percentage
    axios.get('https://localhost:7777/api/Statistic/service-usage-percentage')
      .then(response => {
        const serviceUsage: ServiceUsageData[] = response.data;
        const labels = serviceUsage.map(s => s.serviceName);
        const data = serviceUsage.map(s => s.usagePercentage);
        setServiceUsageData({
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FF9F40',
                '#4BC0C0',
              ],
            },
          ],
        });
      })
      .catch(error => {
        console.error('There was an error fetching the service usage data!', error);
      });

      axios.get('https://localhost:7777/api/Statistic/monthly-revenue')
      .then(response => {
        console.log('API Response:', response.data);  
        const monthlyRevenue = response.data;
        const labels = monthlyRevenue.map((r: any) => `${r.month}`);
        const data = monthlyRevenue.map((r: any) => r.totalRevenue);
        console.log('Labels:', labels);  
        console.log('Data:', data);  
        setMonthlyRevenueData({
          labels: labels,
          datasets: [
            {
              label: 'Revenue',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
  
        const totalRevenue = data.reduce((sum: number, revenue: number) => sum + revenue, 0);
        console.log('Total Revenue:', totalRevenue); 
        setTotalMonthlyRevenue(totalRevenue);
      })
      .catch(error => {
        console.error('There was an error fetching the revenue data!', error);
      });
  }, []);

  const handleExport = async () => {
    const response = await axios.get('https://localhost:7777/api/Export/export-data', {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ExportData.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div style={{ padding: '20px' }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button style={{color: 'white', backgroundColor: 'green'}} onClick={handleExport}>
          Export to Excel
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader title="Total Students" />
            <CardContent>
              <Typography variant="h4">
                {totalStudents}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader title="Total Booking Request" />
            <CardContent>
              <Typography variant="h4">
                {totalBookingRequests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader title="Total Service Request" />
            <CardContent>
              <Typography variant="h4">
                {totalServiceRequests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader title="Total Monthly Revenue" />
            <CardContent>
              <Typography variant="h4">
                {totalMonthlyRevenue} VND
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Monthly Revenue Chart" />
            <CardContent>
              <Bar data={monthlyRevenueData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Service Usage" />
            <CardContent>
              <Doughnut data={serviceUsageData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminStatistics;
