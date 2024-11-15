import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
    GET_PATIENT_DETAILS,
    PatientDetailsData,
    PatientDetailsVars,
} from '../graphql/queries';

const PatientDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { loading, error, data } = useQuery<PatientDetailsData, PatientDetailsVars>(
        GET_PATIENT_DETAILS,
        { variables: { id: id! } }
    );

    if (loading) return <p className="text-blue-500">Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    const patient = data?.patient;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">{patient?.name}</h1>
            <p className="text-lg">Age: {patient?.age}</p>
            <h2 className="text-2xl font-semibold mt-6">Diagnosis History</h2>
            <ul className="space-y-2 mt-2">
                {patient?.diagnosisHistory.map((history, index) => (
                    <li key={index} className="p-2 bg-gray-100 rounded shadow">
                        <p>{history.date}: {history.diagnosis}</p>
                    </li>
                ))}
            </ul>
            <h2 className="text-2xl font-semibold mt-6">Examination Image</h2>
            {patient?.examinationImageUrl && (
                <img
                    src={patient.examinationImageUrl}
                    alt="Examination"
                    className="mt-4 max-w-full h-auto rounded shadow"
                />
            )}
        </div>
    );
};

export default PatientDetails;
