using Microsoft.EntityFrameworkCore;
using PatientRegistryApi.Models;

namespace PatientRegistryApi
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }
    }
}
