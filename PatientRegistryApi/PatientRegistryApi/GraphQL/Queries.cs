using PatientRegistryApi.Models;

namespace PatientRegistryApi.GraphQL
{
    public class Queries
    {
        public IEnumerable<Patient> GetPatients([Service] AppDbContext dbContext)
            => dbContext.Patients;

        public Patient? GetPatient(int id, [Service] AppDbContext dbContext)
            => dbContext.Patients.FirstOrDefault(p => p.Id == id);
    }
}
