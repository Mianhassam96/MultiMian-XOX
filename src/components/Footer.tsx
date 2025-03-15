
import { Github } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer
      className="w-full mt-12 mb-4 text-center text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2 text-sm">
          <span>© {currentYear} MultiMian XOX</span>
          <span className="text-muted-foreground/50">|</span>
          <span>Ultimate Gaming Experience</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Github size={14} />
            <span>GitHub</span>
          </a>
          <span className="text-muted-foreground/50">|</span>
          <a 
            href="#privacy" 
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
          <span className="text-muted-foreground/50">|</span>
          <a 
            href="#terms" 
            className="hover:text-primary transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
