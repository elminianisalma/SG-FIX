'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logoImage from '../../../public/images/logoImage.png';
import backgroundImage from '../../../public/images/background.jpg';
import {height} from "@mui/system";

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const testEmail = 'test@example.com';
    const testPassword = 'password123';

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

            <div className="relative bg-white bg-opacity-100 shadow-lg rounded-2xl w-full max-w-4xl h-480 p-8 flex flex-col justify-between">
                <div className="flex flex-col items-center space-y-2 mb-4">
                    <Link href="/public" className="flex items-center no-underline">
                        <Image src={logoImage} alt="Logo" width={130} height={90} />
                    </Link>
                    <h2 className="text-xl font-bold text-gray-700">Sign in</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-base">
                    <div>
                        <label htmlFor="email" className="block text-base font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-base font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                title={showPassword ? 'Hide password' : 'Show password'}
                                className="absolute inset-y-0 right-2 text-gray-500 text-base"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-red-500 text-white text-base font-semibold py-2 shadow hover:bg-red-600 transition"
                    >
                        Sign in
                    </button>
                </form>

                <div className="text-center text-gray-400 text-xs mt-2">
                    Terms & Conditions
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default SignInForm;
