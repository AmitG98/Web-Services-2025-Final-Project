// MainProgramPage.jsx

const MainProgramPage = ({ contentType = "all" }) => {
  return (
    <div className="max-w-screen min-h-screen bg-[#141414] text-white overflow-x-hidden relative">
      <h1 className="text-white text-3xl text-center pt-20">
        This is the {contentType} page
      </h1>
    </div>
  );
};

export default MainProgramPage;
