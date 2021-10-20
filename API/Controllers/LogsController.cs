using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Logs;
using MediatR;

namespace API.Controllers
{
    public class LogsController : BaseApiController
    {
        public LogsController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        public async Task<ActionResult<List<Log>>> GetAllLogs()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Log>> GetLog(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateLog([FromBody]Log log)
        {
            return Ok(await Mediator.Send(new Create.Command{Log = log}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLog(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditLog(Guid id, Log log)
        {
            return Ok(await Mediator.Send(new Edit.Command{Log = log}));
        }

    }
}