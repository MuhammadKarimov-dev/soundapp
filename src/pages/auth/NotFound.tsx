import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react"

const NotFound: React.FC = () => {

  const [mode, setMode] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <div style={{
      backgroundColor: mode ? 'rgb(31 41 55 ' : ' #fff', color: mode ? '#fff' : '#333',
      transition: "background-color 0.3s, color 0.3s", display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%', height: '100vh',
      position:'relative'
    }}>
      <button style={{position:'absolute', top:'30px', right:'30px'}}
        onClick={() => setMode(!mode)}
        className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        {mode ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </button>
      <div className="page">
        <h1 style={{ margin: '0', fontSize: '200px', fontWeight: 'bold', textShadow: '5px 5px 5px #333', }}>404</h1>
        <p style={{ margin: '0', marginBottom: '20px', fontSize: '30px', fontWeight: '400', textShadow: '5px 5px 5px #333' }}>page not found</p>
        <button onClick={() => navigate('/')}
          style={{
            backgroundColor: 'rgb(62, 149, 255)',
            color: '#fff',
            border: 'none',
            padding: ' 10px 35px',
            borderRadius: '5px',
            boxShadow: '5px 5px 5px #333',
            cursor: 'pointer'
          }}
        >back
        </button>
      </div>
    </div>
  );
};

export default NotFound;