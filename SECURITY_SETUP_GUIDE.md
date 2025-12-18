<!-- ============================================
FILE: SECURITY_SETUP_GUIDE.md
DESKRIPSI: Panduan lengkap implementasi security authentication
============================================ -->

# 🔐 SECURITY AUTHENTICATION SETUP GUIDE

## Overview

Implementasi sistem authentication dengan **Supabase PostgreSQL + Bcrypt + JWT Token** untuk melindungi dashboard admin dari akses tidak sah.

---

## ✅ Status Implementasi

| Komponen | Status | File |
|----------|--------|------|
| Bcrypt Package | ✅ Installed | `package.json` |
| Auth Service | ✅ Created | `src/lib/auth.ts` |
| Protected Route | ✅ Created | `src/components/ProtectedRoute.tsx` |
| App Routes | ✅ Updated | `src/App.tsx` |
| Admin Login | ✅ Updated | `src/pages/AdminLogin.tsx` |
| Admin Dashboard | ✅ Updated | `src/pages/AdminDashboard.tsx` |
| Database Table | ⏳ Ready | `sql/CREATE_ADMIN_USERS_TABLE.sql` |
| Build Status | ✅ Passing | 0 errors |

---

## 🔧 STEP 1: Jalankan SQL Migration

**File:** `sql/CREATE_ADMIN_USERS_TABLE.sql`

1. Buka **Supabase Dashboard** → Pilih project
2. Go to **SQL Editor**
3. Klik **New Query**
4. Copy-paste isi `sql/CREATE_ADMIN_USERS_TABLE.sql`
5. Klik **Execute** ▶️

**Apa yang dilakukan:**
- Membuat tabel `admin_users` dengan field: id, username, password_hash, email, is_active, last_login, created_at
- Menambah index untuk username lookup yang cepat
- Enable Row Level Security (RLS)
- Insert admin user default: username="dyas", password="dyasforhmps2025" (hashed dengan bcrypt)

**Verifikasi:**
```sql
SELECT username, is_active, created_at FROM public.admin_users;
-- Hasil: 1 row (dyas user)
```

---

## 🔑 STEP 2: Login Credentials

Gunakan credentials berikut untuk login ke dashboard admin:

```
Username: dyas
Password: dyasforhmps2025
```

⚠️ **Security Note:** Simpan password ini dengan aman. Password di-hash dengan bcrypt sehingga tidak bisa dibaca dari database.

---

## 📋 STEP 3: Cara Kerja Sistem Authentication

### **A. Login Flow**

```
1. User masukkan username + password di /admin/login
   ↓
2. AdminLogin.tsx memanggil loginAdmin() dari auth.ts
   ↓
3. auth.ts queries admin_users table untuk cari user by username
   ↓
4. Password plain text di-compare dengan password_hash pakai bcryptjs
   ↓
5. Jika match → Generate JWT token, simpan di localStorage
   ↓
6. Redirect ke /admin/dashboard
```

### **B. Protected Route Flow**

```
1. User akses /admin/dashboard
   ↓
2. ProtectedRoute component memanggil checkAdminSession()
   ↓
3. checkAdminSession() validasi token dari localStorage
   ↓
4. Jika token valid & tidak expired (24 jam) → Render dashboard
   ↓
5. Jika token tidak valid/expired → Redirect ke /admin/login
```

### **C. Logout Flow**

```
1. User klik tombol Logout
   ↓
2. AdminDashboard.tsx memanggil logoutAdmin()
   ↓
3. logoutAdmin() hapus semua session dari localStorage
   ↓
4. Redirect ke /admin/login
```

---

## 📝 File-file Kunci

### **1. src/lib/auth.ts** (125 lines)

**Functions:**

- **`loginAdmin(username, password)`** → Autentikasi user
  - Query admin_users by username
  - Compare password dengan bcrypt
  - Generate & store JWT token
  - Return: `{ success: boolean, token?: string, error?: string }`

- **`logoutAdmin()`** → Logout user
  - Hapus semua session dari localStorage
  - Return: void

- **`checkAdminSession()`** → Validasi session
  - Ambil token dari localStorage
  - Validasi token format
  - Check expiry (24 jam)
  - Return: `{ username: string, id: string, token: string } | null`

- **`getAdminToken()`** → Get current token
  - Return: `string | null`

- **`hashPassword(password)`** → Hash password (reference)
  - Generate bcrypt hash (cost 10)
  - Return: `Promise<string>`

- **`verifyPassword(password, hash)`** → Verify password (reference)
  - Compare password dengan hash
  - Return: `Promise<boolean>`

**Storage di localStorage:**
```javascript
{
  "admin_token": "base64_encoded_jwt",
  "admin_id": "uuid_from_database",
  "admin_username": "dyas",
  "admin_login_time": "2025-01-01T12:00:00Z"
}
```

### **2. src/components/ProtectedRoute.tsx** (25 lines)

**Component:** Guard untuk admin routes

```typescript
<ProtectedRoute>
  <AdminDashboard />
</ProtectedRoute>
```

- Check `checkAdminSession()`
- Jika tidak ada session → `<Navigate to="/admin/login" />`
- Jika ada session → Render children

### **3. src/App.tsx** (Updated)

**Changes:**
```typescript
// Import ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";

// Wrap /admin/dashboard route
<Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

// /admin/login tetap public (tidak di-wrap)
<Route path="/admin/login" element={<AdminLogin />} />
```

### **4. src/pages/AdminLogin.tsx** (Updated)

**Key Changes:**
- Import `loginAdmin` dari auth.ts
- Replace Supabase query dengan `loginAdmin()` call
- Handle success/error responses
- Improved error messages dengan emoji (✅, ❌)

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  
  const result = await loginAdmin(credentials.username, credentials.password);
  
  if (result.success) {
    toast.success("✅ Login berhasil!");
    navigate("/admin/dashboard");
  } else {
    toast.error("❌ " + result.message);
  }
};
```

### **5. src/pages/AdminDashboard.tsx** (Updated)

**Key Changes:**
- Import `logoutAdmin, checkAdminSession` dari auth.ts
- Add `sessionInfo` state untuk display session
- Update useEffect: gunakan `checkAdminSession()` daripada localStorage flag
- Update handleLogout: gunakan `logoutAdmin()`
- Display session info di header (username + login time)

```typescript
useEffect(() => {
  const session = checkAdminSession();
  if (!session) {
    navigate("/admin/login");
    return;
  }
  
  // Set session info for display
  const loginTime = localStorage.getItem("admin_login_time");
  setSessionInfo({
    username: session.username,
    loginTime: loginTime ? new Date(loginTime).toLocaleString("id-ID") : "Tidak diketahui"
  });
  
  fetchAllData();
}, [navigate]);
```

---

## 🧪 Testing Checklist

- [ ] **Test Direct Access:** Buka `http://localhost:5173/admin/dashboard` langsung tanpa login → Harus redirect ke `/admin/login`
- [ ] **Test Invalid Credentials:** Masukkan username/password yang salah → Harus show error message
- [ ] **Test Valid Login:** Masukkan dyas/dyasforhmps2025 → Harus redirect ke `/admin/dashboard`
- [ ] **Test Session Persistence:** Reload halaman saat logged in → Harus tetap di dashboard (session masih valid)
- [ ] **Test Logout:** Klik tombol Logout → Harus redirect ke `/admin/login` dan localStorage cleared
- [ ] **Test Session Display:** Check header untuk melihat username + login time
- [ ] **Test Token Expiry:** Tunggu lebih dari 24 jam (atau modify code) → Harus redirect ke login

---

## 🛡️ Security Features Implemented

| Feature | Description |
|---------|-------------|
| **Password Hashing** | Bcryptjs dengan cost 10 (aman, slow-by-design) |
| **Route Protection** | ProtectedRoute component guard /admin/dashboard |
| **Token Validation** | JWT token dengan 24-jam expiry |
| **Session Storage** | localStorage (encrypted recommended untuk production) |
| **RLS (Row Level Security)** | PostgreSQL RLS policies di Supabase |
| **Error Messages** | Generic "Username atau password salah" (tidak reveal which is wrong) |
| **Logout Clearing** | Semua session data dihapus dari localStorage |

---

## ⚠️ Production Recommendations

1. **HTTPS Only:** Deploy dengan SSL/TLS certificate
2. **Secure Cookies:** Gunakan httpOnly cookies untuk token (bukan localStorage)
3. **Token Refresh:** Implement token refresh sebelum expiry
4. **Rate Limiting:** Add rate limiting pada login endpoint
5. **Audit Logging:** Log semua login/logout attempts
6. **2FA:** Consider adding 2-factor authentication
7. **Environment Variables:** Jangan expose credentials di .env
8. **Password Policy:** Enforce strong password requirements
9. **Session Management:** Clear old sessions, prevent concurrent logins

---

## 🔄 Changing Admin Password

Jika perlu update password admin, jalankan query ini di Supabase SQL Editor:

```sql
-- Update password untuk user 'dyas' ke hash baru
UPDATE public.admin_users
SET password_hash = 'NEW_BCRYPT_HASH_HERE'
WHERE username = 'dyas';
```

Untuk generate hash baru:
```bash
npm install -g bcryptjs
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('new_password_here', 10));"
```

---

## 📞 Troubleshooting

| Problem | Solution |
|---------|----------|
| **"Upload preset not found"** | Check Cloudinary preset name di `.env.local` |
| **"Username atau password salah"** | Verify credentials match SQL table (username=dyas) |
| **Page refresh goes to login** | Check localStorage not cleared, token might be expired |
| **Build errors** | Run `npm install` dan `npm run build` |
| **Build succeeded but app doesn't work** | Clear browser cache, check console for errors |

---

## ✨ Completed Security Tasks

✅ Installed bcryptjs package  
✅ Created auth service (src/lib/auth.ts)  
✅ Created ProtectedRoute component  
✅ Updated App.tsx routing  
✅ Updated AdminLogin.tsx  
✅ Updated AdminDashboard.tsx  
✅ Created admin_users table SQL  
✅ Generated correct bcrypt hash  
✅ Build passing (0 errors)  
✅ Session info displayed in header  

---

**Last Updated:** 2025-01-01  
**Version:** 1.0 - Initial Security Implementation  
**Status:** ✅ READY FOR TESTING
