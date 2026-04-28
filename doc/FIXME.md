# Relatório de Correção - Merge Conflicts

## Problema Identificado
O repositório continha marcadores de conflito de merge não resolvidos (<<<<<<< HEAD, =======, >>>>>>>) em 15 arquivos do módulo invoice, impedindo a compilação e execução dos testes.

## Arquivos Corrigidos

### Domain Layer
1. `src/modules/invoice/domain/invoice.entity.ts` - Conflitos nas definições de tipo e formatação
2. `src/modules/invoice/domain/invoice-item.entity.ts` - Conflitos na definição de tipo e getters
3. `src/modules/invoice/domain/address.value-object.ts` - Conflitos no construtor (alterado para aceitar objeto em vez de parâmetros posicionais)

### Repository Layer
4. `src/modules/invoice/repository/invoice.repository.ts` - Conflito entre métodos `generate` vs `create` (mantido `generate` conforme uso no use case)
5. `src/modules/invoice/repository/invoice.model.ts` - Conflito de formatação
6. `src/modules/invoice/repository/invoice-item.model.ts` - Conflito de formatação

### Gateway Layer
7. `src/modules/invoice/gateway/invoice.gateway.ts` - Conflito entre `generate` vs `create` (mantido `generate`)

### Facade Layer
8. `src/modules/invoice/facade/invoice.facade.interface.ts` - Conflitos duplos nas definições de interfaces
9. `src/modules/invoice/facade/invoice.facade.ts` - Conflito de formatação e nomes de interfaces

### Factory Layer
10. `src/modules/invoice/factory/invoice.facade.factory.ts` - Conflito na criação da facade

### Use Cases
11. `src/modules/invoice/usecase/generate-invoice/generate-invoice.dto.ts` - Conflito de formatação
12. `src/modules/invoice/usecase/find-invoice/find-invoice.dto.ts` - Conflito de formatação
13. `src/modules/invoice/usecase/find-invoice/find-invoice.usecase.ts` - Conflito de formatação
14. `src/modules/invoice/usecase/find-invoice/find-invoice.usecase.spec.ts` - Conflito entre versões de teste (mantido validações completas)

### Configuração
15. `package.json` - Conflito entre versões de dependências (mantido versões mais recentes)

## Decisões de Implementação
- **Método do Repository**: Mantido `generate()` em vez de `create()`, pois é o que o `GenerateInvoiceUseCase` espera
- **Address Constructor**: Alterado para aceitar um objeto `AddressProps` em vez de parâmetros posicionais, pois o código que consome usa `new Address({...})`
- **Testes**: Mantido a versão mais completa dos testes que validam todos os campos
- **Dependências**: Mantido versões mais recentes do Jest (29.x) e TypeScript (5.x)

## Resultado
- ✅ Todos os marcadores de conflito removidos
- ✅ Código compila sem erros
- ✅ Testes passando (2 passed, 2 total)
- ✅ Arquivo `doc/desafio.md` criado (corrigido nome de `desfaio.md`)
