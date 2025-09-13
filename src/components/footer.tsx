export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6">
            <div className="flex justify-between gap-8 px-10">
                <p className='text-gray-300'>&copy; 2025 ResumeBoost AI. Creado por Busid.</p>
                <ul className="flex gap-4 items-center text-sm text-gray-300 sm:mt-0">
                    <li>
                        <a href="https://github.com/Busid1" target="_blank" className="hover:underline"><i
                            className="fab fa-github text-lg"></i> GitHub</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/busid/" target="_blank" className="hover:underline"><i
                            className="fab fa-linkedin text-lg"></i> Linkedin</a>
                    </li>
                    <li>
                        <a href="https://busid.netlify.app/" target="_blank" className="hover:underline"><i
                            className="fas fa-globe text-lg"></i> Portfolio</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}