import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
          generate: jest.fn(),
          find: jest.fn(),
    };
};

describe("Generate Invoice use case unit test", () => {
    it("should generate an invoice", async () => {
          const repository = MockRepository();
          const usecase = new GenerateInvoiceUseCase(repository);

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

           const result = await usecase.execute(input);

           expect(repository.generate).toHaveBeenCalled();
          expect(result.id).toBeDefined();
          expect(result.name).toBe("Invoice 1");
          expect(result.document).toBe("123456789");
          expect(result.street).toBe("Street 1");
          expect(result.number).toBe("1");
          expect(result.complement).toBe("Complement 1");
          expect(result.city).toBe("City 1");
          expect(result.state).toBe("State 1");
          expect(result.zipCode).toBe("12345678");
          expect(result.items[0].id).toBe("1");
          expect(result.items[0].name).toBe("Item 1");
          expect(result.items[0].price).toBe(100);
          expect(result.items[1].id).toBe("2");
          expect(result.items[1].name).toBe("Item 2");
          expect(result.items[1].price).toBe(200);
          expect(result.total).toBe(300);
    });
});
