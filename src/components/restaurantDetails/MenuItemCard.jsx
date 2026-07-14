import { useTheme } from "/src/context/ThemeContext";

function MenuItemCard({ item, onAdd }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            className={`rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${isDark ? "bg-[#03081f]" : "bg-white"
                }`}
        >
            <img
                src={
                    item.image
                        ? `http://127.0.0.1:8000${item.image}`
                        : "/src/assets/placeholder-food.png"
                }
                alt={item.name}
                className="w-full h-44 object-cover"
            />

            <div className="p-4">
                <h3
                    className={`font-bold text-lg ${isDark ? "text-brand-orange" : "text-black"
                        }`}
                >
                    {item.name}
                </h3>

                <p
                    className={`text-sm mt-2 line-clamp-2 ${isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                >
                    {item.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-brand-orange">
                        ${item.price}
                    </span>

                    <button
                        onClick={onAdd}
                        className="bg-brand-orange text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                    >
                        + Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MenuItemCard;