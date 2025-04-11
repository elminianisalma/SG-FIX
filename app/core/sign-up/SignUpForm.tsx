'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logoImage from '../../../public/images/logoImage.png';
import backgroundImage from '../../../public/images/background.jpg';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const formContainerRef = useRef<HTMLDivElement>(null);
    const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

    const testEmail = 'test@example.com';
    const testPassword = 'password123';

    useEffect(() => {
        const updateSize = () => {
            if (formContainerRef.current) {
                setContainerSize({
                    width: formContainerRef.current.offsetWidth,
                    height: formContainerRef.current.offsetHeight,
                });
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (email === testEmail && password === testPassword) {
            toast.success("Connexion réussie!");
            router.push('/core/incident-list');
        } else {
            toast.error("Email ou mot de passe incorrect");
        }
    };

    return (
        <div className="relative min-h-screen flex justify-center items-center">
            <div className="absolute inset-0 -z-10">
                <Image
                    src={backgroundImage}
                    alt="Background"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <div
                ref={formContainerRef}
                className="relative bg-white bg-opacity-90 shadow-lg rounded-2xl w-[400px] sm:w-[360px] p-6"
            >
                <div className="flex flex-col items-center justify-center space-y-2 mb-3">
                    <Link href="/public" className="flex items-center no-underline">
                        <Image src={logoImage} alt="Logo" width={150} height={100} />
                    </Link>
                    <h2 className="text-sm font-semibold text-gray-700 mt-3">Sign in</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                title={showPassword ? 'Hide password' : 'Show password'}
                                className="absolute inset-y-0 right-1 pr-2 text-xs text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-red-500 text-white text-sm font-medium py-1.5 shadow hover:bg-red-600 transition"
                    >
                        Sign in
                    </button>
                </form>


                <div className="text-center text-gray-400 mt-2" style={{ fontSize: '8px' }}>
                    Terms & Conditions
                </div>
            </div>

            {/* ToastContainer pour afficher les notifications */}
            <ToastContainer />
        </div>
    );
};

export default SignInForm;