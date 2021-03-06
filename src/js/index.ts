import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface Iicecream {
    id: number
    name: string
    description: string
    imgUrl: string
    price: number
    size: string
}

let baseUri: string = "https://goldenice20200505111435.azurewebsites.net/api/IceCreams"

new Vue({
    el: "#app",
    data: {
        icecreams: [],
        errors: [],
        deleteId: 0,
        deleteMessage: "",
        formData: { name: "", description: "", imgUrl: "", description: "", price: 0, size: "" },
        addMessage: ""
    },
    methods: {
        getAllicecreams() {
            axios.get<Iicecream[]>(baseUri)
                .then((response: AxiosResponse<Iicecream[]>) => {
                    this.icecreams = response.data
                })
                .catch((error: AxiosError) => {
                    //this.message = error.message
                    alert(error.message) // https://www.w3schools.com/js/js_popup.asp
                })
        },
        deleteicecream(deleteId: number) {
            let uri: string = baseUri + "/" + deleteId
            axios.delete<void>(uri)
                .then((response: AxiosResponse<void>) => {
                    this.deleteMessage = response.status + " " + response.statusText
                    this.getAllicecreams()
                })
                .catch((error: AxiosError) => {
                    //this.deleteMessage = error.message
                    alert(error.message)
                })
        },
        addicecream() {
            axios.post<Iicecream>(baseUri, this.formData)
                .then((response: AxiosResponse) => {
                    let message: string = "response " + response.status + " " + response.statusText
                    this.addMessage = message
                    this.getAllicecreams()
                })
                .catch((error: AxiosError) => {
                    // this.addMessage = error.message
                    alert(error.message)
                })
        }
    }
})