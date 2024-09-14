describe("Модальное окно", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
  });

  it("должно закрываться при клике на иконку закрытия", () => {
    // Открываем модальное окно
    cy.get(`#ingredientBlock`).click(); // Используем правильный класс из styles
    cy.get("#modalDialog").contains("Детали");

    // Закрываем модальное окно
    cy.get("#iconRight svg").click(); // Обращение к SVG внутри элемента с id="iconRight"

    // Проверка, что модальное окно больше не существует в DOM
    cy.get("#modalDialog").should("not.exist"); // Проверка на отсутствие элемента
  });
});
