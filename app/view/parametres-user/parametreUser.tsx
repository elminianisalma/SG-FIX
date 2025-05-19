'use client';

export default function ParametreUser() {
    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Paramètres utilisateur</h1>

            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input type="text" className="w-full border rounded-md px-3 py-2" placeholder="Votre nom" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full border rounded-md px-3 py-2" placeholder="email@exemple.com" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                    <input type="password" className="w-full border rounded-md px-3 py-2" placeholder="********" />
                </div>

                <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                    Enregistrer les modifications
                </button>
            </form>
        </div>
    );
}
