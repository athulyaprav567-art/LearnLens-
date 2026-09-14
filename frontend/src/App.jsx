import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-indigo-700 mb-2">LearnLens</h1>
        <p className="text-gray-500 text-lg">Hackathon Project Foundation</p>
      </div>
      <div className="flex gap-6">
        <Link
          to="/student"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-md transition"
        >
          Student View
        </Link>
        <Link
          to="/teacher"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-md transition"
        >
          Teacher View
        </Link>
      </div>
      <p className="text-sm text-gray-400">
        Shared project scaffold — do not build features here directly.
      </p>
    </div>
  );
}

function StudentPlaceholder() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-indigo-50">
      <h2 className="text-3xl font-bold text-indigo-600">Student Area</h2>
      <p className="text-gray-500">
        Student features go inside{" "}
        <code className="bg-indigo-100 px-1 rounded">src/student/</code>
      </p>
      <Link to="/" className="text-indigo-500 hover:underline mt-4">
        Back to Home
      </Link>
    </div>
  );
}

function TeacherPlaceholder() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-emerald-50">
      <h2 className="text-3xl font-bold text-emerald-600">Teacher Area</h2>
      <p className="text-gray-500">
        Teacher features go inside{" "}
        <code className="bg-emerald-100 px-1 rounded">src/teacher/</code>
      </p>
      <Link to="/" className="text-emerald-500 hover:underline mt-4">
        Back to Home
      </Link>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-4xl font-bold text-gray-700">404</h2>
      <p className="text-gray-500">Page not found.</p>
      <Link to="/" className="text-indigo-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student/*" element={<StudentPlaceholder />} />
      <Route path="/teacher/*" element={<TeacherPlaceholder />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}