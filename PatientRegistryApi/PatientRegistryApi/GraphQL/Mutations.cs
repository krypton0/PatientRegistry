using PatientRegistryApi.Models;

namespace PatientRegistryApi.GraphQL
{
    public class Mutations
    {
        // TODO Add to DB
        private readonly List<Patient> _patients = new List<Patient>();

        public Patient AddPatient(string name, int age, string diagnosis)
        {
            var patient = new Patient { Id = _patients.Count + 1, Name = name, Age = age, Diagnosis = diagnosis };
            _patients.Add(patient);
            return patient;
        }
    }
}
