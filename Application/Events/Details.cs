using Domain;
using MediatR;
using Persistence;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Application.Events
{
    public class Details
    {
        public class Query : IRequest<Result<EventDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<EventDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<EventDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                // @ used for event due to event being a reserved keyword
                var @event = await _context.Events
                    .ProjectTo<EventDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<EventDto>.Success(@event);
            }
        }
    }
}