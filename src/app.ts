import { Client } from "./core/Client";
import { SQLEventEmitter } from "./events/SQLEventEmitter";

const Observable = new SQLEventEmitter();
const Excel = new Client();

Excel.Generate();
// Observable.Listen();