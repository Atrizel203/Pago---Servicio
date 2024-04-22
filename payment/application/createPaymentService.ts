import { SendMessageService } from "../../broker/application/sendMessage";
import { QueueName } from "../../broker/domain/entities";
import { SendDataService } from "../../socket/application/sendDataService";
import { Events } from "../../socket/domain/events";
import { Payment } from "../domain/payment";

export class CreatePaymentService {
    constructor(private readonly sendMessageService : SendMessageService, private readonly sendDataService : SendDataService) {}
    async execute(order: any) : Promise<Payment> {
        try {
            const total = order.price * order.amount;
            const payment = {
               product: order.product,
               amount: order.amount,
               price: order.price,
               total: total
            };
            await this.sendMessageService.execute(payment, QueueName.BACKUP);
            await this.sendDataService.execute(Events.SEND_DATA, payment);
            return payment;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}