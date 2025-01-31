var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function () {

    it("should foo", function () {
        const gildedRose = new Shop([new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal("fixme");
    });

    // assume sell by date can be negative
    it("sell by date can be negative", () => {
        const gildedRose = new Shop([new Item('sth', -1, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-2);
    })

    it("sell by date can be reduced to negative", () => {
        const gildedRose = new Shop([new Item('sth', 0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
    })

    it("quality cannot be negative - sth", () => {
        const gildedRose = new Shop([new Item('sth', 1, -10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal('fixme');
    })

    it("quality cannot be reduced to negative - sth", () => {
        const gildedRose = new Shop([new Item('sth', 0, 0.5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    })
    // for now, assume it will be reduced to 0

    it("quality cannot be more than 50 - sth", () => {
        const gildedRose = new Shop([new Item('sth', 1, 60)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal("fixme");
    })

    it("quality cannot be more than 50 - Aged Brie & pass", () => {
        const gildedRose = new Shop([new Item('sth', 0, 60)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal("fixme");
    })

    it("quality cannot be increased to more than 50 - Aged Brie & pass", () => {
        const gildedRose = new Shop([new Item('Aged Brie', 0, 49.5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(50);
    })

    it("quality of backstage pass increases by 2 when <= 10 or and by 3 when <= 5", () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 9, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(12);
    })

    it("quality of backstage pass drops to zero after the concert", () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    })


    it("legendary item never has to be sold", () => {
        const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal('N/A');
    })

    it("legendary item never decreases in quality", () => {
        const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', "N/A", 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(20);
    })

    it("Aged Brie increases in quality by 1 before sell by date", () => {
        const gildedRose = new Shop([new Item('Aged Brie', 1, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(11);
    })

    it("Aged Brie increases in quality by 2 after sell by date", () => {
        const gildedRose = new Shop([new Item('Aged Brie', 0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(12);
    })
    // Is this what we want? not mentioned in document

    it("normal items' quality decreases twice as fast after sell by date", () => {
        const gildedRose = new Shop([new Item('sth', 0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(8);
    })

    it("conjured items degrades twice as fast as normal items", () => {
      const gildedRose = new Shop([new Item("Conjured", 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(8)
    })


});
