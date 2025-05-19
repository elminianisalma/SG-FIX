'use client';

export default function FAQ() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">FAQ – Questions fréquentes</h1>
            <ul className="space-y-4">
                <li className="bg-white rounded-lg shadow p-4">
                    <h2 className="font-semibold text-red-600">Comment créer un incident ?</h2>
                    <p className="text-gray-600 mt-2">Rendez-vous dans la section "Créer un incident" sur la page d’accueil.</p>
                </li>
                <li className="bg-white rounded-lg shadow p-4">
                    <h2 className="font-semibold text-red-600">Puis-je modifier un incident après création ?</h2>
                    <p className="text-gray-600 mt-2">Seuls les Team Leaders peuvent modifier les incidents assignés.</p>
                </li>
            </ul>
        </div>
    );
}
