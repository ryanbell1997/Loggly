using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.UserConfigs;
using MediatR;

namespace API.Controllers
{
    public class UserConfigController : BaseApiController
    {
        public UserConfigController(IMediator mediator) : base(mediator)
        {
        }

        //Admin only user config
        [HttpGet]
        public async Task<ActionResult<List<UserConfig>>> GetAllUserConfigs()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserConfig>> GetUserConfig(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserConfig([FromBody] UserConfig userConfig)
        {
            return Ok(await Mediator.Send(new Create.Command { UserConfig = userConfig }));
        }

        //Admin Only attribute
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserConfig(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditUserConfig(Guid id, UserConfig userConfig)
        {
            return Ok(await Mediator.Send(new Edit.Command { UserConfig = userConfig }));
        }

    }
}