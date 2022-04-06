//using Domain;
//using System;
//using System.Collections.Generic;

//namespace API.DTOs
//{
//    public class LogDTO
//    {
//        public Guid Id { get; set; }
//        public DateTime Date { get; set; }
//        public TimeSpan StartTime { get; set; }
//        public TimeSpan EndTime { get; set; }
//        public TimeSpan TotalTime { get; set; }
//        public decimal HourlyRate { get; set; }
//        public decimal TotalCharged { get; set; }
//        public bool is_overtime { get; set; }
//        public List<string> TagIds { get; set; }

//        public Log MapToLog(LogDTO logDTO)
//        {
//            Log log = new();

//            if(logDTO is not null)
//            {
//                log.Id = logDTO.Id;
//                log.Date = logDTO.Date;
//                log.StartTime = logDTO.StartTime;
//                log.EndTime = logDTO.EndTime;
//                log.TotalTime = logDTO.TotalTime;
//                log.HourlyRate = logDTO.HourlyRate;
//                log.TotalCharged = logDTO.TotalCharged;
//                log.is_overtime = logDTO.is_overtime;
                
//                if(logDTO.TagIds is not null)
//                {
//                    log.LinkLogTags = new List<LinkLogTag>();

//                    foreach(string tag in logDTO.TagIds)
//                    {
//                        log.LinkLogTags.Add(new LinkLogTag { LogId = log.Id, TagId = Guid.Parse(tag) });
//                    }
//                }
//            }

//            return log;
//        }
//    }
//}
