function DeliveryPopup({ isOpen, status, postcode, onPostcodeChange, onFind, onCollect, onClose, image }) {
  if (!isOpen) return null; // conditional rendering: render nothing if closed

  // Pick heading color + button color based on status
  const accentColor =
    status === "error" ? "text-[#e12b25]" :
    status === "success" ? "text-[#049801]" :
    "text-[#03081f]";

  const buttonColor = status === "success" ? "bg-[#03081f]" : "bg-[#fc8a06]";
  const buttonLabel = status === "success" ? "Change" : "Find";

  return (
    // Fixed overlay covering the whole screen, centers the modal
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[1270px] flex overflow-hidden">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl cursor-pointer"
        >
          ×
        </button>

        {/* Left: photo with orange accent border */}
        <div className="hidden md:block w-[35%] shrink-0">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover border-r-[11px] border-[#fc8a06]"
          />
        </div>

        {/* Right: form content */}
        <div className="flex-1 flex flex-col justify-center px-10 py-12 font-poppins">
          <h2 className={`text-3xl md:text-[42px] font-bold leading-tight mb-4 ${accentColor}`}>
            {status === "success" ? (
              <>You're All Set!<br />Post Code Submitted</>
            ) : (
              <>Please Enter Your<br />Post Code</>
            )}
          </h2>

          {status === "error" && (
            <p className="text-[#e12b25] font-bold text-lg mb-4">
              Sorry, we don't do delivery to your area.
            </p>
          )}

          <p className="text-black text-lg mb-8">
            To start placing delivery order, please<br />enter your full postcode here
          </p>

          <div className="flex mb-8">
            <input
              type="text"
              value={postcode}
              onChange={(e) => onPostcodeChange(e.target.value)}
              placeholder="eg. AA1 1BB"
              className="flex-1 bg-[#efefef] rounded-l-full px-6 py-4 text-xl outline-none"
            />
            <button
              onClick={onFind}
              className={`${buttonColor} text-white font-bold text-lg px-8 rounded-r-full cursor-pointer hover:opacity-90`}
            >
              {buttonLabel}
            </button>
          </div>

          <div className="text-center text-gray-500 mb-6">or</div>

          <button
            onClick={onCollect}
            className="text-[#03081f] font-bold text-lg underline text-center cursor-pointer"
          >
            I want to come and collect
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeliveryPopup;