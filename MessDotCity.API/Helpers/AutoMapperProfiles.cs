using System;
using AutoMapper;
using MessDotCity.API.Data.Resource;
using MessDotCity.API.Dtos;
using MessDotCity.API.Models;

namespace MessDotCity.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {   
            CreateMap<UserInfo, UserProfileResource>();
            CreateMap<UserProfileResource, UserInfo>();
            CreateMap<ProfileSubmitDto, UserInfo>();
            CreateMap<MessCreationDto, MessInfo>();
            CreateMap<MessInfo, MessResource>();
            CreateMap<Member, MemberResource>();
            CreateMap<NoticeCreationDto, Notice>();
            CreateMap<MemberCreationDto, Member>();
            CreateMap<FixedExpenseDto, FixedExpense>()
                .ForMember(des => des.Id, opt => opt.Ignore());

            CreateMap<SessionDto, SessionInfo>()
                .ForMember(des => des.Id, opt => opt.Ignore());
                
            CreateMap<MessUpdateDto, MessInfo>()
                .ForMember(des => des.MealChangeFrom, 
                opt => opt.Condition(source => source.MealChangeFrom != null))
                .ForMember(des => des.MealChangeTo, 
                opt => opt.Condition(source => source.MealChangeTo != null));

            CreateMap<UserInfo, Member>()
                .ForMember(des => des.PhotoName, opt => {
                    opt.MapFrom(src => src.PhotoUrl);
                });
        }
    }
}