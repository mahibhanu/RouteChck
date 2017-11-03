using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ngRoute
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

           // routes.MapRoute(
           //    name: "Angular",
           //    url: "{controller}/{action}",
           //    defaults: new { controller = "Application", action = "Index" }
           //constraints: new { route = @"^(Resource)$" }
           //);


            routes.MapRoute(
               name: "Default",
               url: "{controller}/{action}/{id}",
               defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
               constraints: new { controller = "Home|Application" }
           );
         
        }
    }
}
