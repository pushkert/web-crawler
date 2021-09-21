const puppeteer = require("puppeteer");

async function crawlerMethod(link) {
  try {
    const URL = `${link}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(URL);
    let data = await page.evaluate(() => {
      let results = [];
      let items = document.querySelectorAll("#customerReviews");
      items.forEach((item) => {
        results.push({
          reviewer: item.querySelector(".reviewer dd").innerHTML,
          comment: item
            .querySelector(".review .rightCol blockquote")
            .innerText.replace(/(\r\n|\n|\r)/gm, ""),
          rating: item.querySelector(".itemRating strong").innerText,
          dateformat: item.querySelectorAll(".reviewer dd")[1].innerText,
        });
      });
      return results;
    });

    await browser.close();
    return data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = crawlerMethod;
