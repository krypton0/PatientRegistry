using Microsoft.EntityFrameworkCore;
using PatientRegistryApi.Dtos;
using PatientRegistryApi.Models;

namespace PatientRegistryApi.GraphQL
{
    public class Mutations
    {
        // TODO Add documentation

        public async Task<Patient> AddPatient(PatientInput patientInput, string diagnosis, [Service] AppDbContext dbContext)
        {
            // TODO throw API exceptions
            var diagnostic = new Diagnostic()
            {
                Diagnosis = diagnosis
            };

            var patient = new Patient
            {
                Name = patientInput.Name,
                Age = patientInput.Age ?? 0,
                Diagnostics = new List<Diagnostic>() { diagnostic }
            };

            dbContext.Patients.Add(patient);
            await dbContext.SaveChangesAsync();
            return patient;
        }

        public async Task<Patient?> UpdatePatient(PatientInput patientInput, [Service] AppDbContext dbContext)
        {
            var patient = await dbContext.Patients.FirstOrDefaultAsync(p => p.Id == patientInput.Id);

            if (patient == default)
                return default;

            // TODO throw API exceptions
            patient.Name = patientInput.Name ?? "";
            patient.Age = patientInput.Age ?? 0;

            await dbContext.SaveChangesAsync();
            return patient;
        }

        public async Task<Patient?> AddDiagnostic(int id, string diagnosis, [Service] AppDbContext dbContext)
        {
            var patient = await dbContext.Patients.FirstOrDefaultAsync(p => p.Id == id);

            if (patient == default)
                return default;

            patient.Diagnostics.Add(new() { Diagnosis = diagnosis });

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
