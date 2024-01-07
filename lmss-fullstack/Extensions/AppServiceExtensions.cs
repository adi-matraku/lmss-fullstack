using AutoMapper;
using lmss_fullstack.Context;
using lmss_fullstack.Interfaces;
using lmss_fullstack.Services;
using Microsoft.EntityFrameworkCore;

namespace lmss_fullstack.Extensions;

public static class AppServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<DataContext>(options =>
        {
            options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
        });
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<UserService>();
        return services;
    }
}