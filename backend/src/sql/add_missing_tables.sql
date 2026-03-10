USE smart_waste;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','super') DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  collector_id INT NOT NULL,
  route_id INT NOT NULL,
  status ENUM('assigned','live','completed','paused') DEFAULT 'assigned',
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (collector_id) REFERENCES collectors(id) ON DELETE CASCADE,
  FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE,
  INDEX(collector_id), INDEX(route_id)
);

/* Optional if your telemetry table doesn't exist or schema differs.
   If you already have telemetry, you can skip this block. */
CREATE TABLE IF NOT EXISTS telemetry (
  id INT AUTO_INCREMENT PRIMARY KEY,
  collector_id INT NOT NULL,
  battery INT DEFAULT NULL,
  signal INT DEFAULT NULL,
  temp FLOAT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (collector_id) REFERENCES collectors(id) ON DELETE CASCADE
);