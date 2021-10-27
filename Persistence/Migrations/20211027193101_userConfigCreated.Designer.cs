﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20211027193101_userConfigCreated")]
    partial class userConfigCreated
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.0-rc.2.21480.5");

            modelBuilder.Entity("Domain.Log", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<TimeSpan>("EndTime")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("HourlyRate")
                        .HasColumnType("TEXT");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("TotalCharged")
                        .HasColumnType("TEXT");

                    b.Property<TimeSpan>("TotalTime")
                        .HasColumnType("TEXT");

                    b.Property<bool>("is_overtime")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Logs");
                });

            modelBuilder.Entity("Domain.UserConfig", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("ColourScheme")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("HourlyRate")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("UserId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("UserConfigs");
                });
#pragma warning restore 612, 618
        }
    }
}
