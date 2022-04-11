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
            CreateMap<Log, LogDTO>();
        }
    }
}