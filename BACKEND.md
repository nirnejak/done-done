# Backend Setup

1. Please create an `.env` file from `.env.example`, add database credentials and JWT secret
2. Create a NeonDB(PostgreSQL) database with the name `todo_list`(if using database with another name update credentials in `.env` or `.env.local`)
   If using MySQL, please use the code from `mysql-implementation`
3. Create the database table with the following SQL command:

```sql
-- Create Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Create Todos Table with Foreign Key Reference
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE,
  is_completed BOOLEAN DEFAULT false NOT NULL
);
```

4. Seed the database(optional):

```sql
-- Seed Users Table
INSERT INTO users (name, email, password) VALUES
('Walter White', 'walter.white@gmail.com', 'hashedpassword1'),
('Jesse Pinkman', 'jesse.pinkman@gmail.com', 'hashedpassword2'),
('Saul Goodman', 'saul.goodman@gmail.com', 'hashedpassword3');

-- Seed Todos Table
INSERT INTO todos (user_id, title, description, due_date) VALUES
(1, 'Learn motion.dev', 'Learn Motion (previously Framer Motion)', '2025-01-25'),
(1, 'Build a project', 'Build a todo list.', '2025-01-28'),
(2, 'Deploy on Vercel', 'Deploy to Vercel with a nice domain.', '2025-01-28'),
(2, 'Record a demo', 'Record a demo using and explaining the app.', '2025-01-28'),
(3, 'Share Online', 'Share on X, Layers.to, and Dribbble', '2025-01-28');

```
