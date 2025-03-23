function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post('http://localhost:4000/api/login', {
          email, 
          password,
        });
        // נשמור את ה-token
        if (rememberMe) {
          // שמירה בקוקי או localStorage עם תוקף
        }
        // הפניה לעמוד Home/profiles
      } catch (error) {
        // טיפול בשגיאה
      }
    };
  
    return (
      <div className="login-container">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="text"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <label>
            <input 
              type="checkbox" 
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me
          </label>
          <button type="submit">Sign In</button>
        </form>
        <div>
          <span>New to Netflix? </span>
          <a href="/register">Sign up now</a>
        </div>
      </div>
    );
  }
  