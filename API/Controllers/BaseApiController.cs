using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class BaseApiController : ControllerBase
    {
        private  IMediator _mediator;

        protected IMediator Mediator => _mediator ?? HttpContext.RequestServices.GetService<IMediator>();
        public BaseApiController(IMediator mediator)
        {
            _mediator = mediator;
        }

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if(result is null)
            {
                return NotFound();
            }

            if (result.IsSuccess && result.Value is not null)
            {
                return Ok(result.Value);
            }

            if (result.IsSuccess && result.Value is null)
            {
                return NotFound();
            }

            return BadRequest(result.Error);
        }
    }
}