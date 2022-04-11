using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Logs;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Log, Log>();
            CreateMap<Tag, Tag>();
            CreateMap<Log, LogDTO>()
                .ForMember(dest => dest.TagIds, o => o.MapFrom(s => s.LinkLogTags.Select(l => l.TagId.ToString().ToLower())));
            CreateMap<LogDTO, Log>()
                .ForMember(dest => dest.LinkLogTags, o => o.MapFrom(s => s.TagIds.Select(tagId => new LinkLogTag
                {
                    LogId = s.Id,
                    TagId = Guid.Parse(tagId),
                    UserId = s.UserId
                })));
        }
    }
}