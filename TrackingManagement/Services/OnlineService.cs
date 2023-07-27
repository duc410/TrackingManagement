using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TrackingManagement.Models;
using TrackingManagement.Repositories;

namespace TrackingManagement.Services
{
    public class OnlineService : IOnlineService
    {
        private readonly BKContext _db;


        public OnlineService(BKContext db)
        {
            _db = db;
        }

        public List<Online> getCarsStatus()
        {
            List<Online> carsStatus = _db.Onlines.Include(item => item.Car)
                                                 .ThenInclude(item=>item.Driver)
                                                 .ToList()
                                                 ;
            return carsStatus;
        }

        public async Task<FileContentResult> getCarImage(int carId,int imageNum,string contenRootPath)
        {
            string MimeType= "image/jpeg";
            string imagePath="";
            var carWithImageInfo = _db.Onlines.Where(item => item.CarId == carId).FirstOrDefault();
            if (imageNum == 1)
            {
                imagePath = carWithImageInfo.Cam1ImgPath;
            }
            if (imageNum == 2)
            {
                imagePath = carWithImageInfo.Cam2ImgPath;
            }
            imagePath = contenRootPath + imagePath;

            byte[] fileBytes = await File.ReadAllBytesAsync(imagePath);

            return new FileContentResult(fileBytes, MimeType);          

        }
    }
}
