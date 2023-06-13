import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { parseCookies } from "nookies";

const SecurePage = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const isAuthenticated = () => {
    const cookies = parseCookies();
    const token = cookies.accessToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default SecurePage;
