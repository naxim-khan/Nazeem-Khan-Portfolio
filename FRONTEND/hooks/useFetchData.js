const { default: axios } = require("axios");
const { useState, useEffect } = require("react");

function useFetchData(apiEndpoint) {
  const [alldata, setAlldata] = useState([]); 
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get(apiEndpoint); 
        setAlldata(res.data); 
        setLoading(false); 
      } catch (err) {
        console.error("Error fetching data: ", err.response || err.message);
        setLoading(false); 
      }
    };

    // Trigger API call if `apiEndpoint` exists
    if (apiEndpoint) {
      fetchAllData();
    }
  }, [apiEndpoint]); // Trigger useEffect whenever the API endpoint changes

  return { alldata, loading }; 
}

export default useFetchData;
