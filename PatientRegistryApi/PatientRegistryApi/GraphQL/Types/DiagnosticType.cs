using PatientRegistryApi.Models;

namespace PatientRegistryApi.GraphQL.Types
{
    public class DiagnosticType : ObjectType<Diagnostic>
    {
        protected override void Configure(IObjectTypeDescriptor<Diagnostic> descriptor)
        {
            descriptor.Field(d => d.Id).Type<IdType>();
            descriptor.Field(d => d.Date).Type<DateTimeType>();
            descriptor.Field(d => d.Diagnosis).Type<StringType>();
        }
    }
}
