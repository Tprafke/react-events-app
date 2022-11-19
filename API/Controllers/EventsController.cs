using Application.Core;
using Application.Events;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class EventsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetEvents([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
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

        [Authorize(Policy = "IsEventHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditEvent(Guid id, Event @event)
        {
            // @ used for event due to event being a reserved keyword
            @event.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Event = @event }));
        }

        [Authorize(Policy = "IsEventHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendence.Command { Id = id }));
        }
    }
}