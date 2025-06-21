export function Card({
  icon,
  title,
  description,
  bgColor,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor?: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 min-h-[160px]`}
    >
      <div className="flex items-start gap-4">
        {/* Icône dans fond doux */}
        <div className={`p-3 rounded-full ${bgColor ?? 'bg-gray-100'}`}>
          {icon}
        </div>

        {/* Contenu texte */}
        <div>
          <p className="text-lg font-semibold text-gray-900">{title}</p>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}
