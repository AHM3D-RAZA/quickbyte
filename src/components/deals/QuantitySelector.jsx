function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
      <button
        onClick={onDecrease}
        className="w-11 h-11 flex items-center justify-center text-xl text-gray-600 hover:bg-gray-100 cursor-pointer"
      >
        −
      </button>
      <span className="w-10 text-center font-bold text-lg">{quantity}</span>
      <button
        onClick={onIncrease}
        className="w-11 h-11 flex items-center justify-center text-xl text-gray-600 hover:bg-gray-100 cursor-pointer"
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;