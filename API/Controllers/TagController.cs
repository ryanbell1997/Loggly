using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Tags;
using MediatR;
using Application.Core;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class TagController : BaseApiController
    {
        public TagController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAllTags(string userId)
        {
            return HandleResult(await Mediator.Send(new List.Query { UserId = userId }));
        }

        [HttpGet("getTag/{id}")]
        public async Task<IActionResult> GetTag(Guid id)
        {
            return HandleResult(await Mediator.Send(new Get.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTag([FromBody] Tag tag)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Tag = tag }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTag([FromRoute]Guid id, Tag tag)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Tag = tag }));
        }
    }
}