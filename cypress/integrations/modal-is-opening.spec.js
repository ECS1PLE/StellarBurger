describe("Тест модального окна с ингредиентом", () => {
  it("Нажимает на блок с ингредиентом и проверяет модальное окно", () => {
    cy.visit("localhost:5173/");
    cy.get("#ingredientBlock").first().click();
    cy.get("#modalDialog").contains("Детали");
    cy.get("#modalDialog").contains("Жиры");
  });
});
