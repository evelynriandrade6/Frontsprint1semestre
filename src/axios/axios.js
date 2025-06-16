import axios from "axios";

const api = axios.create({
    baseURL: "http://10.89.240.74:5000/api/reservas/v1/",
    headers: {
        'accept': 'application/json'
    }
});

api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem("token");
        console.log(token);
        if(token){
            config.headers.Authorization=`${token}`;
        }
        return config;
    },
    (error) =>Promise.reject(error)
)

const sheets = {
    postCadastro: (user) => api.post("user", user),
    postLogin: (user) => api.post("user/login", user),
    postCadastroSala: (classroom) => api.post("classroom", classroom),
    postcreateSchedule: (schedule) => api.post("schedule", schedule),
    getSchedulesByIdClassroom: (cpf) => api.get(`schedule/${cpf}`),
    getAllClassroom: () => api.get("classroom/"),
    getSchedulesByIdClassroomRanges: (id,dataInicio,dataFim) => api.get(`/schedule/ranges/${id}?weekStart=${dataInicio}&weekEnd=${dataFim}`),
    putUpdateUser: (user) => api.put(`/user/${user.cpf}`, user),
    getUserByCPF: (cpf) => api.get(`/user/${cpf}`),
    getSchedulesByUserCPF: (cpf) => api.get(`/scheduleUser/${cpf}`),
    deleteSchedule: (id) => api.delete(`/schedule/${id}`),
    deleteUser: (cpf) => api.delete(`/user/${cpf}`),


}

export default sheets;
