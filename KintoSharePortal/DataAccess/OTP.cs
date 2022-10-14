using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KintoSharePortal.DataAccess
{
    public class OTP
    {
        public static string Generate()
        {
            string numbers = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            string otp = string.Empty;
            for (int i = 0; i <= 6; i++)
            {
                string number = string.Empty;
                do
                {
                    int index = new Random().Next(0, numbers.Length);
                    number = numbers.ToCharArray()[index].ToString();
                } while (otp.IndexOf(number) != -1);
                otp += number;
            }
            return otp;
        }
    }
}