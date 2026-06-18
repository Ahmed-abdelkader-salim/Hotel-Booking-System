import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const [status, setStatus] = useState('loading'); // loading | success | error

    useEffect(() => {
        const bookingId = searchParams.get("bookingId");
        const payment = searchParams.get("payment");

        if (payment !== "success" || !bookingId) {
            navigate("/my-bookings");
            return;
        }

        const confirm = async () => {
            try {
                const token = await getToken();
               
                await new Promise(res => setTimeout(res, 2000));

                const { data } = await axios.get(
                    `/api/bookings/verify/${bookingId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (data.isPaid) {
                    setStatus('success');
                    // ✅ بعد 3 ثواني روح لـ my-bookings
                    setTimeout(() => navigate("/my-bookings"), 3000);
                } else {
                    setStatus('error');
                    setTimeout(() => navigate("/my-bookings"), 3000);
                }
            } catch {
                setStatus('error');
                setTimeout(() => navigate("/my-bookings"), 3000);
            }
        };

        confirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 flex flex-col items-center gap-5 w-full max-w-sm mx-4">

                {/* Loading */}
                {status === 'loading' && (
                    <>
                        <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-gray-800 animate-spin" />
                        <div className="flex flex-col items-center gap-1">
                            <h2 className="text-lg font-medium text-gray-900">Confirming payment</h2>
                            <p className="text-sm text-gray-400">Please wait a moment...</p>
                        </div>
                    </>
                )}

                {/* Success */}
                {status === 'success' && (
                    <>
                        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center animate-bounce-once">
                            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <h2 className="text-lg font-medium text-gray-900">Payment confirmed!</h2>
                            <p className="text-sm text-gray-400">Your booking is now confirmed.</p>
                            <p className="text-xs text-gray-300 mt-2">Redirecting to your bookings...</p>
                        </div>
                    </>
                )}

                {/* Error */}
                {status === 'error' && (
                    <>
                        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <h2 className="text-lg font-medium text-gray-900">Something went wrong</h2>
                            <p className="text-sm text-gray-400">Payment may still be processing.</p>
                            <p className="text-xs text-gray-300 mt-2">Redirecting to your bookings...</p>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default PaymentSuccess;