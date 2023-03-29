describe("Counter component", () => {

    beforeEach(async () => { 
        await browser.url("/"); 
        counter = await $(".counterNr"); 
    });

    it("should increase value by 1", async () => { 
        const increaseButton = await $(".counterIncrement"); 
        await increaseButton.click(); 
        await expect(counter).toHaveText("1"); 
    });

    it("should decrease value by 1", async () => { 
        const decreaseButton = await $(".counterDecrement"); 
        await decreaseButton.click(); 
        await expect(counter).toHaveText("-1"); 
    }); 
});
