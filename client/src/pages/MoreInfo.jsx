import * as React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MaximizeIcon from "@mui/icons-material/OpenInFull";
import MinimizeIcon from "@mui/icons-material/CloseFullscreen";
import Spinner from "../components/ui/spinner";
import { useAuth } from "../context/authContext";
import { useAddToMyList } from "../hooks/useMyMovieList";
import { useNavigate, useParams } from "react-router-dom";
import { useProgramDetails } from "../hooks/useProgramDetails";
import EpisodesList from "../components/MoreInfo/EpisodesList";
import ExtraProgramDetails from "../components/MoreInfo/ExtraProgramDetails";

export default function MoreInfo({ isOpen = true, onClose = () => {} }) {
  const { id: programId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [open, setOpen] = React.useState(isOpen);
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const { data, isLoading } = useProgramDetails(programId);
  const { mutate: addToList, isLoading: isAdding } = useAddToMyList();
  const isTvSeries = data?.first_air_date !== undefined;

  const handleClose = () => {
    onClose();
    setOpen(false);
    setIsFullScreen(false);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleAddToList = () => {
    if (!data) return;
    const payload = {
      movieId: data.id,
      userId: user._id,
      title: data.title,
      posterPath: data.poster_path,
    };
    addToList(payload);
  };

  if (isLoading) return <Spinner />;
  if (!data) return null;

  console.log("data:", data);
  return (
    <Dialog
      fullScreen={isFullScreen}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          width: isFullScreen ? "100vw" : "80vw",
          height: isFullScreen ? "100vh" : "70vh",
          maxWidth: "100%",
          overflowX: "hidden",
          margin: isFullScreen ? 0 : "auto",
          color: "white",
          backgroundColor: "rgba(20, 20, 20, 0.9)",
          position: "relative",
        },
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120%",
          backgroundImage: `url('https://image.tmdb.org/t/p/w500${data?.backdrop_path}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "120%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.8) 100%)",
        }}
      >
        <DialogTitle sx={{ m: 0, p: 0 }}>
          <Box sx={{ position: "absolute", right: 8, top: 8 }}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={toggleFullScreen}
              aria-label={isFullScreen ? "minimize" : "maximize"}
              sx={{ mr: 1 }}
            >
              {isFullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => {
                onClose();
                navigate("/home");
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            overflowX: "hidden",
            overflowY: "auto",
            height: "auto",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <Box
            sx={{
              width: "100%",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <div className="flex gap-1 items-center mt-64 relative z-10">
              <img
                src={"./NetflixLogoLetter.png"}
                alt="Logo"
                className="w-3 h-6"
              />
              <span className="font-light text-gray-300">
                {data.genres?.map((genre) => genre.name).join(", ")}
              </span>
            </div>

            <h1 className="font-extrabold text-3xl uppercase flex justify-start">
              {data.original_title}
            </h1>

            <div className="flex gap-2 items-center">
              <button
                className="mt-5 w-24 h-8 bg-white rounded-sm text-black flex items-center justify-center gap-3"
                onClick={() =>
                  navigate(
                    `review/${programId}?posterPath=${data?.poster_path}`
                  )
                }
              >
                <i className="fa-solid fa-play"></i> Review
              </button>
              <button
                className="w-8 mt-5 h-8 rounded-full bg-transparent border border-gray-400 flex items-center justify-center"
                onClick={handleAddToList}
                disabled={isAdding}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>

            <div className="flex flex-wrap md:flex-nowrap items-center w-full justify-between px-3 mt-14">
              <div id="left-info" className="flex justify-center flex-col">
                <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                  <div className="text-gray-300">
                    <span className="text-[#46D369]">New</span>{" "}
                    {data.genres?.length || 0} Seasons
                  </div>
                  <img
                    src="./HD.png"
                    alt="HD"
                    className="w-7 h-4 md:w-5 md:h-3"
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="border border-gray-500 flex justify-center items-center w-14 md:w-20 h-5 text-xs md:text-sm">
                    {data.original_language?.toUpperCase()}
                  </span>
                  <span className="text-gray-300 text-xs md:text-sm">
                    {data.origin_country?.join(", ")}
                  </span>
                </div>
                <div className="flex items-center justify-start md:gap-2 mt-4">
                  <img
                    src="./Label.png"
                    alt=""
                    className="w-4 h-4 md:w-6 md:h-6"
                  />
                  <span className="text-white font-bold text-sm md:text-xl">
                    #2 in TV Shows Today
                  </span>
                </div>
                <div className="w-full p-2 md:p-0 md:w-1/2 flex justify-start text-sm text-gray-100 mt-4">
                  <p className="text-left leading-tight md:leading-relaxed">
                    {data.overview}
                  </p>
                </div>
              </div>
              <div
                id="right-info"
                className="mt-5 md:mt-12 flex justify-center flex-col"
              >
                <p className="text-white text-xs font-thin md:text-sm text-left">
                  <span className="text-gray-400">Cast: </span>
                  {data.production_companies
                    ?.map((company) => company.name)
                    .join(", ")}
                </p>
                <p className="text-white text-xs font-thin md:text-sm text-left">
                  <span className="text-gray-400">Genres: </span>
                  {data.genres?.map((genre) => genre.name).join(", ")}
                </p>
                <p className="text-white text-xs font-thin md:text-sm text-left">
                  <span className="text-gray-400">This show is: </span>
                  {data.belongs_to_collection?.name || "Unknown"}
                </p>
              </div>
            </div>

            {isTvSeries && (
              <EpisodesList seriesId={data.id} seasons={data.seasons} />
            )}

            <div className="mt-8 w-full">
              <h3 className="font-medium text-[20px] mb-3 relative z-10 w-full text-left px-8">
                Trailers & More
              </h3>
            </div>
            <div className="w-full flex flex-col items-start gap-2">
              <h3 className="px-2 text-left mt-6 font-medium text-[20px]">
                About {data.original_title}
              </h3>
              <p className="text-white text-xs font-thin md:text-sm text-left">
                <span className="text-gray-400">Director:</span>{" "}
                {data.production_companies?.[0]?.name}
              </p>
              <p className="text-white text-xs font-thin md:text-sm text-left">
                <span className="text-gray-400">Cast:</span>{" "}
                {data.production_companies?.[0]?.name}
              </p>
              <p className="text-white text-xs font-thin md:text-sm text-left">
                <span className="text-gray-400">Genres: </span>{" "}
                {data.genres?.map((genre) => genre.name).join(", ")}
              </p>
              <p className="text-white text-xs font-thin md:text-sm text-left">
                <span className="text-gray-400">This show is: </span>{" "}
                {data.belongs_to_collection?.name || "Unknown"}
              </p>
            </div>

            <ExtraProgramDetails programId={data.id} type={isTvSeries ? "tv" : "movie"} />

          </Box>
        </DialogContent>
      </div>
    </Dialog>
  );
}
