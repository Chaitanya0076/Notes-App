# Notes Application

A modern, full-stack notes application built with Next.js, featuring real-time updates, AI-powered features, and a beautiful user interface.

## Features

- 📝 Create, edit, and delete notes
- 🔍 Advanced search functionality
- 🤖 AI-powered features using Google's Generative AI
- 🌙 Dark/Light mode support
- 🔒 User authentication
- 📱 Responsive design
- ⚡ Real-time updates
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Prisma ORM
- **Authentication**: Supabase
- **AI Integration**: Google Generative AI (Gemini)
- **UI Components**: Radix UI
- **State Management**: React Hooks
- **Deployment**: Vercel (recommended)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Google Generative AI (Gemini) API key
- PostgreSQL database (for local development)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/notes-app.git
   cd notes-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables (refer to `.env.type` for the required variables):
   ```env
   # Database Configuration
   DATABASE_URL=your_database_url
   
   # Supabase Configuration
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Application Configuration
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   
   # AI Configuration
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Run database migrations:
   ```bash
   npm run migrate
   # or
   yarn migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:3000`

## Environment Variables

The application uses the following environment variables (defined in `.env.type`):

- `DATABASE_URL`: Your PostgreSQL database connection string
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_BASE_URL`: The base URL of your application
- `GEMINI_API_KEY`: Your Google Generative AI (Gemini) API key

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run migrate` - Run database migrations

## Project Structure

```
notes-app/
├── app/              # Next.js app directory
├── components/       # Reusable UI components
├── actions/          # Server actions
├── hooks/           # Custom React hooks
├── providers/       # Context providers
├── lib/             # Utility functions
├── prisma/          # Database schema and migrations
├── public/          # Static assets
├── auth/            # Authentication related code
├── .env.type        # Environment variable type definitions
└── .env             # Environment variables (not tracked in git)
```

## Development

### Local Development

1. Ensure you have PostgreSQL running locally
2. Create a new database for the application
3. Update the `DATABASE_URL` in your `.env` file
4. Run migrations to set up the database schema
5. Start the development server

### Environment Variables

The `.env.type` file serves as a template for required environment variables. Copy this file to `.env` and fill in the appropriate values for your environment.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Supabase for authentication and database
- Google for the Generative AI (Gemini) API
- All contributors and maintainers
