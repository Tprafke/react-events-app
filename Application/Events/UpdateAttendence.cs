using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class UpdateAttendence
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var @event = await _context.Events
                    .Include(e => e.Attendees).ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (@event == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var hostUsername = @event.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendence = @event.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendence != null && hostUsername == user.UserName)
                    @event.IsCancelled = !@event.IsCancelled;

                if (attendence != null && hostUsername != user.UserName)
                    @event.Attendees.Remove(attendence);

                if (attendence == null)
                {
                    attendence = new EventAttendee
                    {
                        AppUser = user,
                        Event = @event,
                        IsHost = false
                    };

                    @event.Attendees.Add(attendence);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendence");
            }
        }
    }
}