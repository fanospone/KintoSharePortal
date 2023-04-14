using KintoSharePortal.Models;

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace KintoSharePortal.DataAccess
{
    public class Access
    {
        string connec = ConfigurationManager.ConnectionStrings["connectionStringName"].ToString();
        SqlConnection con;
        public List<KintoShare> ShowData(SearchKintoShare SKS)
        {
            List<KintoShare> listData = null;
            try
            {
                using (con = new SqlConnection(connec))
                {
                    string start = string.IsNullOrEmpty(SKS.Start) ? "" : SKS.Start.Replace("-", "");
                    string end = string.IsNullOrEmpty(SKS.End) ? "" : SKS.End.Replace("-", "");

                    SqlCommand cmd = new SqlCommand("spTAFSPagingThankReborn", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Start", start);
                    cmd.Parameters.AddWithValue("@End", end);
                    cmd.Parameters.AddWithValue("@AggrementNo", SKS.AggrementNo);
                    cmd.Parameters.AddWithValue("@Cabang", SKS.Cabang);
                    cmd.Parameters.AddWithValue("@CaraBayar", SKS.CaraBayar);
                    con.Open();

                    SqlDataAdapter SDA = new SqlDataAdapter(cmd);
                    DataTable DT = new DataTable();

                    SDA.Fill(DT);
                    int check = DT.Rows.Count;

                    listData = new List<KintoShare>();
                    int no = 0;
                    foreach (DataRow DR in DT.Rows)
                    {
                        no += 1;
                        listData.Add(
                            new KintoShare
                            {
                                id = no,
                                NoRek = DR["NoRek"].ToString(),
                                CustName = Convert.ToString(DR["CustName"]),
                                DataID = DR["DataID"].ToString(),
                                BranchName = Convert.ToString(DR["BranchName"]),
                                CustId = Convert.ToString(DR["CustId"]),
                                RealisasiDate = (DateTime)DR["RealisasiDate"],
                                CaraBayar = Convert.ToString(DR["CaraBayar"])
                            }
                        );
                    }
                }
                return listData;
            }
            catch (Exception ex)
            {
                return listData;
            }
            finally
            {
                con.Close();
            }
        }

        public DataTable ShowDataPrint(string param)
        {
            DataTable dt = new DataTable();

            using (SqlConnection con = new SqlConnection(connec))
            {
                using (SqlCommand cmd = new SqlCommand("spTAFSThanksDocOri3", con))
                {
                    cmd.Parameters.AddWithValue("@kontrak", param);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    dt.Clear();
                    dt.Load(cmd.ExecuteReader());
                    con.Close();
                }
            }
            return dt;
        }
        //Login
        public DataTable GetAll()
        {
            DataTable dt = new DataTable();

            using (SqlConnection con = new SqlConnection(connec))
            {
                using (SqlCommand cmd = new SqlCommand("spVISTA_GET_USER", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    dt.Clear();
                    dt.Load(cmd.ExecuteReader());
                    con.Close();
                }
            }
            return dt;
        }
        public DataTable GetByUserId(string username)
        {
            DataTable dt = new DataTable();

            using (SqlConnection con = new SqlConnection(connec))
            {
                using (SqlCommand cmd = new SqlCommand("spVISTA_USER_ACCESS_SELECT", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@USERNAME", username);
                    con.Open();
                    dt.Clear();
                    dt.Load(cmd.ExecuteReader());
                    con.Close();
                }
            }
            return dt;
        }
        public DataTable ReadOTP(string userId, string otp)
        {
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["connectionStringOTP"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("spOTP_ReadOTP", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@USERNAME", userId);
                    cmd.Parameters.AddWithValue("@APP_ID", ConfigurationManager.AppSettings["appID"].ToString());
                    cmd.Parameters.AddWithValue("@OTP", otp);
                    con.Open();
                    dt.Clear();
                    dt.Load(cmd.ExecuteReader());
                    con.Close();
                }
            }
            return dt;
        }
        //Signature function
        public void UploadSignature(string OfficerID, byte[] ImageSigner)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionStringUploadSignature"].ConnectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spTAFSThanksDocOri3UpdateReborn", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@OfficerID", OfficerID);
                        cmd.Parameters.AddWithValue("@ImageSigner", ImageSigner);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        con.Close();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        //User
        public List<UserModel> GetUserData(string userName)
        {
            List<UserModel> listUser = null;

            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("spKINTOSHARE_SHOWUSER", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    if (!string.IsNullOrEmpty(userName))
                        cmd.Parameters.AddWithValue("@USERID", userName);

                    con.Open();

                    SqlDataAdapter SDA = new SqlDataAdapter(cmd);
                    DataTable DT = new DataTable();

                    SDA.Fill(DT);
                    int check = DT.Rows.Count;

                    listUser = new List<UserModel>();
                    int no = 0;
                    foreach (DataRow DR in DT.Rows)
                    {
                        no += 1;
                        listUser.Add(
                        new UserModel
                        {
                            id = no,
                            name = DR["NAME"].ToString(),
                            username = DR["USERNAME"].ToString(),
                            role = DR["role"].ToString(),
                            is_active = Convert.ToInt32(DR["IS_ACTIVE"])
                        });
                    }
                    DT.Clear();
                    DT.Load(cmd.ExecuteReader());
                    con.Close();
                }
                return listUser;
            }
        }
        public List<UserModel> ShowUserFoundation(UserModel UM)
        {
            List<UserModel> listUser = null;
            //using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionStringShowAllUser"].ConnectionString))
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("spKINTOSHARE_SHOWALLUSER", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@USERID", UM.username);
                    con.Open();

                    SqlDataAdapter SDA = new SqlDataAdapter(cmd);
                    DataTable DT = new DataTable();

                    SDA.Fill(DT);
                    int check = DT.Rows.Count;

                    listUser = new List<UserModel>();
                    foreach (DataRow DR in DT.Rows)
                    {
                        listUser.Add(
                        new UserModel
                        {
                            username = Convert.ToString(DR["username"]),
                            name = Convert.ToString(DR["name"]),

                        });
                    }
                    DT.Clear();
                    DT.Load(cmd.ExecuteReader());
                    con.Close();
                }
                return listUser;
            }
        }

        public void ActionUsers(UserModel userModel)
        {
            //using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionStringCRUDUser"].ConnectionString))
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("spKINTOSHARE_PAGINGCRUDUSER", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@USERNAME", userModel.username);
                    cmd.Parameters.AddWithValue("@ROLE", userModel.role);
                    cmd.Parameters.AddWithValue("@QUERY", userModel.formType);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}