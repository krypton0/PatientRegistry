import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PATIENTS, GetPatientsData } from '../graphql/queries';

const PatientList: React.FC = () => {
    const { loading, error, data } = useQuery<GetPatientsData>(GET_PATIENTS);

    if (loading) return <p className="text-blue-500">Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Patients</h1>
            <ul className="space-y-4">
                {data?.patients.map((patient) => (
                    <li
                        key={patient.id}
                        className="p-4 bg-white shadow rounded flex justify-between items-center"
                    >
                        <div>
                            <p className="text-xl font-semibold">{patient.name}</p>
                            <p>Age: {patient.age}</p>
                            <p>Last Diagnosis: {patient.diagnosis}</p>
                        </div>
                        <Link
                            to={`/patients/${patient.id}`}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                            View Details
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientList;
