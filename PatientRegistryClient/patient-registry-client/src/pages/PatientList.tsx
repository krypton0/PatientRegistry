import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PATIENTS, GetPatientsData } from '../graphql/queries';

const PatientList: React.FC = () => {

    const { loading: queryLoading, error: queryError, data: queryData } = useQuery<GetPatientsData>(GET_PATIENTS);

    const ADD_PATIENT = gql`
      mutation AddPatient($patientInput: PatientInput!, $diagnosis: String!) {
        addPatient(patientInput: $patientInput, diagnosis: $diagnosis) {
          id
          name
          age
        }
      }
    `;

        const [formData, setFormData] = useState({ name: "", age: "", diagnosis: "" });

        // Initialize the mutation
        const [addPatient, { loading, error, data }] = useMutation(ADD_PATIENT);

        // Handle input changes
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        // Handle form submission
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            try {
                const response = await addPatient({
                    variables: {
                        patientInput: {
                            name: formData.name,
                            age: parseInt(formData.age, 10)
                        },
                        diagnosis: formData.diagnosis,
                    },
                });
            } catch (err) {
                console.error("Error while executing add patient:", err);
            }
        };

    

    if (queryLoading) return <p className="text-blue-500">Loading...</p>;
    if (queryError) return <p className="text-red-500">Error: {queryError.message}</p>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Patients</h1>
            <ul className="space-y-4">
                {queryData?.patients.map((patient) => (
                    <li
                        key={patient.id}
                        className="p-4 bg-white shadow rounded flex justify-between items-center"
                    >
                        <div>
                            <p className="text-xl font-semibold">{patient.name}</p>
                            <p>Age: {patient.age}</p>
                            <p>Last Diagnosis: {patient.diagnostics[0]?.diagnosis}</p>
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
            <h2 className="text-2xl font-bold mb-4">Add Patient</h2>
            <div>
                <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-4">
                    <label className="w-48 flex flex-col">
                        Name:
                        <input type="text" onChange={handleChange} name="name" className="border rounded px-2 py-1" />
                    </label>
                    <label className="w-48 flex flex-col">
                        Age:
                        <input type="text" onChange={handleChange} name="age" className="border rounded px-2 py-1" />
                    </label>
                    <label className="w-48 flex flex-col">
                        Diagnosis:
                        <input type="text" onChange={handleChange} name="diagnosis" className="border rounded px-2 py-1" />
                    </label>
                    <input
                        type="submit"
                        value="Submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    />
                </form>
            </div>
        </div>
    );
};

export default PatientList;
