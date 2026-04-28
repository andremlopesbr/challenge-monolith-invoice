import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/address.value-object";
<<<<<<< HEAD
import Invoice from "../../domain/invoice.entity";
import InvoiceItem from "../../domain/invoice-item.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
    id: new Id("1"),
    name: "Invoice 1",
    document: "123456789",
    address: new Address({
          street: "Street 1",
          number: "1",
          complement: "Complement 1",
          city: "City 1",
          state: "State 1",
          zipCode: "12345678",
    }),
    items: [
          new InvoiceItem({
                  id: new Id("1"),
                  name: "Item 1",
                  price: 100,
          }),
          new InvoiceItem({
                  id: new Id("2"),
                  name: "Item 2",
                  price: 200,
          }),
        ],
});

const MockRepository = () => {
    return {
          generate: jest.fn(),
          find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
};

describe("Find Invoice use case unit test", () => {
    it("should find an invoice", async () => {
          const repository = MockRepository();
          const usecase = new FindInvoiceUseCase(repository);

           const input = {
                   id: "1",
           };

           const result = await usecase.execute(input);

           expect(repository.find).toHaveBeenCalled();
          expect(result.id).toBe("1");
          expect(result.name).toBe("Invoice 1");
          expect(result.document).toBe("123456789");
          expect(result.address.street).toBe("Street 1");
          expect(result.address.number).toBe("1");
          expect(result.address.complement).toBe("Complement 1");
          expect(result.address.city).toBe("City 1");
          expect(result.address.state).toBe("State 1");
          expect(result.address.zipCode).toBe("12345678");
          expect(result.items[0].id).toBe("1");
          expect(result.items[0].name).toBe("Item 1");
          expect(result.items[0].price).toBe(100);
          expect(result.items[1].id).toBe("2");
          expect(result.items[1].name).toBe("Item 2");
          expect(result.items[1].price).toBe(200);
          expect(result.total).toBe(300);
          expect(result.createdAt).toBeDefined();
    });
=======
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice 1",
  document: "123456789",
  address: new Address(
    "Street 1",
    "1",
    "Complement 1",
    "City 1",
    "State 1",
    "12345"
  ),
  items: [
    new InvoiceItem({
      id: new Id("1"),
      name: "Item 1",
      price: 100,
    }),
    new InvoiceItem({
      id: new Id("2"),
      name: "Item 2",
      price: 200,
    }),
  ],
});

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Find Invoice Use Case unit test", () => {
  it("should find an invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.total).toBe(300);
    expect(result.items.length).toBe(2);
  });
>>>>>>> 693ae26 (feat: sync local changes with repository)
});
