import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 py-8 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400">© 2025 Micho Calma. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="https://github.com/webdevMLC" className="text-gray-400 hover:text-purple-400 transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/micho-calma-423804174/" className="text-gray-400 hover:text-purple-400 transition-colors">LinkedIn</a>
          <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Twitter</a>
          <a href="https://www.upwork.com/freelancers/~01839d09f7849ea05e?mp_source=share" className="text-gray-400 hover:text-purple-400 transition-colors">Upwork</a>
        </div>
      </div>
    </footer>
  );
}