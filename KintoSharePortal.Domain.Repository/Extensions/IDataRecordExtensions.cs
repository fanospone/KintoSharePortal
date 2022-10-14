using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;


namespace KintoSharePortal.Domain.Repository
{
    public static class IDataRecordExtensions
    {
        public static bool HasColumn(this IDataRecord dr, string columnName)
        {
            for (int i = 0; i < dr.FieldCount; i++)
            {
                if (dr.GetName(i).Equals(columnName, StringComparison.InvariantCultureIgnoreCase))
                    return true;
            }
            return false;
        }

        public static T MapType<T>(this IDataRecord record) where T : class, new()
        {
            var objT = Activator.CreateInstance<T>();
            foreach (var property in typeof(T).GetProperties())
            {
                if (record.HasColumn(property.Name) && !record.IsDBNull(record.GetOrdinal(property.Name)))
                    property.SetValue(objT, record[property.Name]);
            }
            return objT;
        }

        public static DataTable  ToDataTable(this IDataReader dr)
        {
            DataTable dt = new DataTable();
            var dynamicDt = new List<Dictionary<string, string>>();

            try
            {
                dt.Load(dr);
                dr.Close();
            }
            catch (Exception)
            {
                throw;
            }

            return dt;
        }

        public static List<T> DataReaderMapToList<T>(this IDataReader dr)
        {
            List<T> list = new List<T>();
            T obj = default(T);
            while (dr.Read())
            {
                obj = Activator.CreateInstance<T>();
                foreach (PropertyInfo prop in obj.GetType().GetProperties())
                {
                    if ((prop.Name.ToString() != "ErrorType" && prop.Name.ToString() != "ErrorMessage") &&  !object.Equals(dr[prop.Name], DBNull.Value)  )
                    {
                        prop.SetValue(obj, dr[prop.Name], null);
                    }
                }
                list.Add(obj);
            }
            dr.Close();
            return list;
        }
    }
}
