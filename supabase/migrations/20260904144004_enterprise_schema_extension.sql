/*
# GC Globals — Enterprise Schema Extension

Adds: client role, OTP, login_attempts, leave_balances, task_recurrence,
daily_work_reviews, projects, project_assignees, conversations.is_internal,
SECURITY DEFINER functions for admin operations.
*/

-- 1. Expand profiles.role
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('admin', 'manager', 'employee', 'client'));
REVOKE UPDATE ON profiles FROM authenticated;
GRANT UPDATE (full_name, phone, avatar_url) ON profiles TO authenticated;

-- 2. OTP Codes
CREATE TABLE IF NOT EXISTS otp_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code_hash text NOT NULL,
  purpose text NOT NULL DEFAULT 'admin_login' CHECK (purpose IN ('admin_login', 'password_reset')),
  expires_at timestamptz NOT NULL,
  consumed_at timestamptz,
  attempt_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_otp_user ON otp_codes(user_id);
ALTER TABLE otp_codes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_otp" ON otp_codes;
CREATE POLICY "select_own_otp" ON otp_codes FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_otp" ON otp_codes;
CREATE POLICY "insert_own_otp" ON otp_codes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_otp" ON otp_codes;
CREATE POLICY "update_own_otp" ON otp_codes FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 3. Login Attempts
CREATE TABLE IF NOT EXISTS login_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  ip_address text,
  success boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email);
CREATE INDEX IF NOT EXISTS idx_login_attempts_created ON login_attempts(created_at DESC);
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "insert_login_attempts" ON login_attempts;
CREATE POLICY "insert_login_attempts" ON login_attempts FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 4. Leave Balances
CREATE TABLE IF NOT EXISTS leave_balances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  year integer NOT NULL DEFAULT EXTRACT(YEAR FROM now()),
  total_vacation numeric NOT NULL DEFAULT 20,
  used_vacation numeric NOT NULL DEFAULT 0,
  total_sick numeric NOT NULL DEFAULT 10,
  used_sick numeric NOT NULL DEFAULT 0,
  total_personal numeric NOT NULL DEFAULT 5,
  used_personal numeric NOT NULL DEFAULT 0,
  total_unpaid numeric NOT NULL DEFAULT 0,
  used_unpaid numeric NOT NULL DEFAULT 0,
  carry_over numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, year)
);
ALTER TABLE leave_balances ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_leave_balances" ON leave_balances;
CREATE POLICY "select_own_leave_balances" ON leave_balances FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'manager')));
DROP POLICY IF EXISTS "admin_update_leave_balances" ON leave_balances;
CREATE POLICY "admin_update_leave_balances" ON leave_balances FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));
DROP POLICY IF EXISTS "admin_insert_leave_balances" ON leave_balances;
CREATE POLICY "admin_insert_leave_balances" ON leave_balances FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

-- 5. Task Recurrence
CREATE TABLE IF NOT EXISTS task_recurrence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  frequency text NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly', 'none')),
  day_of_week integer CHECK (day_of_week >= 0 AND day_of_week <= 6),
  day_of_month integer CHECK (day_of_month >= 1 AND day_of_month <= 31),
  next_due_date date NOT NULL,
  last_generated_at timestamptz,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE task_recurrence ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_task_recurrence" ON task_recurrence;
CREATE POLICY "select_task_recurrence" ON task_recurrence FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM tasks t WHERE t.id = task_id AND (t.assigned_to = auth.uid() OR t.created_by = auth.uid() OR EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'manager')))));
DROP POLICY IF EXISTS "insert_task_recurrence" ON task_recurrence;
CREATE POLICY "insert_task_recurrence" ON task_recurrence FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM tasks t WHERE t.id = task_id AND t.created_by = auth.uid()));
DROP POLICY IF EXISTS "update_task_recurrence" ON task_recurrence;
CREATE POLICY "update_task_recurrence" ON task_recurrence FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM tasks t WHERE t.id = task_id AND t.created_by = auth.uid()));
DROP POLICY IF EXISTS "delete_task_recurrence" ON task_recurrence;
CREATE POLICY "delete_task_recurrence" ON task_recurrence FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM tasks t WHERE t.id = task_id AND t.created_by = auth.uid()));

-- 6. Daily Work Reviews
CREATE TABLE IF NOT EXISTS daily_work_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  tasks_completed text,
  tasks_pending text,
  work_performed text,
  important_updates text,
  blockers text,
  additional_comments text,
  work_completed boolean NOT NULL DEFAULT false,
  attendance_id uuid REFERENCES attendance(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);
CREATE INDEX IF NOT EXISTS idx_daily_reviews_user ON daily_work_reviews(user_id);
ALTER TABLE daily_work_reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_daily_reviews" ON daily_work_reviews;
CREATE POLICY "select_own_daily_reviews" ON daily_work_reviews FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'manager')));
DROP POLICY IF EXISTS "insert_own_daily_reviews" ON daily_work_reviews;
CREATE POLICY "insert_own_daily_reviews" ON daily_work_reviews FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_daily_reviews" ON daily_work_reviews;
CREATE POLICY "update_own_daily_reviews" ON daily_work_reviews FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 7. Projects (create BEFORE project_assignees)
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('planning', 'active', 'on_hold', 'completed', 'cancelled')),
  client_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  manager_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  start_date date,
  end_date date,
  created_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_manager ON projects(manager_id);

-- 8. Project Assignees (create AFTER projects)
CREATE TABLE IF NOT EXISTS project_assignees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('lead', 'member', 'observer')),
  assigned_at timestamptz DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Now enable RLS and policies for projects (can reference project_assignees)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_projects" ON projects;
CREATE POLICY "select_projects" ON projects FOR SELECT
  TO authenticated
  USING (
    client_id = auth.uid() OR manager_id = auth.uid() OR created_by = auth.uid()
    OR EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'manager'))
    OR EXISTS (SELECT 1 FROM project_assignees pa WHERE pa.project_id = projects.id AND pa.user_id = auth.uid())
  );
DROP POLICY IF EXISTS "insert_projects" ON projects;
CREATE POLICY "insert_projects" ON projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by OR EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'manager')));
DROP POLICY IF EXISTS "update_projects" ON projects;
CREATE POLICY "update_projects" ON projects FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by OR auth.uid() = manager_id OR EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'))
  WITH CHECK (auth.uid() = created_by OR auth.uid() = manager_id OR EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

ALTER TABLE project_assignees ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_project_assignees" ON project_assignees;
CREATE POLICY "select_project_assignees" ON project_assignees FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (SELECT 1 FROM projects p WHERE p.id = project_id AND (p.created_by = auth.uid() OR p.manager_id = auth.uid()))
    OR EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'manager'))
  );
DROP POLICY IF EXISTS "insert_project_assignees" ON project_assignees;
CREATE POLICY "insert_project_assignees" ON project_assignees FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM projects p WHERE p.id = project_id AND (p.created_by = auth.uid() OR p.manager_id = auth.uid()))
    OR EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );
DROP POLICY IF EXISTS "delete_project_assignees" ON project_assignees;
CREATE POLICY "delete_project_assignees" ON project_assignees FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM projects p WHERE p.id = project_id AND (p.created_by = auth.uid() OR p.manager_id = auth.uid()))
    OR EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- 9. Conversations: add is_internal
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS is_internal boolean NOT NULL DEFAULT true;
DROP POLICY IF EXISTS "select_conversations" ON conversations;
CREATE POLICY "select_conversations" ON conversations FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM conversation_members cm WHERE cm.conversation_id = conversations.id AND cm.user_id = auth.uid())
    AND (
      (is_internal = true AND EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'manager', 'employee')))
      OR is_internal = false
    )
  );

-- 10. SECURITY DEFINER FUNCTIONS
CREATE OR REPLACE FUNCTION admin_create_user(
  p_email text, p_password text, p_full_name text, p_role text,
  p_phone text DEFAULT NULL, p_department text DEFAULT NULL, p_job_title text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE v_user_id uuid; v_caller_role text;
BEGIN
  SELECT role INTO v_caller_role FROM profiles WHERE id = auth.uid();
  IF v_caller_role IS NULL OR v_caller_role != 'admin' THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  IF p_role NOT IN ('manager', 'employee', 'client') THEN
    RAISE EXCEPTION 'Invalid role';
  END IF;
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, created_at, updated_at,
    raw_app_meta_data, raw_user_meta_data, is_sso_user, email_change_confirm_status
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(), 'authenticated', 'authenticated',
    p_email, crypt(p_password, gen_salt('bf', 12)),
    now(), now(), now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    jsonb_build_object('full_name', p_full_name), false, 0
  ) RETURNING id INTO v_user_id;
  INSERT INTO profiles (id, email, full_name, role, phone, department, job_title, hire_date)
  VALUES (v_user_id, p_email, p_full_name, p_role, p_phone, p_department, p_job_title, CURRENT_DATE);
  IF p_role = 'employee' THEN
    INSERT INTO leave_balances (user_id, year) VALUES (v_user_id, EXTRACT(YEAR FROM now()));
  END IF;
  INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details)
  VALUES (auth.uid(), 'user_created', 'profile', v_user_id,
    jsonb_build_object('email', p_email, 'role', p_role));
  RETURN v_user_id;
END;
$$;
REVOKE EXECUTE ON FUNCTION admin_create_user FROM anon;
GRANT EXECUTE ON FUNCTION admin_create_user TO authenticated;

CREATE OR REPLACE FUNCTION admin_update_user_role(p_target_user uuid, p_new_role text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE v_caller_role text;
BEGIN
  SELECT role INTO v_caller_role FROM profiles WHERE id = auth.uid();
  IF v_caller_role IS NULL OR v_caller_role != 'admin' THEN RAISE EXCEPTION 'Not authorized'; END IF;
  IF p_new_role NOT IN ('admin', 'manager', 'employee', 'client') THEN RAISE EXCEPTION 'Invalid role'; END IF;
  UPDATE profiles SET role = p_new_role, updated_at = now() WHERE id = p_target_user;
  INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details)
  VALUES (auth.uid(), 'role_changed', 'profile', p_target_user, jsonb_build_object('new_role', p_new_role));
END;
$$;
REVOKE EXECUTE ON FUNCTION admin_update_user_role FROM anon;
GRANT EXECUTE ON FUNCTION admin_update_user_role TO authenticated;

CREATE OR REPLACE FUNCTION admin_deactivate_user(p_target_user uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE v_caller_role text;
BEGIN
  SELECT role INTO v_caller_role FROM profiles WHERE id = auth.uid();
  IF v_caller_role IS NULL OR v_caller_role != 'admin' THEN RAISE EXCEPTION 'Not authorized'; END IF;
  UPDATE profiles SET is_active = false, updated_at = now() WHERE id = p_target_user;
  INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details)
  VALUES (auth.uid(), 'user_deactivated', 'profile', p_target_user, '{}'::jsonb);
END;
$$;
REVOKE EXECUTE ON FUNCTION admin_deactivate_user FROM anon;
GRANT EXECUTE ON FUNCTION admin_deactivate_user TO authenticated;

CREATE OR REPLACE FUNCTION admin_reset_password(p_target_user uuid, p_new_password text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE v_caller_role text; v_email text;
BEGIN
  SELECT role INTO v_caller_role FROM profiles WHERE id = auth.uid();
  IF v_caller_role IS NULL OR v_caller_role != 'admin' THEN RAISE EXCEPTION 'Not authorized'; END IF;
  SELECT email INTO v_email FROM profiles WHERE id = p_target_user;
  IF v_email IS NULL THEN RAISE EXCEPTION 'User not found'; END IF;
  UPDATE auth.users SET encrypted_password = crypt(p_new_password, gen_salt('bf', 12)), updated_at = now() WHERE email = v_email;
  INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details)
  VALUES (auth.uid(), 'password_reset', 'profile', p_target_user, '{}'::jsonb);
END;
$$;
REVOKE EXECUTE ON FUNCTION admin_reset_password FROM anon;
GRANT EXECUTE ON FUNCTION admin_reset_password TO authenticated;

CREATE OR REPLACE FUNCTION generate_otp(p_user_id uuid, p_purpose text DEFAULT 'admin_login')
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE v_code text; v_code_hash text;
BEGIN
  v_code := lpad(floor(random() * 1000000)::text, 6, '0');
  v_code_hash := crypt(v_code, gen_salt('bf', 10));
  UPDATE otp_codes SET consumed_at = now() WHERE user_id = p_user_id AND purpose = p_purpose AND consumed_at IS NULL;
  INSERT INTO otp_codes (user_id, code_hash, purpose, expires_at)
  VALUES (p_user_id, v_code_hash, p_purpose, now() + interval '10 minutes');
  RETURN v_code;
END;
$$;
REVOKE EXECUTE ON FUNCTION generate_otp FROM anon;
GRANT EXECUTE ON FUNCTION generate_otp TO authenticated;

CREATE OR REPLACE FUNCTION verify_otp(p_user_id uuid, p_code text, p_purpose text DEFAULT 'admin_login')
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE v_otp record;
BEGIN
  SELECT * INTO v_otp FROM otp_codes
  WHERE user_id = p_user_id AND purpose = p_purpose AND consumed_at IS NULL
  ORDER BY created_at DESC LIMIT 1;
  IF v_otp IS NULL THEN RAISE EXCEPTION 'No active OTP'; END IF;
  IF v_otp.expires_at < now() THEN RAISE EXCEPTION 'OTP expired'; END IF;
  IF v_otp.attempt_count >= 5 THEN RAISE EXCEPTION 'Too many attempts'; END IF;
  UPDATE otp_codes SET attempt_count = attempt_count + 1 WHERE id = v_otp.id;
  IF v_otp.code_hash = crypt(p_code, v_otp.code_hash) THEN
    UPDATE otp_codes SET consumed_at = now() WHERE id = v_otp.id;
    RETURN true;
  END IF;
  RAISE EXCEPTION 'Invalid OTP';
END;
$$;
REVOKE EXECUTE ON FUNCTION verify_otp FROM anon;
GRANT EXECUTE ON FUNCTION verify_otp TO authenticated;

-- Triggers
DROP TRIGGER IF EXISTS leave_balances_updated_at ON leave_balances;
CREATE TRIGGER leave_balances_updated_at BEFORE UPDATE ON leave_balances
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
DROP TRIGGER IF EXISTS daily_work_reviews_updated_at ON daily_work_reviews;
CREATE TRIGGER daily_work_reviews_updated_at BEFORE UPDATE ON daily_work_reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
DROP TRIGGER IF EXISTS projects_updated_at ON projects;
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
