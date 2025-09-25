import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6">
            <div className="flex flex-col justify-between max-sm:gap-4 gap-8 px-10">
                <p className='text-gray-300'>&copy; 2025 PerfectCV AI. Creado por Busid.</p>
                <ul className="flex gap-4 items-center text-sm text-gray-300 sm:mt-0">
                    <li>
                        <a href="https://github.com/Busid1" target="_blank" className="hover:underline">
                            <FontAwesomeIcon icon={faGithub} className="text-lg" /> GitHub
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/busid/" target="_blank" className="hover:underline">
                            <FontAwesomeIcon icon={faLinkedin} className="text-lg" /> LinkedIn
                        </a>
                    </li>
                    <li>
                        <a href="https://busid.netlify.app/" target="_blank" className="hover:underline">
                            <FontAwesomeIcon icon={faGlobe} className="text-lg" /> Portfolio
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}