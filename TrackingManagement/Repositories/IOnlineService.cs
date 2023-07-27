using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TrackingManagement.Models;

namespace TrackingManagement.Repositories
{
    public interface IOnlineService
    {
        public List<Online> getCarsStatus();

        public Task<FileContentResult> getCarImage(int carId, int imageNum, string contenRootPath);
    }
}
