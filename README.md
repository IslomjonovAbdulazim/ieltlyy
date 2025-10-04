# IELTS Portal — Full-Stack Testing Platform

A complete IELTS testing platform with student test-taking interface and admin dashboard for creating and managing tests, grading submissions, and viewing analytics.

## 🎨 Theme

**Purple Brand Color**: `#6B46C1` - Used throughout the platform for CTAs, accents, and brand elements.

## 🏗️ Tech Stack

- **Frontend**: Next.js 15 + React + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Auth**: JWT + bcrypt with role-based access (admin/student)
- **File Storage**: Multer (local) with AWS S3 support
- **Database**: MongoDB with Mongoose ODM

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── tests/             # Student test pages
│   │   ├── dashboard/         # Student & admin dashboards
│   │   └── api/               # Next.js API routes (legacy)
│   ├── components/            # React components
│   │   ├── tests/             # Test-taking components
│   │   ├── sections/          # Landing page sections
│   │   └── ui/                # Reusable UI components
│   ├── server/                # Express backend
│   │   ├── controllers/       # Route controllers
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Auth & upload middleware
│   │   └── scripts/           # Seed script
│   └── lib/                   # Utilities
└── public/                    # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB instance (local or Atlas)

### 1. Clone and Install

```bash
git clone <repository-url>
cd ielts-portal
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/ielts-portal

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Backend URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000

# Optional: AWS S3 (for production file uploads)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your-bucket-name
```

### 3. Seed Database

Run the seed script to create sample data:

```bash
npm run seed
```

This creates:
- 1 admin user (admin@test.com / Admin123!)
- 1 student user (student@test.com / Student123!)
- 1 Listening test with 4 parts × 10 MCQs each
- 1 Reading test with 3 parts (40 questions total)
- 1 Writing test with 2 prompts
- 1 Speaking test with sample prompts

### 4. Run Development Servers

**Terminal 1 - Express Backend:**
```bash
npm run server
```
Server runs on `http://localhost:4000`

**Terminal 2 - Next.js Frontend:**
```bash
npm run dev
```
Frontend runs on `http://localhost:3000`

## 🔑 Default Credentials

After seeding, you can login with:

**Admin:**
- Email: `admin@test.com`
- Password: `Admin123!`

**Student:**
- Email: `student@test.com`
- Password: `Student123!`

## 📚 API Documentation

### Authentication Endpoints

**POST** `/auth/signup`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!",
  "role": "student"
}
```

**POST** `/auth/login`
```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```
Returns: `{ token, user }`

**GET** `/auth/me` (requires JWT)
Returns current user profile

### Tests Endpoints

**GET** `/tests` - List all tests (filter by `?type=listening`)

**GET** `/tests/:testId` - Get full test details

**POST** `/tests` - Create test (admin only)

**PUT** `/tests/:testId` - Update test (admin only)

**DELETE** `/tests/:testId` - Delete test (admin only)

### Submissions Endpoints

**POST** `/tests/:testId/submit` - Submit test answers
```json
{
  "userId": "user_id",
  "partResults": [
    {
      "partNumber": 1,
      "answers": ["A", "B", "C"],
      "score": 8,
      "maxScore": 10
    }
  ]
}
```

**GET** `/submissions/:submissionId` - Get submission details

**GET** `/users/:userId/submissions` - User's submission history

**GET** `/admin/submissions` - All submissions (admin only)

**PUT** `/admin/submissions/:submissionId/grade` - Manual grading (admin only)

### File Upload Endpoints

**POST** `/upload/audio` - Upload audio file (admin only)

Returns: `{ url: "/uploads/audio/filename.mp3" }`

### Analytics Endpoints

**GET** `/admin/analytics/summary` - Dashboard statistics (admin only)

Returns:
```json
{
  "totalUsers": 150,
  "totalAttempts": 450,
  "avgScoresByType": {
    "listening": 7.5,
    "reading": 7.8,
    "writing": 6.9,
    "speaking": 7.2
  },
  "topTests": [...]
}
```

## 🎯 Features

### For Students
- Browse and take Listening, Reading, Writing, Speaking tests
- Audio player for Listening tests with playback controls
- Real-time auto-grading for MCQ-based sections
- Text input for Writing tasks with word count
- Audio recording for Speaking responses (browser MediaRecorder)
- View submission history and scores

### For Admins
- Full CRUD for tests, parts, and questions
- Upload audio files for Listening tests
- Manual grading interface for Writing and Speaking
- View all submissions with filtering
- Dashboard analytics (user stats, completion rates, avg scores)
- Validation rules enforcement:
  - Listening: Must have exactly 4 parts with 10 questions each
  - Reading: Must have exactly 40 questions total across 3 parts

## 🧪 Testing the API

Use the included curl commands or import into Postman:

```bash
# Login and get token
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"Student123!"}'

# Get all tests
curl http://localhost:4000/tests

# Get test by ID
curl http://localhost:4000/tests/<test-id>

# Submit test (use token from login)
curl -X POST http://localhost:4000/tests/<test-id>/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"userId":"<user-id>","partResults":[...]}'
```

## 🎨 Customization

### Changing Theme Colors

Edit `src/app/globals.css`:
```css
--color-brand-primary: #6B46C1; /* Change this hex value */
```

All components use CSS variables, so changing this one value updates the entire theme.

### Adding New Test Types

1. Update `src/server/models/Test.ts` with new type
2. Create new test component in `src/components/tests/`
3. Add routing in `src/components/tests/TestTaker.tsx`
4. Update seed script if needed

## 🐳 Docker Setup (Optional)

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
  
  backend:
    build: .
    ports:
      - "4000:4000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/ielts-portal
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongodb

volumes:
  mongo-data:
```

Run with:
```bash
docker-compose up
```

## 📝 Development Stages

This project was built in 6 stages:

✅ **Stage 1**: Backend foundation - Express models, seed script, core APIs  
✅ **Stage 2**: Admin CRUD APIs - File uploads, submissions, analytics  
✅ **Stage 3**: Student web - Tests listing, navigation  
✅ **Stage 4**: Test-taking flows - Listening audio, Reading passages, Writing textareas, Speaking recorder  
✅ **Stage 5**: Admin Dashboard UI - Manual grading, submissions list, analytics display  
✅ **Stage 6**: Polish - Purple theme, documentation, Docker setup  

## 🔒 Security Notes

- All passwords are hashed with bcrypt
- JWT tokens expire (configure in `src/server/config/jwt.config.ts`)
- Admin routes protected by role-based middleware
- File uploads validated for MIME type and size
- Input sanitization recommended for production

## 📞 Support

For issues or questions:
- Check the API documentation above
- Review seed data structure in `src/server/scripts/seed.ts`
- Verify MongoDB connection in `.env`
- Ensure both servers (Express + Next.js) are running

## 📄 License

MIT License - Feel free to use for educational or commercial projects.

---

**Built with ❤️ for IELTS learners worldwide**