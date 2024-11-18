import { gql } from '@apollo/client';

export const GET_PATIENTS = gql`
  query GetPatients {
    patients {
      id
      name
      age
      diagnostics {
          date
          diagnosis
      }
    }
  }
`;

export const GET_PATIENT_DETAILS = gql`
  query GetPatient($id: Int!) {
    patient(id: $id) {
      id
      name
      age
      diagnostics {
        date
        diagnosis
      }
    }
  }
`;

//export const UPDATE_PATIENT = gql`{}`;
//export const ADD_DIAGNOSTIC = gql`{}`;
//export const ADD_PATIENT = gql`{}`;

export const UPDATE_PATIENT = gql`
  mutation UpdatePatient($patientInput: PatientInput!) {
    updatePatient(patientInput: $patientInput) {
      id
      name
      age
    }
  }
`;

export const ADD_DIAGNOSTIC = gql`
  mutation AddDiagnostic($id: Int!, $diagnosis: String!) {
    addDiagnostic(id: $id, diagnosis: $diagnosis) {
      id
      diagnosis
      date
    }
}
`;

export const ADD_PATIENT = gql`
  mutation AddPatient($patientInput: PatientInput!, $diagnosis: String!) {
  addPatient(patientInput: $patientInput, diagnosis: $diagnosis) {
      id
      name
      age
    }
  }
`;

export interface Patient {
  id: number;
  name: string;
  age: number;
  diagnostics: Diagnostics[];
}

export interface GetPatientsData {
  patients: Patient[];
}




export interface Diagnostics {
  id: number,
  date: string;
  diagnosis: string;
}

export interface PatientDetailsData {
  patient: {
    id: number;
    name: string;
    age: number;
    diagnostics: Diagnostics[];
  };
}

export interface PatientDetailsVars {
  id: number;
}