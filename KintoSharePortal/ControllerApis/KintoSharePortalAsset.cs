using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using KintoSharePortal.Models.Datatable;
using System.Net.Http;
using System.Web.Http;
using KintoSharePortal.Domain.DA;
using KintoSharePortal.Domain.Models;
using KintoSharePortal.Domain.Repository;
using KintoSharePortal.Services;
using KintoSharePortal.Models;

namespace KintoSharePortal.Controllers
{
    [RoutePrefix("api/kintoShare")]
    
    public class KintoSharePortalAsset : ApiController
    {
        private KintoSharePortalService _KintoSharePortalService;

        public KintoSharePortalAsset()
        {
            _KintoSharePortalService = new KintoSharePortalService();
        }

        [Route("AddAsset")]
        [HttpPost]
        public IHttpActionResult AddAsset(trxKintoSharePortalAddAsset data)
        {
            try
            {
                data = _KintoSharePortalService.AddAsset(data);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }
        }
        [HttpPost, Route("loadAsset")]
        public IHttpActionResult LoadAsset(PostKintoSharePortalAsset post)
        {
            var AssetList = new List<trxKintoSharePortalAsset>();
            string strWhereCond = "";
            AssetList = _KintoSharePortalService.LoadAsset(strWhereCond);
            return Ok(new{ draw = post.draw, data = AssetList });
        }

        [HttpGet, Route("Dept/list")]
        public IHttpActionResult DeptList(mstKintoSharePortalDepartmentList post)
        {
            try
            {
                KintoSharePortalService ksp = new KintoSharePortalService();
                var DeptList = new List<mstKintoSharePortalDepartmentList>();
                DeptList = ksp.DepartmentList();
                //var data = DeptList.ToList();
                return Ok(DeptList);
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }
            
        }
    }
}