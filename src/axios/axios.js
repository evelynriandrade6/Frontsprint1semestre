import axios from "axios";

const api = axios.create({
    baseURL:"http://10.89.240.74:5000/api/reservas/v1/",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    postCadastro:(user)=>api.post("user", user),
    postLogin:(user) => api.post("user/login", user),
    postCadastroSala:(classroom)=>api.post("classroom", classroom)
}

export default sheets;