/**
 * SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT.
 * Edit here — components only render what is defined below.
 *
 * PLACEHOLDERS YOU MUST FILL IN:
 *   - profile.email      (not provided)
 *   - profile.linkedin   (not provided)
 * Everything else comes from the supplied "About me" brief or the local
 * CTF writeup archive in ~/Projects/writer_blog/src/writeups.
 */

export const profile = {
  name: "Shannu",
  handle: "5h4nnu-dev",
  location: "India",
  role: "Cybersecurity Engineer",
  tagline: "Hack to understand. Build to protect.",
  mission:
    "Building intelligent systems that find, understand and fix vulnerabilities automatically.",
  titles: [
    "Cybersecurity Engineer",
    "AI Builder",
    "CTF Player",
    "Arch Linux User",
  ],
  github: "https://github.com/5h4nnu-dev",
  // TODO: replace these two placeholders with real links.
  email: "PLACEHOLDER_EMAIL",
  linkedin: "PLACEHOLDER_LINKEDIN",
} as const

export const stats = [
  { label: "Writeups", value: 40, hint: "CTF walkthroughs" },
  { label: "Screenshots", value: 476, hint: "documented evidence" },
  { label: "Commits", value: 43, hint: "in the archive" },
] as const

export const featuredProject = {
  name: "CTF-Archive",
  summary:
    "A searchable archive of 40 CTF walkthroughs — every box, every step, every lesson.",
  description:
    "React 19 + Vite blog built around ~11,300 lines of Markdown and 476 screenshots. Full-text search, difficulty and tag filters, in-app authoring with frontmatter, and one-click Markdown export.",
  repo: "https://github.com/5h4nnu-dev/CTF-Archive",
  stack: ["React 19", "Vite", "TypeScript", "Markdown"],
  features: [
    "40 walkthroughs with 476 annotated screenshots",
    "~11,300 lines of Markdown, rendered with syntax highlighting",
    "Full-text search across titles, descriptions and tags",
    "Difficulty and tag filters with composable selections",
    "In-app authoring with YAML frontmatter",
    "Export any writeup as a .md file",
  ],
  metrics: [
    { value: "40", label: "writeups" },
    { value: "476", label: "screenshots" },
    { value: "11.3k", label: "lines of markdown" },
  ],
} as const

export const attackChain = [
  { step: "RECON", detail: "Map the surface", tone: "sky" },
  { step: "ENUMERATE", detail: "Find the entry", tone: "purple" },
  { step: "EXPLOIT", detail: "Break the assumption", tone: "amber" },
  { step: "FOOTHOLD", detail: "Get the shell", tone: "mint" },
  { step: "ESCALATE", detail: "Own the box", tone: "red" },
  { step: "LOOT", detail: "Take the flag", tone: "green" },
  { step: "TEACH", detail: "Write it down", tone: "sky" },
] as const

export type Project = {
  name: string
  description: string
  tags: string[]
  status: string
}

export const projects: Project[] = [
  {
    name: "Vulnix",
    description: "AI-powered vulnerability scanner that finds and validates security flaws.",
    tags: ["Security", "AI", "Automation"],
    status: "In development",
  },
  {
    name: "SecureProbe",
    description: "A focused toolkit for web security assessment and recon.",
    tags: ["Web", "Recon", "Tooling"],
    status: "In development",
  },
  {
    name: "Emotional AI",
    description: "AI that understands personality and emotions in conversation.",
    tags: ["AI", "NLP", "Python"],
    status: "In development",
  },
  {
    name: "ARIS",
    description: "AI campus surveillance system for intelligent monitoring.",
    tags: ["AI", "Computer Vision", "Systems"],
    status: "In development",
  },
  {
    name: "AI Team",
    description: "Autonomous AI agents that collaborate to solve complex tasks.",
    tags: ["AI", "Agents", "Automation"],
    status: "In development",
  },
]

export type SkillGroup = {
  id: string
  label: string
  prompt: string
  skills: { name: string; level: number }[]
  note?: string
}

// Levels are deliberately approximate (rounded), not measured precision.
export const skillGroups: SkillGroup[] = [
  {
    id: "offense",
    label: "Offensive / Recon",
    prompt: "attack_surface",
    skills: [
      { name: "Recon", level: 90 },
      { name: "Networking", level: 80 },
      { name: "Linux", level: 90 },
      { name: "Reverse Engineering", level: 60 },
      { name: "Malware Analysis", level: 50 },
    ],
  },
  {
    id: "dev",
    label: "Development",
    prompt: "build_pipeline",
    skills: [
      { name: "Python", level: 90 },
      { name: "TypeScript", level: 80 },
      { name: "Cloud", level: 70 },
      { name: "React / Vite", level: 80 },
    ],
  },
  {
    id: "ai",
    label: "AI Systems",
    prompt: "deploy_models",
    skills: [
      { name: "AI", level: 80 },
      { name: "AI Agents", level: 70 },
      { name: "Automation", level: 80 },
    ],
  },
  {
    id: "learning",
    label: "Learning Now",
    prompt: "in_progress",
    note: "Active learning — not yet claimed as expertise.",
    skills: [
      { name: "Malware Analysis", level: 40 },
      { name: "Reverse Engineering", level: 45 },
      { name: "Kubernetes", level: 35 },
      { name: "Cloud Security", level: 40 },
      { name: "AI Agents", level: 55 },
    ],
  },
]

export const writeupTopics = [
  "Web / CMS exploitation",
  "Privilege escalation",
  "OSINT",
  "Steganography / forensics",
  "Binary exploitation",
  "CVEs",
] as const

export type Writeup = {
  id: string
  title: string
  description: string
  difficulty: "Very Easy" | "Easy" | "Medium" | "Hard" | "Learning"
  tags: string[]
  date: string
}

export const writeups: Writeup[] = [
  { id: "anonforce", title: "Anonforce", description: "Anonymous FTP, PGP key cracking and a path to root.", difficulty: "Easy", tags: ["FTP", "PGP", "Privilege Escalation"], date: "2026-07-04" },
  { id: "attackerkb", title: "AttackerKB", description: "The Webmin 1.890 supply-chain backdoor (CVE-2019-15107) for unauthenticated root RCE.", difficulty: "Easy", tags: ["CVE", "Supply Chain", "Metasploit"], date: "2026-07-04" },
  { id: "blaster", title: "Blaster", description: "Web enumeration to RDP credentials, then a UAC bypass to SYSTEM on Windows.", difficulty: "Easy", tags: ["Windows", "RDP", "UAC Bypass"], date: "2026-07-04" },
  { id: "blueprint", title: "Blueprint", description: "A vulnerable HTTP file server and misconfigured privileges for root.", difficulty: "Hard", tags: ["Web", "File Server", "Privilege Escalation"], date: "2025-06-20" },
  { id: "bolt", title: "Bolt", description: "Bolt CMS 3.7.1, default credentials and authenticated RCE (CVE-2020-4041).", difficulty: "Easy", tags: ["CMS", "Authenticated RCE", "CVE"], date: "2026-07-04" },
  { id: "brooklynninenine", title: "Brooklyn Nine Nine", description: "FTP enumeration and image steganography, two paths to the same root shell.", difficulty: "Easy", tags: ["FTP", "Steganography", "Brute Force"], date: "2026-07-04" },
  { id: "capturetheflag", title: "c4ptur3-th3-fl4g", description: "Encoding, steganography, spectrograms and file forensics across many tasks.", difficulty: "Easy", tags: ["Steganography", "Forensics", "OSINT"], date: "2026-07-04" },
  { id: "couch", title: "Couch", description: "An exposed CouchDB, reused credentials and a Docker API escape to root.", difficulty: "Easy", tags: ["CouchDB", "Docker", "Privilege Escalation"], date: "2026-07-21" },
  { id: "ctfcollectionvol1", title: "CTF Collection Vol. 1", description: "Twenty standalone challenges: decoding, forensics, OSINT, ciphers and packet analysis.", difficulty: "Easy", tags: ["Forensics", "OSINT", "Reverse Engineering"], date: "2026-07-04" },
  { id: "dav", title: "Dav", description: "WebDAV with default credentials, a reverse shell and a sudo misconfiguration.", difficulty: "Easy", tags: ["WebDAV", "Reverse Shell", "Privilege Escalation"], date: "2026-07-04" },
  { id: "develpy", title: "Develpy", description: "Python 2 input() injection and cron-job abuse for privilege escalation.", difficulty: "Medium", tags: ["Python", "Code Injection", "Cron"], date: "2026-07-04" },
  { id: "easypeasy", title: "Easy Peasy", description: "Web enumeration, hash cracking, steganography and cron privilege escalation.", difficulty: "Easy", tags: ["Web Enumeration", "Steganography", "Cron"], date: "2026-07-04" },
  { id: "food", title: "KoTH Food CTF", description: "Command injection, MySQL defaults, JPEG steganography and a SUID screen exploit.", difficulty: "Easy", tags: ["Command Injection", "MySQL", "SUID"], date: "2026-07-04" },
  { id: "fowsniff", title: "Fowsniff", description: "A breach scenario: leaked MD5 hashes, POP3 mail and a writable MOTD script.", difficulty: "Easy", tags: ["OSINT", "Hash Cracking", "Privilege Escalation"], date: "2026-07-04" },
  { id: "ice", title: "Ice", description: "Icecast CVE-2004-1561, UAC bypass and credential dumping with Mimikatz.", difficulty: "Easy", tags: ["Windows", "Metasploit", "Mimikatz"], date: "2026-07-04" },
  { id: "ignite", title: "Ignite", description: "Fuel CMS 1.4.1 RCE (CVE-2018-16763) and hardcoded database credentials.", difficulty: "Easy", tags: ["CMS", "RCE", "CVE"], date: "2026-07-04" },
  { id: "jack", title: "Jack", description: "Swapped ports, layered encoding, command injection and a SUID strings binary.", difficulty: "Medium", tags: ["Steganography", "Command Injection", "SUID"], date: "2026-07-23" },
  { id: "kenobi", title: "Kenobi", description: "SMB enumeration, ProFTPD mod_copy, NFS and PATH hijacking via a SUID binary.", difficulty: "Easy", tags: ["SMB", "NFS", "Privilege Escalation"], date: "2026-07-24" },
  { id: "kiba", title: "Kiba", description: "Kibana prototype pollution RCE (CVE-2019-7609) and Linux capabilities for root.", difficulty: "Easy", tags: ["CVE", "Prototype Pollution", "RCE"], date: "2026-07-24" },
  { id: "lazyadmin", title: "LazyAdmin", description: "SweetRice CMS backup disclosure and a sudo-permitted Perl script.", difficulty: "Easy", tags: ["CMS", "Backup Disclosure", "Sudo"], date: "2026-07-29" },
  { id: "lianyu", title: "Lian_Yu", description: "Directory enumeration, Base58, PNG repair, steganography and a pkexec misconfiguration.", difficulty: "Easy", tags: ["Steganography", "FTP", "Sudo"], date: "2026-07-31" },
  { id: "library", title: "Library", description: "SSH brute-force with rockyou, then a delete-and-replace sudo script attack.", difficulty: "Easy", tags: ["SSH", "Brute Force", "Sudo"], date: "2026-08-02" },
  { id: "linuxprivesc", title: "Linux PrivEsc", description: "A learning room that plants a different privilege-escalation flaw in nearly every task.", difficulty: "Learning", tags: ["Learning Path", "Privilege Escalation", "Linux"], date: "2026-07-03" },
  { id: "madness", title: "Madness", description: "Corrupted image headers, parameter fuzzing, layered stego and a SUID Screen exploit.", difficulty: "Easy", tags: ["Steganography", "Fuzzing", "SUID"], date: "2026-08-04" },
  { id: "ohsint", title: "OhSINT", description: "Tracking a target using nothing but publicly available information.", difficulty: "Medium", tags: ["OSINT", "Reconnaissance", "Social Media"], date: "2025-06-10" },
  { id: "overheardatbreakfast", title: "Overheard at Breakfast", description: "A leaked email pivots to a Gravatar profile that was supposed to be wiped.", difficulty: "Easy", tags: ["OSINT", "Gravatar", "Hashing"], date: "2026-08-05" },
  { id: "overpass", title: "Overpass", description: "A broken admin cookie, a cracked SSH key and a world-writable /etc/hosts cron attack.", difficulty: "Easy", tags: ["Broken Auth", "SSH Keys", "Cron"], date: "2026-08-05" },
  { id: "path", title: "Path: Web & Infrastructure", description: "IDOR, reset-token disclosure and a .phtml upload, plus a trojaned UnrealIRCd shell.", difficulty: "Medium", tags: ["IDOR", "File Upload", "RCE"], date: "2026-05-23" },
  { id: "picklerick", title: "Pickle Rick", description: "HTML comments, robots.txt and a command panel with a very short blocklist.", difficulty: "Easy", tags: ["Web Enumeration", "Command Injection", "Sudo"], date: "2026-03-31" },
  { id: "room404", title: "Room 404", description: "A shipped .git directory gives up the whole source tree and the staging flag.", difficulty: "Very Easy", tags: ["Git Exposure", "Enumeration", "Web"], date: "2026-07-28" },
  { id: "rootme", title: "RootMe", description: "Web enumeration and a file-upload vulnerability leading to privilege escalation.", difficulty: "Easy", tags: ["Web", "File Upload", "Privilege Escalation"], date: "2025-06-01" },
  { id: "simplectf", title: "Simple CTF", description: "A forgotten FTP drop, a one-patch-behind CMS and a passwordless sudo for vim.", difficulty: "Easy", tags: ["FTP", "SQL Injection", "Sudo"], date: "2026-04-04" },
  { id: "smaggrotto", title: "Smag Grotto", description: "A packet capture leaks credentials; a root cron copies an SSH-key backup.", difficulty: "Easy", tags: ["Packet Analysis", "Command Injection", "Cron"], date: "2026-07-17" },
  { id: "source", title: "Source", description: "A backdoored Webmin release: one unauthenticated POST becomes a root shell.", difficulty: "Easy", tags: ["Supply Chain", "CVE", "Command Injection"], date: "2026-07-21" },
  { id: "tamper", title: "Tamper", description: "A sqlmap tamper plugin that creates an account, logs in and attaches the session.", difficulty: "Medium", tags: ["SQL Injection", "SQLMap", "Tooling"], date: "2026-05-28" },
  { id: "thebrochure", title: "The Brochure", description: "Instagram clues and three Base64 fragments hidden in a resort brochure.", difficulty: "Easy", tags: ["OSINT", "SOCMINT", "Base64"], date: "2026-07-29" },
  { id: "thecodcaper", title: "The Cod Caper", description: "SQL injection, a command panel and a ret2win buffer overflow for root.", difficulty: "Easy", tags: ["SQL Injection", "Buffer Overflow", "Ret2Win"], date: "2026-05-28" },
  { id: "thompson", title: "Thompson", description: "Tomcat default manager credentials, a WAR-deployed shell and a writable root cron script.", difficulty: "Easy", tags: ["Tomcat", "WAR Deployment", "Cron"], date: "2026-04-03" },
  { id: "tonythetiger", title: "Tony the Tiger", description: "JBoss deserialisation (CVE-2015-7501), steganography and a passwordless sudo for find.", difficulty: "Easy", tags: ["Java Deserialization", "Steganography", "Sudo"], date: "2026-07-01" },
  { id: "wgel", title: "Wgel", description: "A leaked username, an exposed SSH key under /sitemap/ and a passwordless wget sudo.", difficulty: "Easy", tags: ["Enumeration", "SSH Keys", "Sudo"], date: "2026-05-01" },
]

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Writeups", href: "#writeups" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const

export const commandLinks = [
  { label: "About", href: "#about", kind: "section" },
  { label: "Featured", href: "#featured", kind: "section" },
  { label: "Writeups", href: "#writeups", kind: "section" },
  { label: "Projects", href: "#projects", kind: "section" },
  { label: "Skills", href: "#skills", kind: "section" },
  { label: "Currently", href: "#currently", kind: "section" },
  { label: "Contact", href: "#contact", kind: "section" },
  { label: "CTF-Archive on GitHub", href: featuredProject.repo, kind: "link" },
  { label: "GitHub profile", href: profile.github, kind: "link" },
] as const
