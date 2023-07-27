using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrackingManagement.DTOs;
using TrackingManagement.Models;
using TrackingManagement.Repositories;

namespace TrackingManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnlinesController : ControllerBase
    {
        private IOnlineService _onlineService;
        private readonly IWebHostEnvironment _env;

        public OnlinesController(IOnlineService onlineService , IWebHostEnvironment env)
        {
            _onlineService = onlineService;
            _env = env;
        }
        [HttpGet]
        [Route("")]
        public IActionResult getCarStatus()
        {
            List<Online> carStatus = _onlineService.getCarsStatus();
            BaseResponse<List<Online>> res = new BaseResponse<List<Online>>() { Data = carStatus };
            return Ok(res);
        }

        [HttpGet]
        [Route("car-image")]
        public async Task<IActionResult> getCarCamImage([FromQuery] CarImage carImage)
        {
            string contentRootPath = _env.ContentRootPath;
            var result= await _onlineService.getCarImage(carImage.CarId, carImage.ImageNum, contentRootPath);
            return result;
        }
    }
}
