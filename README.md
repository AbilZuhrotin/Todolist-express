# Todolist-express — Dokumentasi API

Dokumentasi singkat untuk API Todolist-express. Dokumen ini dibuat dari sumber kode (routes, controllers, models, middleware) dan menjelaskan cara setup, environment variables, endpoint, contoh request/response, serta catatan penting.

## Ringkasan
- Server: Express (CommonJS)
- Database: MongoDB via Mongoose
- Otentikasi: JWT (Authorization: Bearer <token>)
- Password: di-hash sebelum disimpan (bcrypt)

## Menjalankan
Menjalankan server
```powershell
npm start
# atau untuk development
npm run dev
```

Server default mendengarkan port dari `process.env.PORT` atau 3000.

## Format autentikasi
- Semua endpoint yang membutuhkan autentikasi memeriksa header `Authorization` dengan format:

```
Authorization: Bearer <token>
```

Token dihasilkan saat login dan ditandatangani menggunakan `process.env.JWT_SECRET`. Token di-set kadaluarsa (lihat controller) — saat ini 5 jam.

## Models (ringkasan)

- User
  - username: String (required)
  - fullname: String (required)
  - email: String (required, unique)
  - password: String (hashed)
  - role: Enum

- Todo
  - title: String (required)
  - description: String (required)
  - date: Date (default: Date.now)
  - users_id: ObjectId (ref: 'User', required)

## Daftar Endpoint

Base path: `http://<host>:<port>`; router utama menggunakan prefix `/users` dan `/todos`.

-- Pengguna (Users)

1) POST /users/register

- Deskripsi: Mendaftarkan user baru. Password akan di-hash sebelum disimpan.
- Body (JSON):

```json
{
  "username": "bruno",
  "fullname": "Bruno",
  "email": "bruno@example.com",
  "password": "rahasia",
  "role": "user"   // optional
}
```

- Response sukses (201):

```json
{
  "message": "User berhasil ditambahkan",
  "data": {
    "_id": "...",
    "username": "bruno",
    "fullname": "Bruno",
    "email": "bruno@example.com",
    "role": "user",
    "__v": 0
  }
}
```

2) POST /users/login

- Deskripsi: Login user. Mengembalikan JWT jika email & password valid.
- Body (JSON):

```json
{
  "email": "bruno@example.com",
  "password": "rahasia"
}
```

- Response sukses (200):

```json
{
  "message": "Login berhasil",
  "token": "<JWT_TOKEN>"
}
```

Token ini berisi payload (contoh) { id, username, email, role } dan kadaluarsa sesuai pengaturan di controller (sekitar 5 jam).

3) GET /users/

- Deskripsi: Menampilkan semua user.
- Autentikasi: Hanya admin (middleware `verifikasiAdmin`).
- Header: Authorization: Bearer <token>
- Response sukses (200):

```json
{
  "message": "Menampilkan semua user",
  "data": [ /* array user */ ]
}
```

-- Todo

1) GET /todos/

- Deskripsi: Ambil semua todo.
- Autentikasi: Hanya admin (`verifikasiAdmin`).
- Response sukses (200):

```json
{
  "message": "Menampilkan semua todo",
  "data": [ /* array todo; tiap todo mem-populate users_id */ ]
}
```

2) GET /todos/:id

- Deskripsi: Ambil todo berdasarkan id.
- Autentikasi: user terautentikasi (`verifikasiToken`).
- Header: Authorization: Bearer <token>
- Response sukses (200):

```json
{
  "message": "Menampilkan todo",
  "data": { /* todo object */ }
}
```

3) POST /todos/

- Deskripsi: Create todo baru.
- Autentikasi: user terautentikasi (`verifikasiToken`).
- Body (JSON):

```json
{
  "title": "Belajar Node",
  "description": "Mengerjakan tugas",
  "date": "2025-10-16T00:00:00.000Z", //optional
  "users_id": "<userObjectId>"
}
```

- Response sukses (201):

```json
{
  "message": "todo berhasil ditambahkan",
  "data": { /* todo object */ }
}
```

4) PUT /todos/:id

- Deskripsi: Update todo (partial/complete). Jika id tidak ditemukan => 404.
- Autentikasi: user terautentikasi (`verifikasiToken`).
- Body: fields yang ingin diupdate (title, description, date, users_id)
- Response sukses (200):

```json
{
  "message": "Todo berhasil diupdate"
}
```

5) DELETE /todos/

- Deskripsi: Hapus semua todo.
- Autentikasi: Hanya admin (`verifikasiAdmin`).
- Response sukses (200):

```json
{
  "message": "Semua todo berhasil dihapus"
}
```

6) DELETE /todos/:id

- Deskripsi: Hapus todo berdasarkan id.
- Autentikasi: user terautentikasi (`verifikasiToken`).
- Response sukses (200):

```json
{
  "message": "Todo berhasil dihapus"
}
```

## Daftar file terkait (source)

- `app.js` — entry point; memanggil router utama dan koneksi DB.
- `config/db.js` — file koneksi mongoose.
- `routes/index.js`, `routes/users.router.js`, `routes/todo.router.js` — definisi route.
- `controllers/users.controllers.js`, `controllers/todo.controllers.js` — logika endpoint.
- `models/users.js`, `models/todo.js` — schema mongoose.
- `middleware/auth.js` — middleware verifikasi token dan role admin.
