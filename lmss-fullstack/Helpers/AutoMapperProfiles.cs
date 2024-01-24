using AutoMapper;
using lmss_fullstack.DTOs;
using lmss_fullstack.DTOs.Book;
using lmss_fullstack.DTOs.Loans;
using lmss_fullstack.Models;

namespace lmss_fullstack.Helpers;

public class AutoMapperProfiles: Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<UserUpdate, User>()
            .ForMember(dest => dest.Username,
                opt => opt.MapFrom((src, dest, destMember, context) => src.Username ?? destMember))
            .ForMember(dest => dest.FirstName,
                opt => opt.MapFrom((src, dest, destMember, context) => src.FirstName ?? destMember))
            .ForMember(dest => dest.LastName,
                opt => opt.MapFrom((src, dest, destMember, context) => src.LastName ?? destMember))
            .ForMember(dest => dest.PhoneNumber,
                opt => opt.MapFrom((src, dest, destMember, context) => src.PhoneNumber ?? destMember));

        CreateMap<Book, BookGetDto>();
        CreateMap<BookGetDto, Book>();
        
        CreateMap<Book, BookCreateDto>();
        CreateMap<BookCreateDto, Book>();
        
        CreateMap<LoanCreateDto, Loan>();
        CreateMap<LoanUpdate, Loan>();

        CreateMap<LoanDto, Loan>();
        CreateMap<Loan, LoanDto>();

        CreateMap<MeDto, User>();
        CreateMap<User, MeDto>();
    }
}