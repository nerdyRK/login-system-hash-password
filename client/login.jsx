const useState = React.useState;

const App = () => {
  return (
    <div className="whole">
      <Register />
      <Login />
    </div>
  );
};

const Register = () => {
  let [name, setname] = useState();
  let [password, setpassword] = useState();
  let [exist, setexist] = useState("");

  async function handleRegister() {
    let post = await fetch("http://localhost:5000/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });
    let res = await post.json();
    console.log(res);
    if (res.err) {
      setexist(res.err);
    } else {
      setexist(res.msg);
    }
  }

  return (
    <div className="register flexed">
      <h1>Registar</h1>
      <input onChange={(e) => setname(e.target.value)} type="text" />
      <p className="username">{exist}</p>
      <input onChange={(e) => setpassword(e.target.value)} type="password" />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

const Login = () => {
  let [name, setname] = useState();
  let [password, setpassword] = useState();
  let [status, setstatus] = useState("");

  async function handleLogin() {
    let data = await fetch("http://localhost:5000/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });

    let res = await data.json();
    console.log(res);
    if (res.msg) {
      setstatus(res.msg);
    } else {
      setstatus(`hi ${res[0].name}`);
    }
  }
  return (
    <div className="login flexed">
      <h1>Login</h1>
      <input onChange={(e) => setname(e.target.value)} type="text" />
      <input onChange={(e) => setpassword(e.target.value)} type="password" />
      <button onClick={handleLogin}>Login</button>
      <h1 className="status">{status}</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector(".root"));
