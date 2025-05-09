function PrimaryBtn({ isLoading = true, text }) {
  return (
    <button
      className={`primary ${
        isLoading ? "grayscale-[0.5] animate-pulse" : "grayscale-0"
      }`}
    >
      {text}
    </button>
  );
}

export default PrimaryBtn;
