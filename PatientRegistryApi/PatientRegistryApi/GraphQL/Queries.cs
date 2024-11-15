using PatientRegistryApi.Models;

namespace PatientRegistryApi.GraphQL
{
    public class Queries
    {
        // TODO cleanUp
        public IEnumerable<Patient> GetPatients([Service] AppDbContext dbContext) => dbContext.Patients;
        //new List<Patient>
        //{
        //    new Patient { Id = 1, Name = "John Doe", Age = 30, Diagnosis = "Diabetes" },
        //    new Patient { Id = 2, Name = "Jane Smith", Age = 45, Diagnosis = "Hypertension" }
        //};

        public Patient? GetPatient(int id, [Service] AppDbContext dbContext) =>
            dbContext.Patients.FirstOrDefault(p => p.Id == id);
            //new Patient { Id = id, Name = "John Doe", Age = 30, Diagnosis = "Diabetes" };
    }
}
