import React from 'react';

const ReassignModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-lg bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
                <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2 className="text-3xl font-semibold mb-6">Réaffecter l’incident</h2>
                <p className="text-sm text-gray-600 mb-3">Lien du document</p>
                <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-md">
                    <input
                        type="text"
                        readOnly
                        value="https://jazzy.com/invite/59c4fedc13694"
                        className="bg-transparent w-full outline-none text-sm"
                    />
                    <button className="ml-3 text-blue-600 text-sm hover:underline">Copier</button>
                </div>

                <input
                    type="email"
                    placeholder="Inviter un collègue"
                    className="w-full mt-5 px-5 py-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <h3 className="mt-8 mb-4 font-medium text-sm text-gray-700">Destinataires</h3>
                <div className="space-y-5 text-sm">
                    {[
                        { name: "Floyd Miles", email: "floydmiles@gmail.com", role: "Owner" },
                        { name: "Jane Cooper", email: "janecooper@gmail.com", role: "Can edit" },
                        { name: "Jessica Bell", email: "jessicabell@gmail.com", role: "Can view" },
                    ].map((user, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-gray-500 text-xs">{user.email}</p>
                            </div>
                            <select className="border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option>Owner</option>
                                <option>Can edit</option>
                                <option>Can view</option>
                            </select>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReassignModal;
