# Patient Document Portal

A full-stack healthcare platform for managing PDF medical documents. This application allows patients to securely upload, view, download, and manage their medical PDF documents through an intuitive web interface.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Technology Justification](#-technology-justification)
- [Prerequisites](#-prerequisites)
- [Quick Start Guide](#-quick-start-guide)
- [Detailed Setup](#-detailed-setup-instructions)
- [Usage Guide](#-how-to-use)
- [API Documentation](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Troubleshooting](#-troubleshooting)
- [Development](#-development-commands)
- [Security Notes](#-security-notes)

## 🚀 Features

- ✅ **Upload PDF Documents** - Secure file upload with validation
- ✅ **List Documents** - View all uploaded files with metadata (filename, size, upload date)
- ✅ **Download Files** - Download any document with one click
- ✅ **Delete Documents** - Remove files from both UI and disk storage
- ✅ **Local Storage** - Files stored in `media/uploads/`, metadata in SQLite database
- ✅ **Modern UI** - Beautiful, responsive design with smooth animations
- ✅ **Real-time Updates** - Document list refreshes automatically after operations

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library for building interactive interfaces
- **Vite** - Lightning-fast build tool and development server
- **Axios** - Promise-based HTTP client for API communication
- **CSS3** - Modern styling with CSS variables and animations

### Backend
- **Django 6.0** - High-level Python web framework
- **Django REST Framework** - Powerful toolkit for building Web APIs
- **django-cors-headers** - CORS middleware for cross-origin requests

### Database & Storage
- **SQLite** - Lightweight, file-based database
- **Django Media Files** - Local file storage system

### Communication
- **REST API** - Standard HTTP-based API architecture

## 📖 Technology Justification

For a detailed explanation of why each technology was chosen and how it aligns with the assessment requirements, see:

**[TECHNOLOGY_JUSTIFICATION.md](./TECHNOLOGY_JUSTIFICATION.md)**

This document covers:
- Why each technology is the best fit
- How they meet assessment requirements
- Comparison with alternatives
- Future scalability options

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 16+** - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for version control)

### Verify Installation

```bash
# Check Python version
python --version
# Should show Python 3.8 or higher

# Check Node.js version
node --version
# Should show v16.0.0 or higher

# Check npm version
npm --version
# Should show 7.0.0 or higher
```

## 🚀 Quick Start Guide

### One-Command Setup (After Prerequisites)

**Windows (PowerShell):**
```powershell
# Backend
cd backend; .\venv\Scripts\Activate.ps1; python manage.py runserver

# Frontend (in new terminal)
cd frontend/my-react-app; npm run dev
```

**Linux/Mac:**
```bash
# Backend
cd backend && source venv/bin/activate && python manage.py runserver

# Frontend (in new terminal)
cd frontend/my-react-app && npm run dev
```

Then open `http://localhost:5173` in your browser!

---

## 🔧 Detailed Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Activate the virtual environment:
```bash
# Windows
.\venv\Scripts\Activate.ps1

# Linux/Mac
source venv/bin/activate
```

3. Install dependencies (if not already installed):
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create a superuser (optional, for admin access):
```bash
python manage.py createsuperuser
```

6. Start the Django development server:
```bash
python manage.py runserver
```

The backend will be running at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend/my-react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be running at `http://localhost:5173` (or another port if 5173 is occupied)

## 📡 API Endpoints

### Base URL
```
http://localhost:8000
```

### Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|---------------|----------|
| **POST** | `/documents/upload` | Upload a PDF file | `multipart/form-data` with `file` field | JSON with document metadata |
| **GET** | `/documents` | Get all documents | None | JSON array of documents |
| **GET** | `/documents/:id` | Download a specific file | None | PDF file (binary) |
| **DELETE** | `/documents/:id` | Delete a document | None | 204 No Content |

### Request/Response Examples

#### 1. Upload Document
**Request:**
```bash
POST /documents/upload
Content-Type: multipart/form-data

file: [PDF file]
```

**Response (201 Created):**
```json
{
  "id": 1,
  "filename": "medical_report.pdf",
  "uploaded_at": "2025-01-09T10:30:00Z",
  "file_size": 245760
}
```

#### 2. List All Documents
**Request:**
```bash
GET /documents
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "filename": "medical_report.pdf",
    "uploaded_at": "2025-01-09T10:30:00Z",
    "file_size": 245760
  },
  {
    "id": 2,
    "filename": "prescription.pdf",
    "uploaded_at": "2025-01-09T11:00:00Z",
    "file_size": 128000
  }
]
```

#### 3. Download Document
**Request:**
```bash
GET /documents/1
```

**Response (200 OK):**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="medical_report.pdf"

[PDF binary data]
```

#### 4. Delete Document
**Request:**
```bash
DELETE /documents/1
```

**Response (204 No Content):**
```
(empty body)
```

### Error Responses

**400 Bad Request** (Invalid file type):
```json
{
  "error": "Only PDF files are allowed"
}
```

**404 Not Found** (Document doesn't exist):
```json
{
  "error": "Document not found"
}
```

## 📁 Project Structure

```
.
├── backend/                          # Django backend application
│   ├── documents/                    # Main Django app
│   │   ├── __init__.py
│   │   ├── models.py                 # Document model (database schema)
│   │   ├── views.py                  # API endpoint handlers
│   │   ├── serializers.py           # Data serialization for API
│   │   ├── urls.py                   # URL routing for documents API
│   │   ├── admin.py                  # Django admin configuration
│   │   ├── migrations/               # Database migrations
│   │   │   └── 0001_initial.py
│   │   └── tests.py                  # Unit tests
│   ├── patient_portal/               # Django project settings
│   │   ├── __init__.py
│   │   ├── settings.py               # Django configuration
│   │   ├── urls.py                   # Main URL configuration
│   │   ├── wsgi.py                   # WSGI configuration
│   │   └── asgi.py                   # ASGI configuration
│   ├── media/                        # User-uploaded files
│   │   └── uploads/                  # PDF documents stored here
│   ├── venv/                          # Python virtual environment
│   ├── db.sqlite3                     # SQLite database file
│   ├── requirements.txt               # Python dependencies
│   └── manage.py                     # Django management script
│
├── frontend/                         # React frontend application
│   └── my-react-app/
│       ├── src/
│       │   ├── App.jsx               # Main application component
│       │   ├── App.css               # Main application styles
│       │   ├── main.jsx              # Application entry point
│       │   ├── index.css             # Global styles
│       │   └── components/
│       │       ├── UploadForm.jsx     # File upload component
│       │       ├── UploadForm.css    # Upload form styles
│       │       ├── DocumentList.jsx   # Document list component
│       │       └── DocumentList.css   # Document list styles
│       ├── public/                   # Static public files
│       ├── node_modules/             # npm dependencies
│       ├── package.json              # Node.js dependencies
│       ├── vite.config.js            # Vite configuration
│       └── index.html                 # HTML template
│
├── README.md                          # This file - complete guide
├── TECHNOLOGY_JUSTIFICATION.md       # Technology choices explanation
└── Full Stack Developer Assessment _ Entry Level.pdf  # Assessment document
```

### Key Files Explained

- **`backend/documents/models.py`**: Defines the Document database model
- **`backend/documents/views.py`**: Contains API endpoint logic (upload, list, download, delete)
- **`backend/documents/serializers.py`**: Converts Django models to JSON for API responses
- **`backend/patient_portal/settings.py`**: Django configuration (CORS, media files, installed apps)
- **`frontend/src/App.jsx`**: Main React component that orchestrates the app
- **`frontend/src/components/UploadForm.jsx`**: Handles file upload UI and logic
- **`frontend/src/components/DocumentList.jsx`**: Displays and manages document list

## 🎨 How to Use

### Quick Start (Running the Project)

#### Option 1: Run Both Servers Manually

**Terminal 1 - Backend:**
```bash
cd backend
.\venv\Scripts\Activate.ps1  # Windows PowerShell
# OR
source venv/bin/activate     # Linux/Mac

python manage.py runserver
```
Backend will run at: `http://localhost:8000`

**Terminal 2 - Frontend:**
```bash
cd frontend/my-react-app
npm run dev
```
Frontend will run at: `http://localhost:5173` (check terminal for actual port)

#### Option 2: Run Both Servers in Background
Both servers can run simultaneously in the background. Make sure you have:
1. Backend running on port 8000
2. Frontend running on port 5173 (or check terminal output)

### Step-by-Step Usage Guide

#### 1. **Access the Application**
   - Open your web browser
   - Navigate to `http://localhost:5173` (or the port shown in your terminal)
   - You should see the "Patient Document Portal" homepage

#### 2. **Upload a PDF Document**
   - Click on the file input field in the "Upload PDF Document" section
   - Select a PDF file from your computer
   - The file name and size will be displayed
   - Click the "Upload" button
   - Wait for the success message: "✓ Uploaded successfully!"
   - The document list will automatically refresh

#### 3. **View Uploaded Documents**
   - All uploaded documents appear in the "Uploaded Documents" section below
   - Each document card shows:
     - **Filename**: The name of the uploaded PDF
     - **Size**: File size in Bytes, KB, MB, or GB
     - **Uploaded**: Date and time when the file was uploaded
   - Documents are displayed in a responsive grid layout

#### 4. **Download a Document**
   - Find the document you want to download in the list
   - Click the blue "Download" button on the document card
   - The PDF file will be downloaded to your default downloads folder
   - The file will have the same name as when it was uploaded

#### 5. **Delete a Document**
   - Find the document you want to delete in the list
   - Click the red "Delete" button on the document card
   - A confirmation dialog will appear asking "Are you sure you want to delete this document?"
   - Click "OK" to confirm deletion
   - The document will be removed from both the database and the server's file system
   - The document list will automatically refresh

### Features Explained

#### Upload Form
- **File Validation**: Only PDF files (.pdf extension) are accepted
- **File Size Display**: Shows the selected file size before uploading
- **Upload Status**: Displays "Uploading..." during upload and success/error messages
- **Auto-refresh**: Document list updates automatically after successful upload

#### Document List
- **Empty State**: Shows "No documents uploaded yet" when no files exist
- **Card Layout**: Each document is displayed in a card with hover effects
- **Metadata Display**: Shows filename, file size, and upload timestamp
- **Action Buttons**: Download (blue) and Delete (red) buttons for each document
- **Responsive Design**: Adapts to different screen sizes

### Troubleshooting

#### Backend Not Starting
- **Issue**: `ModuleNotFoundError: No module named 'django'`
  - **Solution**: Activate the virtual environment first: `.\venv\Scripts\Activate.ps1`

- **Issue**: Port 8000 already in use
  - **Solution**: Use a different port: `python manage.py runserver 8001`

#### Frontend Not Starting
- **Issue**: `npm: command not found`
  - **Solution**: Install Node.js from https://nodejs.org/

- **Issue**: Port 5173 already in use
  - **Solution**: Vite will automatically use the next available port

#### Upload Fails
- **Check**: Make sure backend is running on `http://localhost:8000`
- **Check**: Verify the file is a PDF (ends with .pdf)
- **Check**: Check browser console for error messages
- **Check**: Ensure CORS is properly configured in Django settings

#### Documents Not Loading
- **Check**: Backend server is running
- **Check**: Network tab in browser DevTools shows successful API calls
- **Check**: Backend URL in frontend code matches your backend port

#### Download Not Working
- **Check**: File exists in `backend/media/uploads/` directory
- **Check**: Browser's download settings aren't blocking downloads
- **Check**: Check browser console for errors

### API Testing

You can test the API endpoints directly using tools like Postman or curl:

#### Upload a Document
```bash
curl -X POST http://localhost:8000/documents/upload \
  -F "file=@/path/to/your/file.pdf"
```

#### List All Documents
```bash
curl http://localhost:8000/documents
```

#### Download a Document
```bash
curl http://localhost:8000/documents/1 -o downloaded_file.pdf
```

#### Delete a Document
```bash
curl -X DELETE http://localhost:8000/documents/1
```

## 🔒 Security Notes

### Current Setup (Development)
This application is configured for **development use only**. The following security measures should be implemented for production:

### Production Security Checklist

- [ ] **Environment Variables**: Move sensitive settings (SECRET_KEY, database credentials) to environment variables
- [ ] **Authentication**: Implement user authentication (JWT, OAuth2, or session-based)
- [ ] **Authorization**: Add role-based access control (RBAC) to restrict document access
- [ ] **HTTPS**: Use SSL/TLS certificates for encrypted communication
- [ ] **CORS Configuration**: Restrict CORS to specific domains instead of allowing all origins
- [ ] **File Size Limits**: Implement maximum file size restrictions (e.g., 10MB per file)
- [ ] **File Type Validation**: Add MIME type checking in addition to extension validation
- [ ] **Rate Limiting**: Prevent abuse with rate limiting (e.g., 10 uploads per minute)
- [ ] **Input Sanitization**: Sanitize filenames to prevent path traversal attacks
- [ ] **SQL Injection Protection**: Django ORM provides this, but ensure no raw SQL queries
- [ ] **XSS Protection**: Ensure React properly escapes user input
- [ ] **CSRF Protection**: Django provides CSRF tokens, ensure they're properly configured
- [ ] **Security Headers**: Add security headers (X-Content-Type-Options, X-Frame-Options)
- [ ] **Logging & Monitoring**: Implement logging for security events
- [ ] **Backup Strategy**: Regular backups of database and uploaded files

### Current Security Features

✅ **CSRF Protection**: Enabled by Django middleware  
✅ **SQL Injection Protection**: Django ORM prevents SQL injection  
✅ **File Validation**: Only PDF files accepted  
✅ **CORS Configuration**: Configured for development origins  
✅ **XSS Protection**: React escapes content by default  

### Recommended Production Stack

- **Web Server**: Nginx or Apache
- **Application Server**: Gunicorn or uWSGI
- **Database**: PostgreSQL (instead of SQLite)
- **File Storage**: AWS S3, Azure Blob Storage, or Google Cloud Storage
- **CDN**: CloudFront or Cloudflare for static assets
- **Monitoring**: Sentry for error tracking
- **Backup**: Automated daily backups

## 📝 Important Notes

- **File Format**: Only PDF files are accepted for upload
- **File Storage**: Files are stored in `backend/media/uploads/`
- **Database**: SQLite (default Django setup) - database file is `backend/db.sqlite3`
- **CORS**: Configured to allow requests from `http://localhost:5173` and `http://localhost:3000`
- **File Deletion**: Deleting a document removes it from both the database AND the file system
- **Auto-refresh**: The document list automatically refreshes after upload/delete operations

## 🔍 Verifying Everything Works

1. **Backend Health Check**: Visit `http://localhost:8000/documents/` - should return `[]` (empty array) or a JSON array of documents
2. **Frontend Check**: Visit `http://localhost:5173` - should show the Patient Document Portal interface
3. **Upload Test**: Try uploading a PDF file - should see success message
4. **List Test**: After uploading, the document should appear in the list
5. **Download Test**: Click download - file should download to your computer
6. **Delete Test**: Click delete and confirm - document should disappear from the list

## 🛠️ Development Commands

### Backend Commands
```bash
# Create migrations after model changes
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Access Django admin (requires superuser)
python manage.py createsuperuser
# Then visit: http://localhost:8000/admin/

# Run tests
python manage.py test
```

### Frontend Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📊 Database Management

The application uses SQLite by default. The database file is located at:
- `backend/db.sqlite3`

To view/edit data directly:
- Use Django admin: `http://localhost:8000/admin/`
- Use SQLite browser tools
- Use Django shell: `python manage.py shell`

## 🗂️ File Management

### File Storage Location
Uploaded files are stored in:
- **Path**: `backend/media/uploads/`
- **Format**: Original filename is preserved
- **Organization**: All files in a single directory (can be organized by date/user in future)

### File Operations

#### Manual File Management
- **View Files**: Navigate to `backend/media/uploads/` directory
- **Delete Files**: Can delete manually, but database records will remain (use Django admin or API)
- **Backup Files**: Copy the entire `media/` directory

#### Automatic File Management
- **Upload**: Files are automatically saved with original names
- **Delete**: When deleting through UI/API, files are automatically removed from disk
- **Cleanup**: Django handles file cleanup when model instances are deleted

### File Naming
- Files keep their original names as uploaded
- If duplicate names exist, Django automatically appends a unique suffix
- Example: `report.pdf`, `report_abc123.pdf` (if duplicate)

### Storage Considerations
- **Development**: Local file storage is sufficient
- **Production**: Consider cloud storage (AWS S3, Azure Blob) for:
  - Scalability
  - Reliability
  - Backup and disaster recovery
  - CDN integration

---

## 📚 Additional Resources

### Documentation
- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

### Learning Resources
- [Django REST Framework Tutorial](https://www.django-rest-framework.org/tutorial/quickstart/)
- [React Official Tutorial](https://react.dev/learn)
- [REST API Best Practices](https://restfulapi.net/)

### Support
- Check [Troubleshooting](#-troubleshooting) section for common issues
- Review [Technology Justification](./TECHNOLOGY_JUSTIFICATION.md) for architecture decisions
- Check browser console and Django server logs for errors

---

## 📝 License

This project is created for assessment purposes.

---

## 👨‍💻 Development Notes

### Code Quality
- **Backend**: Follows Django best practices and PEP 8 style guide
- **Frontend**: Uses React hooks and modern JavaScript (ES6+)
- **Styling**: CSS with variables for maintainability
- **Structure**: Clean separation of concerns (components, views, models)

### Future Enhancements
- User authentication and authorization
- File versioning
- Search and filter functionality
- Bulk operations (upload/delete multiple files)
- File preview (PDF viewer)
- Export metadata to CSV/Excel
- Email notifications
- Activity logs

---

**Last Updated**: January 2025  
**Version**: 1.0.0
