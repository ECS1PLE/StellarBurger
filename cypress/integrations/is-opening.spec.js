describe("Drag and Drop Ingredients", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");

    cy.intercept("GET", "https://norma.nomoreparties.space/api/auth/user", {
      fixture: "user.json",
    });
    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
      fixture: "order.json",
    }).as("postOrder");

    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie("accessToken", "test-accessToken");
  });

  it("should drag and drop an ingredient from BurgerIngredients to BurgerConstructor and place an order", () => {
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
        cy.get("button").contains("Оформить заказ").click();
        cy.intercept("GET", "/login").as("redirectToLogin");
        const email = "artyom.vavilov78@gmail.com";
        const password = "qwerty123";
        cy.get("#email").type(email);
        cy.get("#password").type(password);

        cy.get("button").contains("Войти").click();

        cy.get("button").contains("Оформить заказ").click();
        cy.get("#modalDialog");
      });
  });
});
