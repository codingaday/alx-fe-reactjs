const Card = (props) => {
  const { image, title, summary } = props;
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-transform transform hover:scale-105">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-xl font-semibold mt-2">{title}</h2>
      <p className="text-gray-600 mt-1">{summary}</p>
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
        View Recipe
      </button>
    </div>
  );
};
export default Card;
