using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;
using Newtonsoft.Json;
using raspi_temp_baro_alt_wp8.Resources;
using Windows.Web.Http;

namespace raspi_temp_baro_alt_wp8
{
    public partial class MainPage : PhoneApplicationPage
    {
        public String ip_address = "192.168.1.100";

        public class Barometer
        {
            public string name { get; set; }
            public string description { get; set; }
            public string unit { get; set; }
            public int value { get; set; }
        }

        public class Temperature
        {
            public string name { get; set; }
            public string description { get; set; }
            public string unit { get; set; }
            public double value { get; set; }
        }

        public class Altitude
        {
            public string name { get; set; }
            public string description { get; set; }
            public string unit { get; set; }
            public double value { get; set; }
        }

        public class Sensors
        {
            public Barometer barometer { get; set; }
            public Temperature temperature { get; set; }
            public Altitude altitude { get; set; }
        }

        // Constructor
        public MainPage()
        {
            InitializeComponent();
        }

        private void button_Click(object sender, RoutedEventArgs e)
        {
            /*
            WebClient webClient = new WebClient();
            webClient.DownloadStringCompleted += WebClient_DownloadStringCompleted;
            webClient.DownloadStringAsync(new Uri(string.Format("http://{0}:8484/pi/sensors", ip_address)));
            */
            getSensorData();
        }

        public async void getSensorData()
        {
            try
            {
                HttpClient httpClient = new HttpClient();
                httpClient.DefaultRequestHeaders.Accept.TryParseAdd("application/json");
                String uriString = "http://" + ip_address + ":8484/pi/sensors";
                String responseJsonString = await httpClient.GetStringAsync(new Uri(uriString));

                Sensors sensors = new Sensors();
                sensors = JsonConvert.DeserializeObject<Sensors>(responseJsonString);
                textBlockTempValue.Text = sensors.temperature.value.ToString();
                textBlockBaroValue.Text = sensors.barometer.value.ToString();
                textBlockAltValue.Text = sensors.altitude.value.ToString();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        /*
        private void WebClient_DownloadStringCompleted(object sender, DownloadStringCompletedEventArgs e)
        {
            if(!string.IsNullOrEmpty(e.Result))
            {
                Sensors sensors = new Sensors();
                sensors = JsonConvert.DeserializeObject<Sensors>(e.Result);
                textBlockTempValue.Text = sensors.temperature.value.ToString();
                textBlockBaroValue.Text = sensors.barometer.value.ToString();
                textBlockAltValue.Text = sensors.altitude.value.ToString();
            }
        }
        */

        private void textBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            ip_address = textBox_IpAddress.Text;
        }
    }
}