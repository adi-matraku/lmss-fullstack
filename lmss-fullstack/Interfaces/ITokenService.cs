using lmss_fullstack.Models;

namespace lmss_fullstack.Interfaces;

public interface ITokenService
{
    string CreateToken(User user);
}