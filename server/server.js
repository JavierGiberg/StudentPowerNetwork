const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { Builder, By, Key, until } = require("selenium-webdriver");

const app = express();

app.use(cors());

app.get("/test", (req, res) => {
  res.send("test was repon");
});
app.get("/extractionMaazanPdfSapirColleg", (req, res) => {
  try {
    extractionMaazanPdfSapirColleg(web, username, password);
  } catch (error) {
    console.log(error);
  }
});

app.listen(8000);
var web =
  "https://ids.sapir.ac.il/nidp/idff/sso?id=sapirloa2&sid=9&option=credential&sid=9&target=https%3A%2F%2Fis.sapir.ac.il%2Fportal%2F";
var username = "XXXXXXX";
var password = "XXXXXXX";

async function extractionMaazanPdfSapirColleg(web, username, password) {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.manage().window().maximize();
  try {
    // Navigate to the website
    await driver.get(web);
    let inputUsername = await driver.findElement(By.id("Ecom_User_ID"));
    await inputUsername.sendKeys(username);
    await driver.sleep(5000);

    let btnLogin = await driver.findElement(By.id("loginButton"));
    await btnLogin.click();
    await driver.sleep(5000);

    // Locate the password input field and set attribute values
    let btnLoginpass = await driver.findElement(By.id("ldapPasswordCard"));
    await driver.executeScript(
      "arguments[0].setAttribute('enabled', 'true'); arguments[0].setAttribute('active', 'true');",
      btnLoginpass
    );
    await driver.sleep(5000);
    await btnLoginpass.click();

    await driver.sleep(5000);

    // Enter password
    let inputPassword = await driver.findElement(By.id("ldapPassword"));
    await inputPassword.sendKeys(password);
    await driver.sleep(5000);

    // Click the login button
    btnLogin = await driver.findElement(By.id("ldapPasswordLoginButton"));
    await btnLogin.click();
    await driver.sleep(5000);

    // Navigate to the private zone
    let privateZone = await driver.findElement(
      By.xpath('//a[@title="רישום לקורסים, מערכת שעות, ציונים, הגשת בקשות"]')
    );
    await privateZone.click();
    await driver.sleep(5000);

    // Navigate to the maazan section
    let maazanBtn = await driver.findElement(
      By.xpath('//r-button[@routerlink="maazan"]')
    );
    await maazanBtn.click();
    await driver.sleep(5000);

    // Download PDF
    let downloadPdf = await driver.findElement(
      By.xpath(
        '//button[@class="button mdc-button mdc-button--raised mat-mdc-raised-button mat-unthemed mat-mdc-button-base ng-star-inserted"]'
      )
    );
    await downloadPdf.click();
    await driver.sleep(10000);
  } finally {
    await driver.quit();
  }
}
