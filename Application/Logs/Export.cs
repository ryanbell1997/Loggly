using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Utils;
using Domain;
using MediatR;
using Persistence;
using AutoMapper;
using FluentValidation;
using Application.Core;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Application.Logs.DTO;
using System.IO;
using OfficeOpenXml;

namespace Application.Logs
{
    public class Export
    {
        public class Command : IRequest<Result<Stream>>
        {
            public ExportDTO ExportDTO { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                
            }
        }

        public class Handler : IRequestHandler<Command, Result<Stream>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Stream>> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == _userAccessor.GetUserId());

                if (user is null) return Result<Stream>.Failure("Failed to validate user Token");

                List<Log> lstLogs = await GetLogsForExport(request);

                if (lstLogs.Count <= 0) return Result<Stream>.Failure("No logs could be found with the provided parameters");

                MemoryStream stream = ConstructExcelStream(lstLogs);

                return Result<Stream>.Success(stream);
            }

            private static MemoryStream ConstructExcelStream(List<Log> lstLogs)
            {
                MemoryStream stream = new MemoryStream();

                using (ExcelPackage package = new ExcelPackage(stream))
                {
                    var workSheet = package.Workbook.Worksheets.Add("Logs");
                    workSheet.Cells.LoadFromCollection(lstLogs, true);
                    workSheet.Column(2).Style.Numberformat.Format = "d-mmm-yy";
                    workSheet.Column(3).Style.Numberformat.Format = "h:mm";
                    workSheet.Column(4).Style.Numberformat.Format = "h:mm";
                    workSheet.Column(5).Style.Numberformat.Format = "h:mm";
                    workSheet.Column(6).Style.Numberformat.Format = "£#,##0.00";
                    workSheet.Column(7).Style.Numberformat.Format = "£#,##0.00";
                    workSheet.Row(1).Style.Font.Bold = true;
                    workSheet.Cells.AutoFitColumns();
                    package.Save();
                }
                stream.Position = 0;
                return stream;
            }

            private IQueryable<Log> ConstructExportLogQuery(Command request)
            {
                IQueryable<Log> query = _context.Logs;

                if (request.ExportDTO.TagIds is not null && request.ExportDTO.TagIds.Count > 0)
                {
                    query = query.Include(l => l.LinkLogTags).Where(l => l.LinkLogTags.Any(lt => request.ExportDTO.TagIds.Contains(lt.TagId.ToString())));
                }

                if (request.ExportDTO.StartDate is not null && request.ExportDTO.StartDate != DateTime.MinValue)
                {
                    query = query.Where(l => l.Date >= request.ExportDTO.StartDate);
                }

                if (request.ExportDTO.EndDate is not null && request.ExportDTO.EndDate != DateTime.MinValue)
                {
                    query = query.Where(l => l.Date <= request.ExportDTO.EndDate);
                }

                return query;
            }

            private async Task<List<Log>> GetLogsForExport(Command request)
            {
                IQueryable<Log> query = ConstructExportLogQuery(request);

                return await query.ToListAsync();
            }

        }
    }
}