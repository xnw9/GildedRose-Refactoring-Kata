var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("fixme");
  });

  it("sell by date can be negative", () => {
    const gildedRose = new Shop([ new Item('sth', -1, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-2);
  })

  it("sell by date can be reduced to negative", () => {
    const gildedRose = new Shop([ new Item('sth', 0, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
  })
  // can it? need to handle?

  it("quality is never negative", () => {
    const gildedRose = new Shop([ new Item('sth', 1, -10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal('fixme');
  })

  it("quality cannot be reduced to negative - sth", () => {
    const gildedRose = new Shop([ new Item('sth', 0, 0.5) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0.5);
  })
  // what happens if it is gonna be negative after this update? keep it as it is?

  it("quality cannot be more than 50 - sth", () => {
    const gildedRose = new Shop([ new Item('sth', 60, 0.5) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal("fixme");
  })

  it("quality cannot be more than 50 - sth", () => {
    const gildedRose = new Shop([ new Item('sth', 0, 60) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal("fixme");
  })

  it("quality cannot be more than 50 - Aged Brie & pass", () => {
    const gildedRose = new Shop([ new Item('sth', 0, 60) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal("fixme");
  })

  it("quality cannot be increased to more than 50 - sth", () => {
    const gildedRose = new Shop([ new Item('sth', 0, 49.5) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  })


  it("legendary item never has to be sold", () => {
    const gildedRose = new Shop([ new Item('Sulfuras, Hand of Ragnaros', 10, 20) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal('N/A');
  })

  it("legendary item never decreases in quality", () => {
    const gildedRose = new Shop([ new Item('Sulfuras, Hand of Ragnaros', 10, 20) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(20);
  })

  it("Aged Brie increases in quality by 1 before sell by date", () => {
    const gildedRose = new Shop([ new Item('Aged Brie', 1, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
  })

  it("Aged Brie increases in quality by 2 after sell by date", () => {
    const gildedRose = new Shop([ new Item('Aged Brie', 0, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
  })
  // is it what we want? not mentioned in document

  it("quality decreases twice as fast after sell by date", () => {
    const gildedRose = new Shop([ new Item('sth', 0, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  })


});
