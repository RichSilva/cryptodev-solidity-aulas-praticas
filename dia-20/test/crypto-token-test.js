const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CryptoToken Contract", function() {

  let owner, wallet1, CryptoToken, token;

  beforeEach(async () => {

    [owner, wallet1] = await ethers.getSigners();

    CryptoToken = await ethers.getContractFactory("CryptoToken", owner);
    token = await CryptoToken.deploy(10000);

    await token.deployed();

  })

  describe("Should return the totalSupply value", () => {
    it("Sucess", async function() {

      const totalSupplyExpected = 10000;
      const totalSupplyResult = await token.totalSupply();
      
      expect(totalSupplyExpected).to.equal(totalSupplyResult);

    });
  });

  describe("Should return the balanceOf value", () => {
    it("Owner - sucess", async () => {
      
      const ownerBalanceExpected = 10000;
      const ownerBalanceResult = await token.balanceOf(owner.address);
      
      expect(ownerBalanceExpected).to.equal(ownerBalanceResult);
      
    });

    it("Wallet1 - sucess", async () => {

      const wallet1BalanceExpected = 0;
      const wallet1BalanceResult = await token.balanceOf(wallet1.address);
      
      expect(wallet1BalanceExpected).to.equal(wallet1BalanceResult);

    })
  });

  describe("Should realize a transfer from owner to wallet1", () => {
    it("Sucess", async () => {
      
      await token.transfer(wallet1.address, 2000);

      const wallet1BalanceExpected = 2000;
      const wallet1BalanceResult = await token.balanceOf(wallet1.address);

      expect(wallet1BalanceExpected).to.equal(wallet1BalanceResult);
    });

    // EXECUÇÃO PARA NA EXCEÇÃO DO REQUIRE
    // it("Error - insufficient balance", async () => {

    //   const expectedResult = "Insufficient Balance to Transfer";
    //   const transferResult = await token.transfer(wallet1.address, 20000);

    //   console.log(transferResult);

    //   expect(expectedResult).to.be.revertedWith(transferResult);
    // });
  });
  
});
