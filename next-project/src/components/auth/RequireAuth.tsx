"use client"; 

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const router = useRouter();
  const userId = useSelector((state: RootState) => state.cart.userId); 

  useEffect(() => {
    if (!userId) {
      router.push('/login'); 
    }
  }, [userId, router]);

  if (!userId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Por favor, faça login para acessar esta página.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;