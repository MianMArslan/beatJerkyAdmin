import { useRouter } from 'next/router';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode'; // Import JWT decoding library
import { parseCookies } from 'nookies'; // Import nookies library for cookie parsing

const SecurePage = ({ children }) => {
  const router = useRouter();

  // Check if the user is authenticated
  const isAuthenticated = () => {
    const cookies = parseCookies();
    const token = cookies.token; // Get the JWT token from the 'token' cookie
    if (token) {
      // Decode the JWT token to get the expiration time
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert current time to seconds
      if (decodedToken.exp > currentTime) {
        // Token is still valid
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    // Redirect to login page if user is not authenticated
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  if (!isAuthenticated()) {
    // Optionally, you can show a loading spinner or message while checking authentication
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default SecurePage;
