import {Model} from 'arva-js/core/Model.js';
import moment  from 'moment/moment.js'

export class Message extends Model {

    get content() {}

    get author() {}

    get timestamp() {}

    getDate = () => moment(this.timestamp)

    getDateDay = () => moment(this.timestamp).startOf('day').format()

}
