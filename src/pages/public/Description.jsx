import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Description() {
const navigate = useNavigate();
    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 flex justify-center items-center">

            <motion.div

                initial={{ opacity: 0, y: 60 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 1 }}

                className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 w-11/12 md:w-3/4 text-center shadow-2xl"

            >

                <h1 className="text-5xl font-bold text-cyan-300">

                    Welcome to MYCA

                </h1>

                <h2 className="text-3xl mt-5 text-yellow-300">

                    Events of YMCA

                </h2>

                <p className="mt-8 text-gray-200 text-xl leading-9">

                    MYCA is your one-stop platform for discovering, exploring, and participating in exciting events organized at YMCA. Stay informed about upcoming technical, cultural, sports, and academic activities, register with ease, and never miss an opportunity to engage with the university community.

                </p>

                <motion.button
                onClick={() => navigate("/student/dashboard")}

                    whileHover={{ scale: 1.08 }}

                    whileTap={{ scale: 0.95 }}

                    className="mt-10 px-8 py-3 bg-cyan-400 text-black font-bold rounded-full"

                >

                    Explore Events

                </motion.button>

            </motion.div>

        </div>

    );

}

export default Description;