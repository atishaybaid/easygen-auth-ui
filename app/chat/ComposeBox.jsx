const ComposeBox = () => {
  return (
    <div className="h-1/6 border-solid border-2 border-gray-600">
      <input
        class="placeholder:italic placeholder:text-slate-400 h-1/2 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Tye Your Message..."
        type="text"
        name="search"
      />
      <button className="border border-slate-300 rounded-md">Send</button>
    </div>
  );
};

export default ComposeBox;
