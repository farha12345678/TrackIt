
import { useState } from "react";
import Chart from 'react-apexcharts';
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
            
           
  

   
const Statistics = () => {

    const axiosSecure = UseAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcel');
            console.log(res.data);
            return res.data;

        }


    })
    // chart
    const [chartData, setChartData] = useState({
        series: [{
          name: parcels.type,
          data: parcels.price
        }],
        options: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val;
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#304758"]
            }
          },
          xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            position: 'top',
            labels: {
              offsetY: -18,
            },
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                }
              }
            },
            tooltip: {
              enabled: true,
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
              formatter: function (val) {
                return val;
              }
            }
          },
          title: {
            text: 'Monthly Sales',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
              color: '#444'
            }
          }
        }
      });
    
      const updateChartData = () => {
        setChartData(prevState => ({
          ...prevState,
          series: [{
            ...prevState.series[0],
            data: [30, 40, 35, 50, 49, 60, 70]
          }]
        }));
      };
      
      return (
        <div className="app">
        <h1>React ApexCharts Bar Chart Example</h1>
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              height="350"
            />
          </div>
        </div>
        <button onClick={updateChartData}>Update Chart Data</button>
      </div>
    );
  };
    
export default Statistics;