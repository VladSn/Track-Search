import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (...urls) => {
    setLoading(true);
    try {
      if (urls.length > 1) {
        const fetches = urls.map((url) => fetch(url));
        let responses = await Promise.all(fetches);
        const dataArr = await Promise.all(responses.map((r) => r.json()));
        setLoading(false);
        return dataArr;
      } else {
        const response = await fetch(urls[0]);
        const data = await response.json();
        setLoading(false);
        return data.message.body;
      }
    } catch (error) {
      setLoading(false);
    }
  }, []);

  return { request, loading };
};
