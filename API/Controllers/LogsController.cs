using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Logs;
using MediatR;
using Application.Core;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class LogsController : BaseApiController
    {
        public LogsController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("getLogs/{userId}")]
        public async Task<IActionResult> GetAllLogs(string userId)
        {
            return HandleResult(await Mediator.Send(new List.Query { UserId = userId }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLog(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [Authorize]
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

        //[HttpGet("/monthlyLogQuantity")]
        //public async Task<IActionResult> GetMonthlyLogQuantities()
        //{
            //return HandleResult(await Mediator.Send(new MonthlyLogQuantities.Query()));
        //}

    }
}