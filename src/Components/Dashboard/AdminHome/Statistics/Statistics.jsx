import  { useEffect, useState } from "react";

import Chart from "react-apexcharts";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";

const Statistics = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: "bar",
        height: 250,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "25%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: "Number of Bookings",
        },
      },
      fill: {
        opacity: 1,
      },
    },
    series: [],
  });
  const axiosSecure = UseAxiosSecure()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint to fetch bookings data
        const response = await axiosSecure.get("/parcel");

        // Process data to count bookings by date
        const bookings = response.data;
        const bookingsByDate = {};

        bookings.forEach((booking) => {
          const bookingDate = new Date(booking.bookingDate).toLocaleDateString();
         
          if (bookingsByDate.bookingDate) {
            bookingsByDate[bookingDate]++;
          } else {
            bookingsByDate[bookingDate] = 1;
          }
        });

        // Prepare data for ApexCharts
        const categories = Object.keys(bookingsByDate);
        const series = Object.values(bookingsByDate);

        setChartData({
          ...chartData,
          options: {
            ...chartData.options,
            xaxis: {
              categories: categories,
            },
          },
          series: [
            {
              name: "Number of Bookings",
              data: series,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default Statistics;
