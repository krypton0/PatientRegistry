namespace PatientRegistryApi.Models
{
    public class Diagnostic
    {
        public int Id { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string? Diagnosis { get; set; }

        // Foreign Key
        public int PatientId { get; set; }
        public Patient Patient { get; set; } = null!;
    }
}
