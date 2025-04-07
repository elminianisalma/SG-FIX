'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function IncidentForm() {
    const [answers, setAnswers] = useState<any>({});
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState<File[]>([]);

    const questions = [
        {
            id: 'api',
            text: 'Which API is concerned?',
            type: 'select',
            options: ['API 1', 'API 2', 'API 3', 'API 4'],
        },
        {
            id: 'environment',
            text: 'What is the environment?',
            type: 'radio',
            options: ['Prod', 'Dev', 'HF', 'HT'],
        },
        {
            id: 'severity',
            text: 'What is the severity level?',
            type: 'radio',
            options: ['High', 'Medium', 'Normal'],
        },
        {
            id: 'impactedFeatures',
            text: 'Which features are impacted?',
            type: 'text',
            placeholder: 'Describe the impacted features',
        },
        {
            id: 'description',
            text: 'Issue description:',
            type: 'textarea',
            placeholder: 'Describe the issue ',
        },
        {
            id: 'attachments',
            text: 'Attachments:',
            type: 'file',
        },
    ];

    const handleAnswerChange = (questionId: string, value: string | string[]) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: value,
        }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        if (input.split(' ').length <= 50) {
            setDescription(input);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles([...files, ...Array.from(e.target.files)]);
        }
    };

    const handleSubmit = () => {
        console.log('Answers submitted:', answers);
        console.log('Description:', description);
        console.log('Files:', files);
    };

    return (
        <>
            <Head>
                <title>Incident Management Platform</title>
            </Head>

            <div className="relative min-h-screen">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/background.jpg"
                        alt="background"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        className="opacity-100"
                    />
                </div>

                <div className="relative z-10 min-h-screen py-10 flex flex-col items-center justify-center">
                    <div className="backdrop-blur-xl bg-white/80 border border-gray-300 rounded-3xl shadow-2xl p-10 w-full max-w-3xl">
                        <div className="flex justify-start items-center mb-8">
                            <Image
                                src="/images/logo_rectangle.png"
                                alt="Logo Rectangle"
                                height={40}
                                width={100}
                            />
                            <h1 className="text-3xl font-bold text-red-700 ml-40">SG-FIX</h1>
                        </div>

                        <div className="mb-8 p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-inner border border-gray-300">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-gray-700">Section: Preliminary Report</span>
                                <button className="bg-gray-300 text-gray-800 hover:bg-gray-400 font-semibold py-2 px-4 rounded-lg">
                                    Edit & Save
                                </button>
                            </div>

                            {questions.map((question) => (
                                <div key={question.id} className="mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                        {question.text}
                                    </h2>

                                    {question.type === 'select' && (
                                        <select
                                            defaultValue=""
                                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                            className="shadow border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                                        >
                                            <option disabled value="">Select an API</option>
                                            {question.options.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    )}

                                    {question.type === 'radio' && (
                                        <>
                                            <div className="flex gap-4 p-4 border rounded-lg bg-gray-50">
                                                {question.options.map((option) => {
                                                    const isHighSeverity = option === 'High';
                                                    const selectedEnv = answers['environment'];
                                                    const shouldDisableHigh =
                                                        question.id === 'severity' &&
                                                        isHighSeverity &&
                                                        (selectedEnv === 'Dev' || selectedEnv === 'HF');

                                                    return (
                                                        <label
                                                            key={option}
                                                            className={`flex items-center text-gray-700 ${shouldDisableHigh ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name={question.id}
                                                                value={option}
                                                                disabled={shouldDisableHigh}
                                                                className="form-radio h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300"
                                                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                                            />
                                                            <span className="ml-2">{option}</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                            {/* Info message if "High" is disabled */}
                                            {question.id === 'severity' && (answers['environment'] === 'Dev' || answers['environment'] === 'HF') && (
                                                <p className="mt-2 text-sm text-red-600">
                                                    The severity level "High" is disabled for Dev or HF environment.
                                                </p>
                                            )}
                                        </>
                                    )}

                                    {question.type === 'text' && (
                                        <input
                                            type="text"
                                            className="shadow border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                                            placeholder={question.placeholder}
                                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                        />
                                    )}

                                    {question.type === 'textarea' && (
                                        <textarea
                                            className="shadow border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                                            placeholder={question.placeholder}
                                            value={description}
                                            onChange={handleDescriptionChange}
                                        />
                                    )}

                                    {question.type === 'file' && (
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            className="shadow border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                                        />
                                    )}
                                </div>
                            ))}

                            <div className="mt-8">
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl w-full transition duration-300 ease-in-out"
                                    onClick={handleSubmit}
                                >
                                    Submit Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
