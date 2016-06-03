var GastosMensuales;
(function(GastosMensuales) {
    (function(Utils) {
        // *** PUBLIC METHODS *****************************************************************
        /**
         * Returns the first element of the array having property = value
         */
        Utils.GetItemByProperty = function(itemsArray, property, value) {
            var itemFound = null;
            itemsArray.forEach(function(item, index, array) {
              for (var key in item) {
                    if (item.hasOwnProperty(key) && item[key] == value) {
                        itemFound = item;
                    }
                }
            });

            return itemFound;
        };

    })(GastosMensuales.Utils || (GastosMensuales.Utils = {}));
})(GastosMensuales || (GastosMensuales = {}));  