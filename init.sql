CREATE DATABASE IF NOT EXISTS weekend_db;

GRANT ALL PRIVILEGES ON weekend_db.* TO 'docker'@'%';
FLUSH PRIVILEGES;

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

-- ... (Your CREATE TABLE statements go above here) ...

-- 4. SEED DATA: COMPANY INFO (Users)
-- We need users first so the other tables can reference their 'alpha'
INSERT INTO company_info (alpha, first_name, last_name, platoon, squad, permissions) VALUES 
('24001', 'John', 'Doe', 1, 1, 'user'),
('24002', 'Jane', 'Smith', 1, 2, 'user'),
('24003', 'Mike', 'Ross', 2, 1, 'user'),
('99999', 'Admin', 'Chief', 0, 0, 'admin');

-- 5. SEED DATA: ADMIN INFO (The Weekend Settings)
-- Setting up the upcoming weekend parameters
INSERT INTO admin_info (alpha, weekend_start, weekend_end) VALUES 
('99999', '2023-11-10 16:00:00', '2023-11-12 18:00:00');

-- 6. SEED DATA: WEEKEND ENTRIES (Liberty Plans)
-- Populate some realistic entries linking back to the users above
INSERT INTO weekend_entries (alpha, mo, src, plans, status, extended_eol, transportation_method, address_type, address, distance, approved, for_weekend) VALUES 
-- Entry 1: Pending approval, going far
('24001', '555-0101', 'Phone', 'Going home to visit parents', 'Pending', TRUE, 'POV', 'Home', '123 Maple St, Springfield, VA', 150, FALSE, '2023-11-10'),

-- Entry 2: Approved, staying local
('24002', '555-0102', 'Text', 'Staying on base, study groups', 'Approved', FALSE, 'None', 'Barracks', 'Building 400', 0, TRUE, '2023-11-10'),

-- Entry 3: Unapproved/Draft
('24003', '555-0103', 'Email', 'Trip to NYC', 'Pending', TRUE, 'Train', 'Hotel', '45 5th Ave, New York, NY', 220, FALSE, '2023-11-10');