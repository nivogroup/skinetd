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
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
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
                    },
                    new AppUser
                    {
                        DisplayName = "Admin",
                        Email = "admin@test.com",
                        UserName = "admin@test.com"
                    } 
                };
                var roles = new List<AppRole>
                {
                    new AppRole { Name="Admin"},
                    new AppRole { Name="Member"}
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, "Member");
                    if (user.Email == "admin@test.com")
                        await userManager.AddToRoleAsync(user, "Admin");
                }
                
            }
        } 
    }
}
