'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import logoImage from '../../../public/images/logoImage.png';
import backgroundImage from '../../../public/images/background.jpg';

const users = [
    { email: 'admin@sgfix.com', password: 'admin123', role: 'Admin' },
    { email: 'dev@sgfix.com', password: 'dev123', role: 'Développeur' },
    { email: 'ba@sgfix.com', password: 'ba123', role: 'Business Analyst' },
    { email: 'user@sgfix.com', password: 'user123', role: 'Utilisateur' },
];

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<null | 'loading' | 'error'>(null);

    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setStatus(null);

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            setStatus('loading');

            const roleToRoute: Record<string, string> = {
                'Admin': '/view/Admin-homePage',
                'Développeur': '/view/dev-homepage',
                'Business Analyst': '/view/BA-homepage',
                'Utilisateur': '/view/homePage', // ✅ Chemin corrigé
            };

            localStorage.setItem('userRole', user.role);

            setTimeout(() => {
                setStatus(null);
                const destination = roleToRoute[user.role] || '/view/homePage';
                router.push(destination);
            }, 3000);
        } else {
            setStatus('error');
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

            <div className="relative bg-white bg-opacity-100 shadow-lg rounded-2xl w-full max-w-4xl h-[500px] p-6 flex flex-col justify-between">
                <div className="flex flex-col items-center mb-4">
                    <Link href="/public" className="flex items-center no-underline">
                        <Image src={logoImage} alt="Logo" width={300} height={250} />
                    </Link>
                    <div className="h-4" />
                    <h2 className="text-[18px] font-bold text-gray-700">Sign in</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 text-[18px]">
                    <div className="pb-2">
                        <label htmlFor="email" className="block text-[18px] font-medium text-gray-700 pb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="block w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 text-[18px]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="pb-2">
                        <label htmlFor="password" className="block text-[18px] font-medium text-gray-700 pb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="block w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 text-[18px]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                title={showPassword ? 'Hide password' : 'Show password'}
                                className="absolute inset-y-0 right-3 text-gray-500 text-[18px]"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-red-500 text-white text-[18px] font-semibold py-3 shadow hover:bg-red-600 transition"
                    >
                        Sign in
                    </button>
                </form>

                {status === 'loading' && (
                    <div className="absolute bottom-0 left-0 w-full h-2 overflow-hidden">
                        <div
                            className="h-full bg-green-500"
                            style={{
                                width: '0%',
                                animation: 'loadBar 3s ease-in-out forwards',
                            }}
                        />
                        <style jsx>{`
                            @keyframes loadBar {
                                0% { width: 0%; }
                                100% { width: 100%; }
                            }
                        `}</style>
                    </div>
                )}

                {status === 'error' && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded-md flex items-center shadow-md border border-red-300 text-sm">
                        <svg className="h-4 w-4 mr-2 fill-red-600" viewBox="0 0 20 20">
                            <path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zM9 4h2v6H9V4zm0 8h2v2H9v-2z" />
                        </svg>
                        Email ou mot de passe incorrect
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignInForm;