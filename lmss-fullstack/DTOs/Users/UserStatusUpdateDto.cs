namespace lmss_fullstack.DTOs;

public class UserStatusUpdateDto
{
    public string[] UserIds { get; set; }
    public bool Disabled { get; set; }
}