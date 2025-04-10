'use client';

import SearchPeople from "@/app/core/create-incident/SearchPeople";

interface AssignIncidentProps {
    answers: { [key: string]: string };
    onAnswerChange: (questionId: string, value: string) => void;
    onAssign: () => void;
}

const AssignIncident = ({ answers, onAnswerChange, onAssign }: AssignIncidentProps) => {
    return (
        <>
            <SearchPeople />



        </>
    );
};

export default AssignIncident;
