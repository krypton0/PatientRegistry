using Microsoft.EntityFrameworkCore;
using PatientRegistryApi.Models;

namespace PatientRegistryApi.GraphQL
{
    public class Queries
    {
        public IEnumerable<Patient> GetPatients([Service] AppDbContext dbContext)
         => dbContext.Patients
                .Include(p => p.Diagnostics
                    .OrderByDescending(d => d.Date)
                    .Take(1)
                );

        public Patient? GetPatient(int id, [Service] AppDbContext dbContext)
            => dbContext.Patients
                .Include(p => p.Diagnostics)
                .FirstOrDefault(p => p.Id == id);
    }
}
