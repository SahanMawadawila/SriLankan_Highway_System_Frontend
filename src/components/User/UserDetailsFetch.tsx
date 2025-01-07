import { useState, useEffect } from "react";
import { useAxiosPrivateWithAccessToken } from "../../hooks/axios-private-with-access-token";

export function UserDetailsFetch() {
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const axiosPrivateWithAccessToken = useAxiosPrivateWithAccessToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivateWithAccessToken.get("/user");
        setResponse(response.data.message);
      } catch (e: unknown) {
        setError(e.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>{response}</div>;
}
