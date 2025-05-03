// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { getAccessToken, getUserRoleFromToken } from '@/lib/token'; // sesuaikan path

// const withAuth = (WrappedComponent: React.ComponentType, requiredRole: string = 'USER') => {
//     const AuthenticatedComponent = (props: any) => {
//         const router = useRouter();
//         const [checkingAuth, setCheckingAuth] = useState(true);

//         useEffect(() => {
//             const token = getAccessToken();
//             const role = getUserRoleFromToken();

//             if (!token || role !== requiredRole) {
//                 router.replace('/auth/login');
//             } else {
//                 setCheckingAuth(false);
//             }
//         }, [router]);

//         if (checkingAuth) return null;

//         return <WrappedComponent {...props} />;
//     };

//     return AuthenticatedComponent;
// };

// export default withAuth;