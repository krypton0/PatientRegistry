namespace PatientRegistryApi.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }

        public List<Diagnostic> Diagnostics { get; set; } = new List<Diagnostic>();
    }
}
