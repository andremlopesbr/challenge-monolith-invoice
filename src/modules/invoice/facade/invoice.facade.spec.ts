import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("Invoice Facade integration test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      models: [InvoiceModel, InvoiceItemModel],
    });
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      name: "Invoice 1",
      document: "123456789",
      street: "Street 1",
      number: "1",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "12345678",
      items: [
        {
          id: "1",
          name: "Item 1",
          price: 100,
        },
        {
          id: "2",
          name: "Item 2",
          price: 200,
        },
      ],
    };

    const output = await facade.generate(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe("Invoice 1");
    expect(output.document).toBe("123456789");
    expect(output.street).toBe("Street 1");
    expect(output.number).toBe("1");
    expect(output.complement).toBe("Complement 1");
    expect(output.city).toBe("City 1");
    expect(output.state).toBe("State 1");
    expect(output.zipCode).toBe("12345678");
    expect(output.items.length).toBe(2);
    expect(output.items[0].id).toBe("1");
    expect(output.items[0].name).toBe("Item 1");
    expect(output.items[0].price).toBe(100);
    expect(output.items[1].id).toBe("2");
    expect(output.items[1].name).toBe("Item 2");
    expect(output.items[1].price).toBe(200);
    expect(output.total).toBe(300);
  });

  it("should find an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const generateInput = {
      name: "Invoice 1",
      document: "123456789",
      street: "Street 1",
      number: "1",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "12345678",
      items: [
        {
          id: "1",
          name: "Item 1",
          price: 100,
        },
        {
          id: "2",
          name: "Item 2",
          price: 200,
        },
      ],
    };

    const generateOutput = await facade.generate(generateInput);
    const findInput = {
      id: generateOutput.id,
    };

    const output = await facade.find(findInput);

    expect(output.id).toBe(generateOutput.id);
    expect(output.name).toBe("Invoice 1");
    expect(output.document).toBe("123456789");
    expect(output.address.street).toBe("Street 1");
    expect(output.address.number).toBe("1");
    expect(output.address.complement).toBe("Complement 1");
    expect(output.address.city).toBe("City 1");
    expect(output.address.state).toBe("State 1");
    expect(output.address.zipCode).toBe("12345678");
    expect(output.items.length).toBe(2);
    expect(output.items[0].id).toBe("1");
    expect(output.items[0].name).toBe("Item 1");
    expect(output.items[0].price).toBe(100);
    expect(output.items[1].id).toBe("2");
    expect(output.items[1].name).toBe("Item 2");
    expect(output.items[1].price).toBe(200);
    expect(output.total).toBe(300);
    expect(output.createdAt).toBeDefined();
  });

  it("should throw error when invoice not found", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      id: "non-existent-id",
    };

    await expect(facade.find(input)).rejects.toThrow("Invoice not found");
  });
});
