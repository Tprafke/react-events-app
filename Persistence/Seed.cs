using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Events.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Bob", UserName="bob", Email="bob@test.com"},
                    new AppUser{DisplayName = "Tom", UserName="tom", Email="tom@test.com"},
                    new AppUser{DisplayName = "Jane", UserName="jane", Email="jane@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var events = new List<Event>
                {
                    new Event
                    {
                        Title = "Past Event 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Event 2 months ago",
                        Category = "drinks",
                        City = "Grand Rapids",
                        Venue = "Bar",
                        Attendees = new List<EventAttendee>
                            {
                                new EventAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = true
                                }
                            }
                    },
                    new Event
                    {
                        Title = "Past Event 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Event 1 month ago",
                        Category = "culture",
                        City = "Paris",
                        Venue = "Louvre",
                        Attendees = new List<EventAttendee>
                            {
                                new EventAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = true
                                },
                                new EventAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = false
                                },
                            }
                    },
                    new Event
                    {
                        Title = "Future Event 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Event 1 month in future",
                        Category = "culture",
                        City = "Chicago",
                        Venue = "Natural History Museum",
                        Attendees = new List<EventAttendee>
                            {
                                new EventAttendee
                                {
                                    AppUser = users[2],
                                    IsHost = true
                                },
                                new EventAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = false
                                },
                            }
                    },
                    new Event
                    {
                        Title = "Future Event 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Event 2 months in future",
                        Category = "music",
                        City = "Detroit",
                        Venue = "O2 Arena",
                        Attendees = new List<EventAttendee>
                            {
                                new EventAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = true
                                },
                                new EventAttendee
                                {
                                    AppUser = users[2],
                                    IsHost = false
                                },
                            }
                    },
                    new Event
                    {
                        Title = "Future Event 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Event 3 months in future",
                        Category = "drinks",
                        City = "Detroit",
                        Venue = "Another bar",
                        Attendees = new List<EventAttendee>
                            {
                                new EventAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = true
                                },
                                new EventAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = false
                                },
                            }
                    },
                    new Event
                    {
                        Title = "Future Event 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Event 4 months in future",
                        Category = "drinks",
                        City = "Grand Rapids",
                        Venue = "Yet another bar",
                        Attendees = new List<EventAttendee>
                            {
                                new EventAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = true
                                }
                            }
                    },
                    new Event
                    {
                        Title = "Future Event 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Event 5 months in future",
                        Category = "drinks",
                        City = "Detroit",
                        Venue = "bar",
                        Attendees = new List<EventAttendee>
                            {
                                new EventAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = true
                                },
                                new EventAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = false
                                },
                            }
                    },
                    new Event
                    {
                        Title = "Future Event 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Event 6 months in future",
                        Category = "music",
                        City = "Detroit",
                        Venue = "Theatre",
                        Attendees = new List<EventAttendee>
                            {
                                new EventAttendee
                                {
                                    AppUser = users[2],
                                    IsHost = true
                                },
                                new EventAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = false
                                },
                            }
                    },
                    new Event
                    {
                        Title = "Future Event 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Event 2 months ago",
                        Category = "travel",
                        City = "Traverse City",
                        Venue = "Beach",
                        Attendees = new List<EventAttendee>
                            {
                                new EventAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = true
                                },
                                new EventAttendee
                                {
                                    AppUser = users[2],
                                    IsHost = false
                                },
                            }
                    },
                    new Event
                    {
                        Title = "Future Event 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Event 8 months in future",
                        Category = "film",
                        City = "Grand Rapids",
                        Venue = "Cinema",
                        Attendees = new List<EventAttendee>
                            {
                                new EventAttendee
                                {
                                    AppUser = users[2],
                                    IsHost = true
                                },
                                new EventAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = false
                                },
                            }
                    }
            };

                await context.Events.AddRangeAsync(events);
                await context.SaveChangesAsync();
            }
        }
    }
}