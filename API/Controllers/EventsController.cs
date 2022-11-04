using Application.Events;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class EventsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateEvent(Event @event)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Event = @event }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEvent(Guid id, Event @event)
        {
            // @ used for event due to event being a reserved keyword
            @event.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Event = @event }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}