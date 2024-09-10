describe("Drag and Drop Ingredients", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
  });

  it("should drag and drop an ingredient from BurgerIngredients to BurgerConstructor", () => {
    const ingredientSelector = "#ingredientBlock";
    const targetConstructorSelector = "#dropHere";
    const ingredientIndex = 0;

    cy.get(ingredientSelector)
      .eq(ingredientIndex)
      .invoke("text")
      .then((ingredientName) => {
        cy.log("Dragging ingredient:", ingredientName);

        cy.get(ingredientSelector)
          .eq(ingredientIndex)
          .trigger("dragstart", { which: 1, force: true });

        cy.get(targetConstructorSelector)
          .trigger("drop", { force: true })
          .trigger("mouseup", { force: true });

        cy.get(targetConstructorSelector).within(() => {
          cy.contains(ingredientName).should("be.visible");
        });
      });
  });
});
