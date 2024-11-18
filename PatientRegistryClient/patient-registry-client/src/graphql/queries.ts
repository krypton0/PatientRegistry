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

export interface Patient {
    id: number;
    name: string;
    age: number;
    diagnostics: Diagnostics[];
}

export interface GetPatientsData {
    patients: Patient[];
}


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