﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TaskTrackr_API.Models;

#nullable disable

namespace TaskTrackr_API.Migrations
{
    [DbContext(typeof(MyDbContext))]
    [Migration("20241024105237_Migartion1")]
    partial class Migartion1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.35")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("TaskTrackr_API.Models.UserModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("UserImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = new Guid("53005b29-1fad-48e8-8f2c-45514b205e73"),
                            CreatedAt = new DateTime(2024, 10, 24, 15, 52, 36, 770, DateTimeKind.Local).AddTicks(1480),
                            Email = "admin@gmail.com",
                            FirstName = "",
                            LastName = "",
                            Password = "$2a$11$Y1f.fpAscmdHW6ipb2KoJOvwvEZOICzC2v6f6ROZTytic5y2ScAQS",
                            Role = "Admin",
                            UpdatedAt = new DateTime(2024, 10, 24, 15, 52, 36, 770, DateTimeKind.Local).AddTicks(1493),
                            UserImage = "",
                            UserName = "Admin"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
