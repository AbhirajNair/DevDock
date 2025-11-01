import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import './index.css';

export default function AppWrapper({ children }) {
  return (
    <>
      <Toaster position="bottom-right" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        {children}
      </motion.div>
    </>
  );
}
