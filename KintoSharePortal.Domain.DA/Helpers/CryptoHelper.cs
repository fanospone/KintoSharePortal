﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Web;

namespace KintoSharePortal.Domain.DA
{
    public static class CryptoHelper
    {
        public static string Decrypt(string str)
        {
            str = str.Replace(" ", "+");
            string DecryptKey = "ToyotaAstraFinance";
            byte[] byKey = { };
            byte[] IV = { 18, 52, 86, 120, 144, 171, 205, 239 };
            byte[] inputByteArray = new byte[str.Length];

            byKey = System.Text.Encoding.UTF8.GetBytes(DecryptKey.Substring(0, 8));
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            inputByteArray = Convert.FromBase64String(str.Replace(" ", "+"));

            MemoryStream ms = new MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateDecryptor(byKey, IV), CryptoStreamMode.Write);

            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();

            System.Text.Encoding encoding = System.Text.Encoding.UTF8;

            return encoding.GetString(ms.ToArray());
        }

		public static string Encrypt(string str)
		{
			string EncrptKey = "TowerBersamaGroup";
			byte[] byKey = { };
			byte[] IV = { 18, 52, 86, 120, 144, 171, 205, 239 };

			byKey = System.Text.Encoding.UTF8.GetBytes(EncrptKey.Substring(0, 8));
			DESCryptoServiceProvider des = new DESCryptoServiceProvider();
			byte[] inputByteArray = System.Text.Encoding.UTF8.GetBytes(str);

			MemoryStream ms = new MemoryStream();
			CryptoStream cs = new CryptoStream(ms, des.CreateEncryptor(byKey, IV), CryptoStreamMode.Write);

			cs.Write(inputByteArray, 0, inputByteArray.Length);
			cs.FlushFinalBlock();

			return Convert.ToBase64String(ms.ToArray());
		}
	}
}