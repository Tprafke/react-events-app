using Application.Core;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // @ used for event due to event being a reserved keyword
                var @event = await _context.Events.FindAsync(request.Id);

                // if (@event == null) return null;

                _context.Remove(@event);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the event");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}