using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ngRoute.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetData(DateTime StartDate,DateTime EndDate)
        {
            //DateTime StartDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);

            StartDate = Convert.ToDateTime(StartDate.ToString("yyyy-MM-dd HH:mm:ss.fff"));
            EndDate = Convert.ToDateTime(EndDate.ToString("yyyy-MM-dd HH:mm:ss.fff"));
            TfsConnectEntities e = new TfsConnectEntities();
            var result = e.vWorkItems.Where(x => x.IsParent == 1  && x.Completed_Work_Agg != null && x.Created_Date >= StartDate && x.Created_Date <= EndDate).OrderBy(x => x.OwnedBy).ToList();
            var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }

        //public ActionResult GetSpecificResourceData(string ResourceName)
        //{
        //    //DateTime StartDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);

        //    StartDate = Convert.ToDateTime(StartDate.ToString("yyyy-MM-dd HH:mm:ss.fff"));
        //    EndDate = Convert.ToDateTime(EndDate.ToString("yyyy-MM-dd HH:mm:ss.fff"));
        //    TfsConnectEntities e = new TfsConnectEntities();
        //    var result = e.vWorkItems.Where(x => x.IsParent == 1 && x.Completed_Work_Agg != null && x.Created_Date >= StartDate && x.Created_Date <= EndDate).OrderBy(x => x.OwnedBy).ToList();
        //    var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
        //    jsonResult.MaxJsonLength = int.MaxValue;
        //    return jsonResult;

        //}
    }
}