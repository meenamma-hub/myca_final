import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Welcome() {

    const navigate = useNavigate();
    const [showArrow, setShowArrow] = useState(false);

    return (

        <div className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 flex justify-center items-center">

            {/* Floating particles */}

            {[...Array(40)].map((_, index) => (

                <motion.div

                    key={index}

                    className="absolute rounded-full bg-yellow-300 opacity-30"

                    style={{
                        width: Math.random() * 6 + 3,
                        height: Math.random() * 6 + 3,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}

                    animate={{
                        y: [-20, -400],
                        opacity: [0.5, 0],
                        scale: [1, 0.2],
                    }}

                    transition={{
                        duration: 8 + Math.random() * 6,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                    }}

                />

            ))}

            {/* Main Content */}

            <div className="text-center">

                <motion.h1

                    initial={{ opacity: 0, y: -80 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{ duration: 1 }}

                    className="text-7xl md:text-8xl font-extrabold text-white tracking-[12px]"

                >

                    WELCOME

                </motion.h1>

                <motion.h2

                    initial={{ opacity: 0 }}

                    animate={{ opacity: 1 }}

                    transition={{ delay: 1 }}

                    className="text-3xl text-gray-300 mt-6"

                >

                    TO

                </motion.h2>

                <motion.h1

                    initial={{ opacity: 0, scale: 0 }}

                    animate={{
                        opacity: 1,
                        scale: 1,
                        textShadow: [
                            "0px 0px 10px #38bdf8",
                            "0px 0px 35px #38bdf8",
                            "0px 0px 20px #38bdf8"
                        ]
                    }}

                    transition={{
                        delay: 2,
                        duration: 1.2,
                        type: "spring"
                    }}

                    className="text-8xl md:text-9xl font-black text-cyan-300 mt-5"

                >

                    MYCA

                </motion.h1>

                <motion.h3

                    initial={{ opacity: 0, y: 40 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{ delay: 3 }}

                    onAnimationComplete={() => setShowArrow(true)}

                    className="text-3xl md:text-4xl mt-5 font-semibold text-yellow-300"

                >

                    Events of YMCA

                </motion.h3>

            </div>

            {showArrow && (

                <motion.button

                    initial={{ opacity: 0, x: 80 }}

                    animate={{
                        opacity: 1,
                        x: 0,
                        y: [0, -12, 0],
                        boxShadow: [
                            "0px 0px 10px #fde047",
                            "0px 0px 25px #fde047",
                            "0px 0px 10px #fde047"
                        ]
                    }}

                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                    }}

                    onClick={() => navigate("/description")}

                    className="fixed bottom-8 right-8 bg-yellow-400 hover:bg-yellow-300 p-5 rounded-full"

                >

                    <FaArrowRight className="text-2xl text-black"/>

                </motion.button>

            )}

        </div>

    );

}

export default Welcome;