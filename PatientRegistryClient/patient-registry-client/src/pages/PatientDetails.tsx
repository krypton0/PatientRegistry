import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PATIENT_DETAILS, UPDATE_PATIENT, ADD_DIAGNOSTIC } from '../graphql/queries';

const PatientDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const patientDetailsQuery: any = useQuery(GET_PATIENT_DETAILS, { variables: { id: +(id!) } });

    // States for form inputs
    const [patientName, setPatientName] = useState(patientDetailsQuery.data?.patient?.name || '');
    const [patientAge, setPatientAge] = useState(patientDetailsQuery.data?.patient?.age || 0);
    const [newDiagnosis, setNewDiagnosis] = useState('');

    // Mutations for updating patient and adding diagnostic
    const [updatePatient] = useMutation(UPDATE_PATIENT);
    const [addDiagnostic] = useMutation(ADD_DIAGNOSTIC);

    if (patientDetailsQuery.loading) return <p className="text-blue-500">Loading...</p>;
    if (patientDetailsQuery.error) return <p className="text-red-500">Error: {patientDetailsQuery.error.message}</p>;

    const patient = patientDetailsQuery.data?.patient;

    // Update patient details handler
    const handleUpdatePatient = async () => {
        if (!patientName || patientAge <= 0) return; // basic validation

        try {
            await updatePatient({
                variables: {
                    patientInput: {
                        id: +(patient?.id),
                        name: patientName,
                        age: patientAge
                    }
                }
            });
        } catch (e) {
            alert('Error updating patient details');
        }
    };

    // Add new diagnostic handler
    const handleAddDiagnostic = async () => {
        if (!newDiagnosis) return;

        try {
            await addDiagnostic({
                variables: {
                    id: +(patient?.id),
                    diagnosis: newDiagnosis
                },
            });
            setNewDiagnosis(''); // clear input after successful add
            alert('Diagnostic added');
        } catch (e) {
            alert('Error adding diagnostic');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">{patient?.name}</h1>

            {/* Update Patient Form */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Update Patient Details</h2>
                <div className="space-y-2">
                    <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Patient Name"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        value={patientAge}
                        onChange={(e) => setPatientAge(+e.target.value)}
                        placeholder="Patient Age"
                        className="w-full p-2 border rounded"
                    />
                    <button
                        onClick={handleUpdatePatient}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Update Patient
                    </button>
                </div>
            </div>

            {/* Diagnosis History */}
            <h2 className="text-2xl font-semibold mt-6">Diagnosis History</h2>
            <ul className="space-y-2 mt-2">
                {patient?.diagnostics.map((diagnostic: any, index: number) => (
                    <li key={index} className="p-2 bg-gray-100 rounded shadow">
                        <p>{diagnostic.date}: {diagnostic.diagnosis}</p>
                    </li>
                ))}
            </ul>

            {/* Add New Diagnostic */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Add New Diagnosis</h2>
                <div className="space-y-2">
                    <textarea
                        value={newDiagnosis}
                        onChange={(e) => setNewDiagnosis(e.target.value)}
                        placeholder="Diagnosis"
                        className="w-full p-2 border rounded"
                    />
                    <button
                        onClick={handleAddDiagnostic}
                        className="bg-green-500 text-white p-2 rounded"
                    >
                        Add Diagnosis
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientDetails;