using Microsoft.EntityFrameworkCore;
using PatientRegistryApi.Dtos;
using PatientRegistryApi.Models;

namespace PatientRegistryApi.GraphQL
{
    public class Mutations
    {
        // TODO Add documentation

        public async Task<Patient> AddPatient(PatientDto patientDto, [Service] AppDbContext dbContext)
        {
            // TODO throw API exceptions
            var patient = new Patient
            {
                Name = patientDto.Name,
                Age = patientDto.Age ?? 0
            };

            dbContext.Patients.Add(patient);
            await dbContext.SaveChangesAsync();
            return patient;
        }

        public async Task<Patient?> UpdatePatient(PatientDto patientDto, [Service] AppDbContext dbContext)
        {
            var patient = await dbContext.Patients.FirstOrDefaultAsync(p => p.Id == patientDto.Id);

            if (patient == default)
                return default;

            // TODO throw API exceptions
            patient.Name = patientDto.Name ?? "";
            patient.Age = patientDto.Age ?? 0;

            await dbContext.SaveChangesAsync();
            return patient;
        }

        public async Task<bool> DeletePatient(int id, [Service] AppDbContext dbContext)
        {
            // TODO throw API exceptions
            var patient = await dbContext.Patients
                .Include(p => p.Diagnostics)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (patient == null)
                return false;

            dbContext.Diagnostics.RemoveRange(patient.Diagnostics);
            dbContext.Patients.Remove(patient);
            await dbContext.SaveChangesAsync();

            return true;
        }
    }
}
