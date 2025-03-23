function Profiles() {
    const [profiles, setProfiles] = useState([]);
    const [showAddProfile, setShowAddProfile] = useState(false);
  
    useEffect(() => {
      // נקרא ל-API שמחזיר פרופילים
      // setProfiles(response.data)
    }, []);
  
    const handleDelete = (profileId) => {
      // קריאה ל-API למחיקה
    };
  
    const handleAddProfile = (newProfileName) => {
      // קריאה ל-API ליצירת פרופיל חדש
    };
  
    return (
      <div className="profiles-page">
        <h2>Who's watching?</h2>
        <div className="profiles-container">
          {profiles.map((profile) => (
            <div key={profile._id} className="profile-card">
              <img src={profile.avatarUrl} alt="Avatar" />
              <div className="profile-name">{profile.name}</div>
              <button onClick={() => handleDelete(profile._id)}>X</button>
            </div>
          ))}
          {profiles.length < 5 && (
            <button onClick={() => setShowAddProfile(true)}>Add Profile</button>
          )}
        </div>
        {showAddProfile && (
          <div>
            {/* טופס להוספת פרופיל חדש */}
          </div>
        )}
      </div>
    );
  }
  export default Profiles;
  