
import { Github, Globe, Coffee, Heart } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer
      className="w-full mt-12 mb-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 max-w-3xl mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-primary/10 rounded-full"
            >
              <Globe size={18} className="text-primary" />
            </motion.div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm">MultiMian XOX</span>
              <span className="text-xs text-muted-foreground">© {currentYear} All rights reserved</span>
            </div>
          </div>
          
          <motion.div className="flex items-center gap-4">
            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center text-xs text-muted-foreground"
            >
              <span>Made with </span>
              <Heart size={12} className="mx-1 text-game-o" fill="currentColor" />
              <span>by MultiMian</span>
            </motion.div>
          </motion.div>
          
          <motion.div className="flex items-center gap-3 text-sm">
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors p-1.5 bg-secondary/50 rounded-md"
              whileHover={{ y: -2, backgroundColor: "rgba(var(--primary), 0.1)" }}
            >
              <Github size={14} />
              <span className="text-xs">GitHub</span>
            </motion.a>
            
            <motion.a 
              href="#privacy" 
              className="flex items-center gap-1 hover:text-primary transition-colors p-1.5 bg-secondary/50 rounded-md"
              whileHover={{ y: -2, backgroundColor: "rgba(var(--primary), 0.1)" }}
            >
              <Coffee size={14} />
              <span className="text-xs">Support</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
