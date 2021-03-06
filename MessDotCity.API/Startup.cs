﻿using System.Net;
using System.Text;
using AutoMapper;
using MessDotCity.API.Data;
using MessDotCity.API.Helpers;
using MessDotCity.API.Hubs;
using MessDotCity.API.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;

namespace MessDotCity.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(x => x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddCors();
            services.AddAutoMapper();
            services.AddSignalR();
            services.Configure<PhotoSettings>(Configuration.GetSection("PhotoSettings"));
            services.AddScoped<IAuthRepository,AuthRepository>();
            services.AddScoped<IProfileRepository,ProfileRepository>();
            services.AddScoped<IMessRepository,MessRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ICommonMethods, CommonMethods>();
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(builder =>{
                    builder.Run(async context =>{
                        context.Response.StatusCode=(int)HttpStatusCode.InternalServerError;
                        var error= context.Features.Get<IExceptionHandlerFeature>();
                        if(error!=null){
                            // context.Response.AddApplicationError(error.Error.Message);
                            context.Response.AddApplicationError("Fazlami");
                            await context.Response.WriteAsync(error.Error.StackTrace);
                            await context.Response.WriteAsync(error.Error.Source);;
                        }
                    });
                });
                // app.UseHsts();
            }
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseSignalR(routes => {
               routes.MapHub<TokenHub>("/tokenUpdate"); 
            });
            app.UseAuthentication();
            // app.UseHttpsRedirection();
            app.UseMvc();
            app.UseStaticFiles();
        }
    }
}
