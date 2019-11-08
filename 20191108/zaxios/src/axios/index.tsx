import Axios from './Axios';
import { AxiosInstance } from './types';
function createInstance(): AxiosInstance {
    let context:Axios = new Axios();
    let instance = Axios.prototype.request.bind(context);
    instance = Object.assign(instance, Axios.prototype, context);
    return instance as AxiosInstance;
}
var axios = createInstance();
export default axios;
export * from './types';