using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Logs;
using MediatR;
using Application.Core;

namespace API.Controllers
{
    public class LogsController : BaseApiController
    {
        public LogsController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLogs()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLog(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateLog([FromBody]Log log)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Log = log}));
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

        [HttpGet("/{monthYear}")]
        public async Task<IActionResult> GetLogsByDate(DateTime monthYear)
        {
            return HandleResult(await Mediator.Send(new GetLogsByDate.Command { MonthYear = monthYear}));
        }

    }
}