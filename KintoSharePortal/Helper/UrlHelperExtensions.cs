using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Caching;
using System.Web.Hosting;
using System.Web.Mvc;
using System.IO;

namespace KintoSharePortal.Helper
{
    public static class UrlHelperExtensions
    {
        public static string ContentVersion(this UrlHelper helper, string rootRelativePath)
        {
            rootRelativePath = rootRelativePath.Replace("~", "");
            if (HttpRuntime.Cache[rootRelativePath] == null)
            {
                var absolute = HostingEnvironment.MapPath("~" + rootRelativePath);
                var date = File.GetLastWriteTime(absolute);

                var path = rootRelativePath;
                if (HostingEnvironment.ApplicationVirtualPath == "/" && path.Length > 0 && path[0] == '/')
                {
                    path = path.Substring(1, path.Length - 1);
                }

                var result = HostingEnvironment.ApplicationVirtualPath + path + "?v=" + date.Ticks;
                HttpRuntime.Cache.Insert(rootRelativePath, result, new CacheDependency(absolute));
            }

            return HttpRuntime.Cache[rootRelativePath] as string;
        }

    }
}