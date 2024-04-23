import { AmqpRepository } from "../../broker/infraestructure/AmqplibRepository";
import { SendMessageService } from "../../broker/application/sendMessage";
import { CreatePaymentService } from "../application/createPaymentService";
import { CreatePaymentController } from "./createPaymentController";
import { SocketioRepository } from "../../socket/infraestructure/socketioRepository";
import { SendDataService } from "../../socket/application/sendDataService";

const amqplib = new AmqpRepository("amqp://18.209.192.241/");
const socketio = new SocketioRepository("http://52.2.14.144:5000/");

const sendMessageService = new SendMessageService(amqplib);
const sendDataService = new SendDataService(socketio);

const createPaymentService = new CreatePaymentService(sendMessageService, sendDataService);

export const createPaymentController = new CreatePaymentController(createPaymentService);


