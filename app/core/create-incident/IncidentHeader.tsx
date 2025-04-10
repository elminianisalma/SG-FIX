interface IncidentHeaderProps {
    step: number;
}

const IncidentHeader = ({ step }: IncidentHeaderProps) => (
    <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-10 items-center">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
            {step === 1 ? "📝 Incident Declaration" : "👤 Assign Incident"}
        </h1>
    </div>
);

export default IncidentHeader;
