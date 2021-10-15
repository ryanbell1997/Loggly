using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LogsController : BaseApiController
    {
        private readonly DataContext _context;
        public LogsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Log>>> GetAllLogs()
        {
            return await _context.Logs.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Log>> GetLog(Guid id)
        {
            return await _context.Logs.FindAsync(id);
        }

    }
}