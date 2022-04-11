using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Persistence;
using System.Linq;

namespace API.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly DataContext _context;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService, DataContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _context = context;
        }

        [Authorize]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            AppUser user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user is null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return Unauthorized();
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return Redirect("/user/signin");
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email)) return BadRequest("Email is already taken");
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName)) return BadRequest("Username is already taken");

            var user = new AppUser
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email,
            };

            var result = _userManager.CreateAsync(user, registerDto.Password);

            if (!result.IsFaulted)
            {
                await _context.UserConfigs.AddAsync(new UserConfig { UserId = user.Id });
                await _context.SaveChangesAsync();

                return CreateUserObject(user);
            }

            return BadRequest("Problem occurred when registering user");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserConfigDTO>> GetCurrentUser()
        {
            AppUser user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if(user is not null)
            {
                UserConfig userConfig = await _context.UserConfigs.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();

                if(userConfig is not null)
                {
                    return CreateFullUserObject(user, userConfig);
                }
            }

            return BadRequest("User not logged in");
            
        }

        [Authorize]
        [HttpGet("getAccountInfo")]
        public async Task<ActionResult<AccountInfoDto>> GetAccountInfo()
        {
            AccountInfoDto accountInfoDto = new();

            var user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if(user is not null)
            {
                var userConfig = await _context.UserConfigs.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();

                if (userConfig is not null)
                {
                    accountInfoDto.Email = user.Email;
                    accountInfoDto.Username = user.UserName;
                    accountInfoDto.HourlyRate = userConfig.HourlyRate;
                    accountInfoDto.Currency = userConfig.Currency;
                    accountInfoDto.ColourScheme = userConfig.ColourScheme;
                    accountInfoDto.UserConfigId = userConfig.Id;
                }
                else
                {
                    await _context.UserConfigs.AddAsync(new UserConfig { UserId = user.Id });
                }

                await _context.SaveChangesAsync();
            }
            else
            {
                return BadRequest("Could not find user");
            }

            return accountInfoDto;

        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                Id = user.Id,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName,
                Email = user.Email,
            };
        }

        private UserConfigDTO CreateFullUserObject(AppUser user, UserConfig userConfig)
        {
            return new UserConfigDTO
            {
                User = CreateUserObject(user),
                UserConfig = userConfig
            };
        }
    }
}
