using lmss_fullstack.Helpers;
using lmss_fullstack.Models;

namespace lmss_fullstack.DTOs;

public class UsersResponse
{
    public PagedList<User> Users { get; set; }
    public int Total { get; set; }
}