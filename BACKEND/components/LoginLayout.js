import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect to signup page if no session and status is authenticated
    if (status === 'unauthenticated' && !session) {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  // While session is loading, show a loading state
  if (status === 'loading') {
    return (
      <div className="full-h flex flex-center">
        <div className="loading-bar">Loading...</div>
      </div>
    );
  }

  // Render children if authenticated
  if (session) {
    return <>{children}</>;
  }

  return null; // Or you can return a different component for unauthenticated users
}
