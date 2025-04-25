export const CHECK_API_BASE_URL = 'http://192.168.191.34:7777/api';

export const CheckApiRequestsEnum = {
    getAvailableLayers: `${CHECK_API_BASE_URL}/layer/available`,
    getLayerById: `${CHECK_API_BASE_URL}/layer/get`,
    postLayerOutputSize: `${CHECK_API_BASE_URL}/layer/output_size`,

    getAvailableArchitechtures: `${CHECK_API_BASE_URL}/architecture/available`,
    postDeleteArchitecture: `${CHECK_API_BASE_URL}/architecture/delete`,
    getLoadArchitecture: `${CHECK_API_BASE_URL}/architecture/load`,
    postSaveArchitecture: `${CHECK_API_BASE_URL}/architecture/save`,

    getAvailablePipelines: `${CHECK_API_BASE_URL}/pipeline/available`,

    getAvailableModels: `${CHECK_API_BASE_URL}/model/available`,

    getTrainingModels: `${CHECK_API_BASE_URL}/model/train/available`,
    getTrainedModelByID: `${CHECK_API_BASE_URL}/model/train/load`,
    getAvailableDevices: `${CHECK_API_BASE_URL}/model/train/devices`,
    deleteTrainingTaskByID: `${CHECK_API_BASE_URL}/model/train/delete`,
} as const;

export class CheckApi {

    static async get<T>(api_url: string): Promise<T> {
        return await fetch(api_url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }) as T
    }

    static async post<T>(api_url: string, body: object): Promise<T> {
        return await fetch(api_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }) as T
    }

    static async getAvailableLayers(): Promise<any> {
        return await CheckApi.get<any>(CheckApiRequestsEnum.getAvailableLayers)
            .then((response) => response.json())
            .then((data) => { return data });
    }

    static async getAvailableArchitectures(): Promise<any> {
        return await CheckApi.get<any>(CheckApiRequestsEnum.getAvailableArchitechtures)
            .then((response) => response.json())
            .then((data) => { return data.available })
    }

    static async getAvailablePipelines(): Promise<any> {
        return await CheckApi.get<any>(CheckApiRequestsEnum.getAvailablePipelines)
            .then((response) => response.json())
            .then((data) => { return data.available })
    }

    static async getAvailableModels(): Promise<any> {
        return await CheckApi.get<any>(CheckApiRequestsEnum.getAvailableModels)
            .then((response) => response.json())
            .then((data) => { return data.available })
    }
}
