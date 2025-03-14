import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export function useUserSync() {
  const { user, isLoaded } = useUser();
  
  useEffect(() => {
    if (isLoaded && user) {
      // Sync user data with our backend
      fetch("http://localhost:5001/users/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          firstName: user.lastName,
          lastName: user.firstName,
          imageUrl: user.imageUrl,
          createdAt: new Date().toISOString(),
          // Add any other user data you want to store
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to sync user data');
        }
        return response.json();
      })
      .catch(error => {
        console.error("Error syncing user data:", error);
      });
    }
  }, [user, isLoaded]);
}