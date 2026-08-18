import { motion } from "framer-motion";

function FilterTabs({ selected, setSelected }) {
  const tabs = [
    "All Events",
    "Upcoming",
    "Past Events",
  ];

  return (
    <div className="flex justify-center mt-6 mb-8">

      <div className="bg-white shadow-lg rounded-full p-2 flex gap-2">

        {tabs.map((tab) => (

          <button
            key={tab}
            onClick={() => setSelected(tab)}
            className="relative px-6 py-3 rounded-full font-semibold transition duration-300 overflow-hidden"
          >

            {/* Active Background */}

            {selected === tab && (

              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-blue-600 rounded-full"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />

            )}

            {/* Text */}

            <span
              className={`relative z-10 ${
                selected === tab
                  ? "text-white"
                  : "text-gray-700"
              }`}
            >
              {tab}
            </span>

          </button>

        ))}

      </div>

    </div>
  );
}

export default FilterTabs;