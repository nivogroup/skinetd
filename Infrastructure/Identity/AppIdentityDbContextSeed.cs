﻿using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Samir",
                    Email = "samir@gmail.com",
                    UserName = "samir@gmail.com",
                    Address = new Address
                    {
                        FirstName = "Samir",
                        LastName = "Ghosh",
                        Street = "3 No Camp",
                        City = "Kolkata",
                        State = "West Bengal",
                        ZipCode = "700102"
                    }
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        } 
    }
}