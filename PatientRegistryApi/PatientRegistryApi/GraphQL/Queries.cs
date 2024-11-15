using PatientRegistryApi.Models;

namespace PatientRegistryApi.GraphQL
{
    public class Queries
    {
        public IEnumerable<Patient> GetPatients() =>
            new List<Patient>
            {
                new Patient { Id = 1, Name = "John Doe", Age = 30, Diagnosis = "Diabetes" },
                new Patient { Id = 2, Name = "Jane Smith", Age = 45, Diagnosis = "Hypertension" }
            };

        public Patient GetPatient(int id) =>
            new Patient { Id = id, Name = "John Doe", Age = 30, Diagnosis = "Diabetes" };
    }
}
