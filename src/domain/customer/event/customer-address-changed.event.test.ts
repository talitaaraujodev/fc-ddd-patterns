import { EventDispatcher } from "../../@shared/event/event-dispatcher";
import { CustomerAddressChangedEvent } from "./customer-address-changed.event";
import { SendConsoleLogHandler } from "./handler/send-console.log.handler";

//Desafio FC sobre Domain Events
//O segundo evento deverá ser disparado quando o endereço do Customer é trocado (método changeAddress()). Nesse caso, o ID, Nome, bem como os dados do endereço devem ser passados ao evento.

describe("Customer Address is Changed test", () => {
  it("should call the 2 handlers when a customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new CustomerAddressChangedEvent({
      id: "1",
      nome: "Customer 1",
      endereco: "Streert 1",
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
