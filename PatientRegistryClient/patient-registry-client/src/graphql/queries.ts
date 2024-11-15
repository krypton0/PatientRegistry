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
    id: string;
    name: string;
    age: number;
    diagnostics: Diagnosis[]; // TODO rename type to diagnostics
}

export interface GetPatientsData {
    patients: Patient[];
}


export const GET_PATIENT_DETAILS = gql`
  query GetPatientDetails($id: ID!) {
    patient(id: $id) {
      id
      name
      age
      diagnosisHistory {
        date
        diagnosis
      }
      examinationImageUrl
    }
  }
`;

export interface Diagnosis {
    id: number,
    date: string;
    diagnosis: string;
}

export interface PatientDetailsData {
    patient: {
        id: string;
        name: string;
        age: number;
        diagnosisHistory: Diagnosis[];
        examinationImageUrl: string;
    };
}

export interface PatientDetailsVars {
    id: string;
}