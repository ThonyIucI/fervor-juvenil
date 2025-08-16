import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6">
            <h1 className="text-6xl font-extrabold text-indigo-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Página no encontrada</h2>
            <p className="text-center mb-6 max-w-md">
                Lo sentimos, la página que estás buscando no existe o fue movida.
            </p>
            <Link
                to="/"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
                Volver al inicio
            </Link>
        </div>
    );
}
