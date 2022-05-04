class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

// TODO: avoid mutation?

class Shop {
    constructor(items = []) {
        this.items = items;
    }

    // we are allowed to modify shop class...
    reduce(number, reduceBy) {
        if (number - reduceBy < 0) {
            return 0
        }
        return number - reduceBy
    }

    add(number, addBy) {
        if (number + addBy > 50) {
            return 50
        }
        return number + addBy
    }

    // for everything whose quality reduces with time
    autoReduce(quality, sellin, reduceBefore, reduceAfter) {
        if (sellin > 0) {
            return this.reduce(quality, reduceBefore)
        } else {
            return this.reduce(quality, reduceAfter)
        }
    }

    // for everything (except pass) whose quality increases with time
    autoAdd(quality, sellin, addBefore, addAfter) {
        if (sellin > 0) {
            return this.add(quality, addBefore)
        } else {
            return this.add(quality, addAfter)
        }
    }

    updateQuality() {
        for (var i = 0; i < this.items.length; i++) {

            // initial test
            if (this.items[i].name == "foo") {
                this.items[i].name = "fixme"
                continue // no need to change quality or sell by date
            }

            // check if quality is reasonable
            if (this.items[i].quality < 0 || this.items[i].quality > 50) {
                this.items[i].quality = "fixme"
                continue
            }

            let specialItems = ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', "Conjured", "Sulfuras, Hand of Ragnaros"]

            // sulfuras, who does not have sell by date and quality does not change
            if (this.items[i].name == "Sulfuras, Hand of Ragnaros") {
                this.items[i].sellIn = "N/A"
                continue
            }

            // conjured, whose quality decreases twice as fast
            if (this.items[i].name == "Conjured") {
                let quality = this.items[i].quality
                let sellin = this.items[i].sellIn
                this.items[i].quality = this.autoReduce(quality, sellin, 2, 4)
                this.items[i].sellIn = sellin - 1
                continue
            }

            // aged brie, or any other items whose quality increases constantly with time
            if (this.items[i].name == "Aged Brie") {
                let quality = this.items[i].quality
                let sellin = this.items[i].sellIn
                this.items[i].quality = this.autoAdd(quality, sellin, 1, 2)
                this.items[i].sellIn = sellin - 1
                continue
            }

            // stage pass, special case
            if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                let quality = this.items[i].quality
                let sellin = this.items[i].sellIn
                if (sellin > 5 && sellin <= 10) {
                    this.items[i].quality = this.add(quality, 2)
                } else if (sellin > 0 && sellin <= 5) {
                    this.items[i].quality = this.add(quality, 3)
                } else if (sellin <= 0) {
                    this.items[i].quality = 0
                } else {    // sellin > 10
                    this.items[i].quality = this.add(quality, 1)
                }
                this.items[i].sellIn = sellin - 1
                continue
            }

            // for any other normal items
            if (!specialItems.includes(this.items[i].name)) {
                let quality = this.items[i].quality
                let sellin = this.items[i].sellIn
                this.items[i].quality = this.autoReduce(quality, sellin, 1, 2)
                this.items[i].sellIn = sellin - 1
                continue
            }


        }

        return this.items;
    }
}

module.exports = {
    Item,
    Shop
}
