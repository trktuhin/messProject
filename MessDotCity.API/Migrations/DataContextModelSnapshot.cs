﻿// <auto-generated />
using System;
using MessDotCity.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MessDotCity.API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113");

            modelBuilder.Entity("MessDotCity.API.Models.DailyExpense", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Day");

                    b.Property<float>("Expense");

                    b.Property<int>("MessId");

                    b.Property<string>("ResponsibleMember");

                    b.Property<int?>("TotalMeal");

                    b.HasKey("Id");

                    b.ToTable("DailyExpenses");
                });

            modelBuilder.Entity("MessDotCity.API.Models.FixedExpense", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<float>("Amount");

                    b.Property<DateTime>("EffectiveDate");

                    b.Property<DateTime>("LastModifiedOn");

                    b.Property<int>("MessId");

                    b.Property<string>("Remarks");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("FixedExpenses");
                });

            modelBuilder.Entity("MessDotCity.API.Models.Meal", b =>
                {
                    b.Property<int>("MemberId");

                    b.Property<DateTime>("Day");

                    b.Property<float>("BreakFast");

                    b.Property<float>("Dinner");

                    b.Property<float>("Lunch");

                    b.Property<int?>("MessId");

                    b.HasKey("MemberId", "Day");

                    b.ToTable("Meals");
                });

            modelBuilder.Entity("MessDotCity.API.Models.Member", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<float>("DBreakfast");

                    b.Property<float>("DDinner");

                    b.Property<float>("DLunch");

                    b.Property<string>("FirstName");

                    b.Property<DateTime>("LastModifiedOn");

                    b.Property<string>("LastName");

                    b.Property<int>("MessId");

                    b.Property<string>("MessRole");

                    b.Property<string>("Mobile");

                    b.Property<string>("PhotoName");

                    b.Property<string>("Profession");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.ToTable("Members");
                });

            modelBuilder.Entity("MessDotCity.API.Models.MessInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<DateTime>("LastModifiedOn");

                    b.Property<string>("Location");

                    b.Property<DateTime>("MealChangeFrom");

                    b.Property<DateTime>("MealChangeTo");

                    b.Property<string>("MessName");

                    b.Property<string>("OwnerId");

                    b.Property<string>("SecretCode");

                    b.HasKey("Id");

                    b.ToTable("Messes");
                });

            modelBuilder.Entity("MessDotCity.API.Models.Request", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("MessId");

                    b.Property<DateTime>("RequestedOn");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Requests");
                });

            modelBuilder.Entity("MessDotCity.API.Models.UserInfo", b =>
                {
                    b.Property<string>("UserId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<bool>("IsEmailVerified");

                    b.Property<bool>("IsMobileVerified");

                    b.Property<string>("LastName");

                    b.Property<string>("Mobile");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("PhotoUrl");

                    b.Property<string>("Profession");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("MessDotCity.API.Models.Request", b =>
                {
                    b.HasOne("MessDotCity.API.Models.UserInfo", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
