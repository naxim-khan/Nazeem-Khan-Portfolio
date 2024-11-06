import Head from "next/head";
import { Bar } from 'react-chartjs-2';
import Loading from "@/components/Loading"; // Assuming you have a Loading component
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { IoHome } from "react-icons/io5";
import { useEffect, useState } from "react";
import LoginLayout from "@/components/LoginLayout";

export default function Home() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  // State hooks for data and loading
  const [blogsData, setBlogsData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true); // default to true (loading)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Blogs Created Monthly',
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from multiple endpoints
        const [responseBlogs, responseProjects, responsePhotos, responseShops] = await Promise.all([
          fetch('/api/blogs'),
          fetch('/api/projects'),
          fetch('/api/photos'),
          fetch('/api/shops')
        ]);

        const dataBlogs = await responseBlogs.json();
        const dataProjects = await responseProjects.json();
        const dataPhotos = await responsePhotos.json();
        const dataShops = await responseShops.json();

        // Set the fetched data
        setBlogsData(dataBlogs);
        setProjectData(dataProjects);
        setPhotosData(dataPhotos);
        setShopData(dataShops);

        // Set loading to false after data is fetched
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false); // Ensure loading stops even if there's an error
      }
    };

    fetchData(); // Call the fetch function
  }, []);

  // If the data is still loading, show a loading component
  if (loading) {
    return (
      <div className="full-h flex flex-center">
        <Loading /> {/* You can customize this with a proper loading spinner */}
      </div>
    );
  }

  // Aggregate data by year and month for the chart
  const monthlyData = blogsData.filter(dat => dat.status === "publish").reduce((acc, blog) => {
    const year = new Date(blog.createdAt).getFullYear();
    const month = new Date(blog.createdAt).getMonth();
    acc[year] = acc[year] || Array(12).fill(0);
    acc[year][month]++;
    return acc;
  }, {});

  const currentYear = new Date().getFullYear();
  const year = Object.keys(monthlyData);
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const datasets = year.map(year => (
    {
      label: `${year}`,
      data: monthlyData[year] || Array(12).fill(0),
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`
    }
  ));

  // Define data for the chart
  const data = {
    labels, // months of the year
    datasets, // aggregated monthly data
  };

  return (
    <LoginLayout>
      <>
        <Head>
          <title>Portfolio Backend</title>
          <meta name="description" content="Blog website backend" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <div className="dashboard">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>Admin <span>Dashboard</span></h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb">
              <IoHome /><span>/</span><span>Dashboard</span>
            </div>
          </div>
          
          {/* dashboard four cards */}
          <div className="topfourcards flex flex-sb">
            <div className="four_card">
              <h2>Total Blogs</h2>
              <span>{blogsData.filter(dat => dat.status ==='publish').length}</span>
            </div>

            <div className="four_card">
              <h2>Total Projects</h2>
              <span>{projectData.filter(dat => dat.status ==='publish').length}</span>
            </div>

            <div className="four_card">
              <h2>Total Products</h2>
              <span>{shopData.filter(dat => dat.status ==='publish').length}</span>
            </div>

            <div className="four_card">
              <h2>Gallery Photos</h2>
              <span>{photosData.length}</span>
            </div>
          </div>

          {/* year overview */}
          <div className="year_overview flex flex-sb">
            <div className="leftyearoverview">
              <div className="flex flex-sb">
                <h2>Year Overview</h2>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
                <h3 className="text-right">{blogsData.filter(dat => dat.status ==='publish').length} /365 <br /><span> Total Published</span></h3>
              </div>
              <Bar options={options} data={data} />
            </div>

            <div className="right_salescont">
              <div>
                <h3>Blogs By Category</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
              </div>
              <div className="blogscategory flex flex-center">
                <table>
                  <thead>
                    <tr>
                      <td>Topics</td>
                      <td>Data</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Next JS</td>
                      <td>{blogsData.filter(dat => dat.blogcategory[0] === "Next js").length}</td>
                    </tr>
                    <tr>
                      <td>CSS</td>
                      <td>{blogsData.filter(dat => dat.blogcategory[0] === "CSS").length}</td>
                    </tr>
                    <tr>
                      <td>Node Js</td>
                      <td>{blogsData.filter(dat => dat.blogcategory[0] === "Node js").length}</td>
                    </tr>
                    <tr>
                      <td>Full Stack Web</td>
                      <td>{blogsData.filter(dat => dat.blogcategory[0] === "Full Stack Web").length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    </LoginLayout>
  );
}
