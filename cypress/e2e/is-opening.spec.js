describe("Making Order", () => {
  const email = "artyom.vavilov78@gmail.com";
  const password = "qwerty123";

  it('Должно открыть модальное окно при нажатии на кнопку "Оформить заказ" и отправить данные на API', () => {
    cy.visit("localhost:5173/");

    cy.request({
      method: "POST",
      url: "https://your-api-endpoint.com/submit",
      body: {
        email: email,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.get("button#order-button").click();
      cy.contains("идентификатор заказа").should("be.visible");
    });
  });
});
