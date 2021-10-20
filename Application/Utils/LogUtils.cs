using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Utils
{
    internal class LogUtils
    {
        public static TimeSpan CalculateTotalTime(TimeSpan startTime, TimeSpan endTime)
        {
            return endTime - startTime;
        }

        public static decimal CalculateTotalEarnings(TimeSpan totalTime, decimal hourlyRate)
        {
            decimal minutes = totalTime.Minutes;
            decimal hours = totalTime.Hours;

            decimal hoursToMinutes = hours * 60;
            decimal totalMinutes = minutes + hoursToMinutes;
            decimal amountToCharge = totalMinutes / 60;

            decimal amountToChargeRounded = GeneralUtils.RoundEarnings(amountToCharge);

            return hourlyRate * amountToChargeRounded;
        }
    }
}
