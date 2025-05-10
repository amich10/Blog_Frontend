import axiosInstance from "../config/axios.config";

export interface IResult {
    data?: Array<Record<string, any>> | Record<string, any> | null | any, //Record<string, any> for an object with string keys and any values.
    message: string,
    error?: any,
    options: any,
    status: string,
}

export interface IResponseType {
    result: IResult
    status: number
}

abstract class HttpService {
    #headers: Record<string, string> = {} //object
    #params: Record<string, string> = {}
    #config: any = {} //final axios config

    #setConfig(config: any) {
        this.#headers = {
            ...this.#headers,
            "Content-Type": "application/json"
        };

        if (config.file || config.files) {
            this.#headers["Content-Type"] = "multipart/form-data";
        }

       
        /* if (config.params) {
            this.#params = config.params;
        } */
        this.#params = config.params || {}

        this.#config = {
            headers: this.#headers,
            params: this.#params
        };
    }

    getRequest = async (url: string, config: any = {}): Promise<IResponseType> => {
        try {
            this.#setConfig(config);
            let { data: responseData, status } = await axiosInstance.get(url, this.#config);
            return {
                result: responseData,
                status: status
            };
        } catch (exception: any) {
            throw {
                response: exception?.response?.data,
                status: exception?.response?.status
            };
        }
    };


    postRequest = async (url: string, data: any, config: any = {}): Promise<IResponseType> => {
        try {
            this.#setConfig(config);
            let { data: responseData, status } = await axiosInstance.post(url, data, this.#config);
            return {
                result: responseData,
                status: status
            };
        } catch (exception: any) {
            throw {
                response: exception?.response?.data,
                status: exception?.response?.status
            };
        }
    };

    patchRequest = async (url: string, data: any, config: any = {}): Promise<IResponseType> => {
        try {
            this.#setConfig(config); //sets headers and params
            let { data: responseData, status } = await axiosInstance.patch(url, data, this.#config);
            return {
                result: responseData,
                status: status
            };
        } catch (exception: any) {
            throw {
                response: exception?.response?.data,
                status: exception?.response?.status
            };
        }
    };

    deleteRequest = async (url: string, config: any = {}): Promise<IResponseType> => {
        try {
            this.#setConfig(config);
            let { data: responseData, status } = await axiosInstance.delete(url, this.#config);
            return {
                result: responseData,
                status: status
            };
        } catch (exception: any) {
            throw {
                response: exception?.response?.data,
                status: exception?.response?.status
            };
        }
    };
}

export default HttpService;
