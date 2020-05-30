using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Security.Claims;

namespace MessDotCity.API.Hubs
{
    public class TokenHub: Hub
    {
        public Task Send(string userId, Object token)
        {
            return Clients.Group(userId).SendAsync("ReceiveToken", token);
        }

        public override async Task OnConnectedAsync()
        {
            string userId = Context.GetHttpContext().Request.Query["username"];
            await Groups.AddToGroupAsync(Context.ConnectionId, userId);
            await base.OnConnectedAsync();
        }
    }
}