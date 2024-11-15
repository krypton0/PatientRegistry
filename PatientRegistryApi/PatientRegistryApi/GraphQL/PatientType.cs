using PatientRegistryApi.Models;

namespace PatientRegistryApi.GraphQL
{
    public class PatientType : ObjectType<Patient>
    {
        protected override void Configure(IObjectTypeDescriptor<Patient> descriptor)
        {
            descriptor.Field(p => p.Id).Type<IdType>();
            descriptor.Field(p => p.Name).Type<StringType>();
            descriptor.Field(p => p.Age).Type<IntType>();
            descriptor.Field(p => p.Diagnosis).Type<StringType>();
        }
    }
}
