import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigation = useNavigate();

  return (
       <div className="h-screen flex items-center justify-center">

        <div className="flex flex-col items-center">
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 60 }}
            className="text-7xl mb-8"
          >
            🥗
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-green-800 mb-6 text-center"
          >
            Bienvenido María
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-2xl bg-green-600 text-white font-semibold shadow-lg"
            onClick={() => navigation(`plato`)}
          >
            Comenzar
          </motion.button>
        </div>
     
    </div>
  );
}
