import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./src/modules/invoice/repository/invoice.model";
import InvoiceItemModel from "./src/modules/invoice/repository/invoice-item.model";
import InvoiceFacadeFactory from "./src/modules/invoice/factory/invoice.facade.factory";

//Teste
async function main() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    models: [InvoiceModel, InvoiceItemModel],
  });

  await sequelize.sync({ force: true });

  const facade = InvoiceFacadeFactory.create();

  console.log("=== Teste de Comunicação do Módulo Invoice ===\n");

  // 1. Generate Invoice (Facade → GenerateInvoiceUseCase → InvoiceRepository → DB)
  console.log("1. Gerando Invoice via Facade...");
  const generateInput = {
    name: "Cliente Teste",
    document: "123.456.789-00",
    street: "Rua das Flores",
    number: "123",
    complement: "Apto 45",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
    items: [
      { id: "item-1", name: "Produto A", price: 150.0 },
      { id: "item-2", name: "Produto B", price: 250.0 },
    ],
  };

  const generateOutput = await facade.generate(generateInput);
  console.log("✓ Invoice gerada com sucesso!");
  console.log(`  ID: ${generateOutput.id}`);
  console.log(`  Nome: ${generateOutput.name}`);
  console.log(`  Total: R$ ${generateOutput.total.toFixed(2)}`);
  console.log(`  Items: ${generateOutput.items.length}`);

  // 2. Find Invoice (Facade → FindInvoiceUseCase → InvoiceRepository → DB)
  console.log("\n2. Buscando Invoice via Facade...");
  const findInput = { id: generateOutput.id };
  const findOutput = await facade.find(findInput);

  console.log("✓ Invoice encontrada!");
  console.log(`  ID: ${findOutput.id}`);
  console.log(`  Nome: ${findOutput.name}`);
  console.log(`  Documento: ${findOutput.document}`);
  console.log(`  Endereço: ${findOutput.address.street}, ${findOutput.address.number} - ${findOutput.address.city}/${findOutput.address.state}`);
  console.log(`  Total: R$ ${findOutput.total.toFixed(2)}`);
  console.log(`  Criada em: ${findOutput.createdAt}`);
  console.log(`  Items:`);
  findOutput.items.forEach((item) => {
    console.log(`    - ${item.name}: R$ ${item.price.toFixed(2)}`);
  });

  // 3. Teste de erro (Invoice não encontrada)
  console.log("\n3. Testando tratamento de erro...");
  try {
    await facade.find({ id: "id-inexistente" });
  } catch (error) {
    console.log(`✓ Erro capturado: ${(error as Error).message}`);
  }

  console.log("\n=== Comunicação entre componentes validada com sucesso! ===");

  await sequelize.close();
}

main().catch(console.error);
