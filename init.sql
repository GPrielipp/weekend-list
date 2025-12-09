CREATE DATABASE IF NOT EXISTS weekend_db;
USE weekend_db;

-- 1. COMPANY INFO
-- We create this first because 'weekend_entries' relies on the 'alpha' column here.
CREATE TABLE IF NOT EXISTS company_info (
    alpha VARCHAR(6) PRIMARY KEY, -- Using Alpha as the unique ID
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    platoon INT,
    squad INT,
    permissions VARCHAR(20) DEFAULT 'user' -- e.g., 'admin', 'user', 'nco'
);

-- 2. WEEKEND ENTRIES
-- This stores the actual liberty plans.
CREATE TABLE IF NOT EXISTS weekend_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alpha VARCHAR(6) NOT NULL,
    mo VARCHAR(50),               -- assuming "Mobile/Phone" or "Month"
    src VARCHAR(100),              -- Source?
    plans TEXT,
    status TEXT,
    extended_eol BOOLEAN DEFAULT FALSE, -- Changed to Boolean for easy checkbox logic
    transportation_method VARCHAR(100),
    address_type VARCHAR(100),
    address TEXT,
    distance INT,                 -- Store as integer (miles) for calculations
    date_submitted DATETIME DEFAULT CURRENT_TIMESTAMP,
    approved BOOLEAN DEFAULT FALSE,
    for_weekend TEXT NOT NULL,    -- The specific weekend this applies to
    
    -- This links the entry to the user in company_info
    FOREIGN KEY (alpha) REFERENCES company_info(alpha) ON DELETE CASCADE
);

-- 3. ADMIN INFO
-- Stores the global settings for the upcoming weekend.
CREATE TABLE IF NOT EXISTS admin_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alpha VARCHAR(6),            -- The admin who set these dates
    weekend_start DATETIME NOT NULL,
    weekend_end DATETIME NOT NULL,
    
    FOREIGN KEY (alpha) REFERENCES company_info(alpha)
);