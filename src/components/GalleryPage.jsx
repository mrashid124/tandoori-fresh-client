import PropTypes from "prop-types";

const GalleryPage = ({ data }) => {
    const { displayName, Feedback, PhotoURL } = data || {};
  
    return (
      <div className="card bg-[#FAF3E0] shadow-lg border border-[#8B4513] rounded-lg overflow-hidden group">
        <figure className="relative overflow-hidden">
          <img
            src={PhotoURL}
            alt={displayName}
            className="w-full h-[350px] md:h-[450px] lg:h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
            <h1 className="text-white text-2xl md:text-3xl font-bold">{displayName}</h1>
            <p className="text-white text-sm md:text-base mt-2 opacity-90">{Feedback}</p>
          </div>
        </figure>
      </div>
    );
  };
  
  GalleryPage.propTypes = {
    data: PropTypes.object.isRequired,
  };
  
  export default GalleryPage;