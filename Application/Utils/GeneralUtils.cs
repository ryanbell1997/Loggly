using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Utils
{
    internal class GeneralUtils
    {
        public static decimal RoundEarnings(decimal hours)
        {
            decimal value = hours;
            int factor = 4;
            decimal nearestMultiple =
                    Math.Round(value * factor) / factor;

            return nearestMultiple;
        }
    }
}
