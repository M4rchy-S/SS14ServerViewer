public class ServerStatusModel
{
    public class ServerInformation
    {
        public string address { get; set; }
        public StatusData StatusData { get; set; }
        public List<object> inferredTags { get; set; }
    }
    
    public class StatusData
    {
        public string map { get; set; }
        public string name { get; set; }
        public List<string> tags { get; set; }
        public string preset { get; set; }
        public int players { get; set; }
        public int round_id { get; set; }
        public int run_level { get; set; }
        public string short_name { get; set; }
        public bool panic_bunker { get; set; }
        public DateTime round_start_time { get; set; }
        public int soft_max_players { get; set; }
    }
}

