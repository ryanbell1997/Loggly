using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Logs;
using MediatR;
using Application.Core;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

namespace API.Controllers
{
    public class LogsController : BaseApiController
    {
        private readonly IMapper _mapper;

        public LogsController(IMediator mediator, IMapper mapper) : base(mediator)
        {
            _mapper = mapper;
        }

        [HttpGet()]
        public async Task<IActionResult> GetAllLogs([FromQuery] bool getCurrentMonth)
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("getLog/{id}")]
        public async Task<IActionResult> GetLog(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateLog([FromBody] LogDTO logDTO)
        {
            //return HandleResult(await Mediator.Send(new Create.Command{Log = logDTO.Log, TagIds = logDTO.TagIds }));
            Log eLog = new();
            return HandleResult(await Mediator.Send(new Create.Command { Log = _mapper.Map(logDTO, eLog) }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLog(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditLog(Guid id, Log log)
        {
            return HandleResult(await Mediator.Send(new Edit.Command{Log = log}));
        }

        [HttpGet("getLogsByDate/{monthYear}")]
        public async Task<IActionResult> GetLogsByDate(DateTime monthYear)
        {
            return HandleResult(await Mediator.Send(new GetLogsByDate.Command { MonthYear = monthYear}));
        }

        [HttpGet("/monthlyLogQuantity")]
        public async Task<IActionResult> GetMonthlyLogQuantities()
        {
            return HandleResult(await Mediator.Send(new MonthlyLogQuantities.Query()));
        }

    }
}