import React from "react";

// const sleep = (ms) => 
//   new Promise((resolve, reject) => setTimeout(() => resolve(), ms));

export const useFetch = (enpoint, options) => {

  const api = "http://localhost:3000";
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const url = `${api}/${enpoint}`;

  React.useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        // await sleep(3000);
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        // setLoading(false);
      }
    };
    fetchData();
  }, [options, url]);
  return { response, loading, error };
};
