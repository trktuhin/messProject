using AutoMapper;
using MessDotCity.API.Data.Resource;
using MessDotCity.API.Models;

namespace MessDotCity.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {   
            CreateMap<UserInfo, UserProfileResource>();
            CreateMap<UserProfileResource, UserInfo>();
        }
    }
}