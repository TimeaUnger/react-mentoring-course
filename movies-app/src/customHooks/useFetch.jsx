import { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {

  const [data, setData] = useState();

  useEffect(() => {

    const dataFetch = () => {
    fetch(url)
      .then((response) => response.json())
      .then((res) => 
      {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }

    dataFetch();
  }, [url]);

  return [data];
};

export default useFetch;
