import { OSINTContextByIncident } from '../types/osint';

export const mockOSINTContexts: OSINTContextByIncident = {
  "inc-1042": {
    incident_id: "inc-1042",
    global_threat_correlation: "HIGH CORRELATION: Recent Telegram threat intel channel mentions targeting municipal substations in Sector 4.",
    cards: [
      {
        card_id: "osint-card-101",
        source_name: "Darkweb Threat Monitor #04",
        category: "threat_intel",
        title: "Perimeter Power Grid Reconnaissance Chatter",
        content_snippet: "Channel 'Infrastruct_Ops' logged discussion 4 hours ago referencing sub-station layout in Perimeter Zone 4.",
        relevance_score: 92,
        published_at: "2026-10-05T22:15:00Z",
        author_or_handle: "@IntelUnit_Alpha",
        url: "https://darkweb.drishti.internal/intel/101",
        tags: ["substation", "zone4", "reconnaissance"],
        verification_status: "verified"
      },
      {
        card_id: "osint-card-102",
        source_name: "Geospatial Social Watch",
        category: "social_media",
        title: "Public Report of Unscheduled Maintenance Drone",
        content_snippet: "Twitter post: 'Saw a small quadcopter hovering low near the North perimeter boundary about 30 mins ago. #SecurityAlert'",
        relevance_score: 78,
        published_at: "2026-10-06T01:45:00Z",
        author_or_handle: "@LocalObserver_99",
        url: "https://x.com/LocalObserver_99/status/194829104",
        tags: ["drone", "perimeter", "social_feed"],
        verification_status: "unverified"
      },
      {
        card_id: "osint-card-103",
        source_name: "FAA Airspace Registry DB",
        category: "public_records",
        title: "No Flight Clearance Granted in Zone 4 Airspace",
        content_snippet: "Official Airspace DB check confirms no commercial or civilian drone flight plans approved for Sector 4.",
        relevance_score: 85,
        published_at: "2026-10-06T02:00:00Z",
        author_or_handle: "FAA-Registry-Bot",
        url: "https://faa.gov/airspace/lookup?zone=Z4",
        tags: ["airspace", "no_fly_zone"],
        verification_status: "verified"
      }
    ]
  },
  "inc-1041": {
    incident_id: "inc-1041",
    global_threat_correlation: "LOW CORRELATION: License plate matched flagged vehicle list in adjacent precinct.",
    cards: [
      {
        card_id: "osint-card-201",
        source_name: "Regional Police ANPR Exchange",
        category: "public_records",
        title: "Vehicle Flagged for Expired Registration",
        content_snippet: "License plate matching silver sedan reported for missing annual registration check in District 2.",
        relevance_score: 64,
        published_at: "2026-10-05T18:30:00Z",
        author_or_handle: "State-ANPR-Feed",
        url: null,
        tags: ["traffic_violation", "expired_tag"],
        verification_status: "verified"
      }
    ]
  },
  "inc-1040": {
    incident_id: "inc-1040",
    global_threat_correlation: "MEDIUM CORRELATION: City transit app delayed 3 trains causing surge.",
    cards: [
      {
        card_id: "osint-card-301",
        source_name: "Metro Transit Alert API",
        category: "news",
        title: "Line B Express Train Delay Announcement",
        content_snippet: "3 consecutive train arrivals discharged 1,800 passengers simultaneously at North Gate Plaza terminal.",
        relevance_score: 89,
        published_at: "2026-10-06T01:25:00Z",
        author_or_handle: "@MetroAlerts",
        url: "https://metro.local/alerts/train-delay-b",
        tags: ["transit", "train_delay", "crowd"],
        verification_status: "verified"
      }
    ]
  }
};
