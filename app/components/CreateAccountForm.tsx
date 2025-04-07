'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CreateAccountForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        // Ici, tu ajouterais la logique d'enregistrement de l'utilisateur
        // Cela pourrait impliquer une requête API vers ton backend

        console.log('Tentative de création de compte avec:', { email, password });

        // Exemple de redirection après une inscription réussie
        // Remplace '/dashboard' par la page vers laquelle tu souhaites rediriger l'utilisateur
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen flex justify-center items-center py-12 bg-gray-100">
            <div className="relative bg-white shadow-xl rounded-lg overflow-hidden md:max-w-md">
                <div className="absolute top-4 left-4">
                    <Link href="/" className="flex items-center">
                        <span className="font-bold text-xl text-gray-800">YourBrand</span> {/* Replace with your brand name/logo */}
                    </Link>
                </div>
                <div className="bg-white p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create an account</h2>
                    <p className="text-gray-600 mb-6">Join our community!</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                        <div>
                            <button
                                type="submit"
                                className="w-full rounded-md shadow-sm py-3 bg-blue-500 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
                <div className="bg-gray-50 px-8 py-4 text-center text-sm text-gray-500">
                    Already have an account? <Link href="/login" className="font-semibold text-primary-600 focus:outline-none focus:underline">Sign in</Link>
                </div>
                <div className="bg-gray-100 px-8 py-3 text-center text-xs text-gray-400">
                    Terms & Conditions
                </div>
            </div>
        </div>
    );
};

export default CreateAccountForm;