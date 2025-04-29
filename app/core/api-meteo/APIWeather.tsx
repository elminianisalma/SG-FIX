import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/core/SideBar/Sidebar';
import { FaCloudSun, FaCloudShowersHeavy, FaBolt } from 'react-icons/fa';

const apiNames = ['API 1', 'API 2', 'API 3', 'API 4'];

const getStatus = () => apiNames.map(name => {
    const isOK = Math.random() > 0.2;
    const status = isOK ? 'OK' : 'KO';
    const icon = isOK ? FaCloudSun : Math.random() > 0.5 ? FaCloudShowersHeavy : FaBolt;

    return {
        name,
        status,
        responseTime: Math.floor(Math.random() * 200) + 50,
        icon
    };
});

export default function APIWeather() {
    const [apiData, setApiData] = useState(getStatus());

    useEffect(() => {
        const interval = setInterval(() => {
            setApiData(getStatus());
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-16 sm:ml-48 w-full p-8 bg-white min-h-screen">
                <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-10 drop-shadow-md">🌦️ Météo des API</h1>

                <div className="flex flex-col gap-6">
                    {apiData.map(api => {
                        const WeatherIcon = api.icon;
                        return (
                            <div key={api.name} className="flex items-center bg-white border rounded-xl shadow-md px-6 py-4 hover:scale-[1.02] transition-transform duration-300">
                                <div className="w-20 flex justify-start">
                                    <WeatherIcon className={`text-5xl ${api.status === 'OK' ? 'text-green-500' : 'text-red-500'}`} />
                                </div>
                                <div className="flex flex-col ml-4">
                                    <h2 className="text-xl font-semibold text-gray-800">{api.name}</h2>
                                    <p className="text-gray-600">Statut : <span className={`font-bold ${api.status === 'OK' ? 'text-green-600' : 'text-red-600'}`}>{api.status}</span></p>
                                    <p className="text-gray-600">Temps de réponse : {api.responseTime} ms</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
